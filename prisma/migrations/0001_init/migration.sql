-- Initial schema for smsm assistant
CREATE TYPE "MealType" AS ENUM ('breakfast','lunch','dinner','snack');
CREATE TYPE "Priority" AS ENUM ('low','medium','high');
CREATE TYPE "TaskStatus" AS ENUM ('todo','in_progress','done');
CREATE TYPE "TaskType" AS ENUM ('personal','work');
CREATE TYPE "TransactionType" AS ENUM ('income','expense','transfer');
CREATE TYPE "CategoryType" AS ENUM ('income','expense');

CREATE TABLE "User" (
  "id" TEXT PRIMARY KEY,
  "email" TEXT NOT NULL UNIQUE,
  "passwordHash" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "age" INTEGER,
  "heightCm" DOUBLE PRECISION,
  "weightGoalKg" DOUBLE PRECISION,
  "calorieGoal" INTEGER,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "Meal" (
  "id" TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
  "date" TIMESTAMP NOT NULL,
  "mealType" "MealType" NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);
CREATE INDEX "Meal_userId_date_idx" ON "Meal"("userId","date");

CREATE TABLE "Food" (
  "id" TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
  "name" TEXT NOT NULL,
  "calories" DOUBLE PRECISION NOT NULL,
  "protein" DOUBLE PRECISION NOT NULL,
  "carbs" DOUBLE PRECISION NOT NULL,
  "fat" DOUBLE PRECISION NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);
CREATE INDEX "Food_userId_name_idx" ON "Food"("userId","name");

CREATE TABLE "MealItem" (
  "id" TEXT PRIMARY KEY,
  "mealId" TEXT NOT NULL REFERENCES "Meal"("id") ON DELETE CASCADE,
  "foodId" TEXT REFERENCES "Food"("id") ON DELETE SET NULL,
  "name" TEXT NOT NULL,
  "quantity" DOUBLE PRECISION NOT NULL,
  "unit" TEXT NOT NULL,
  "calories" DOUBLE PRECISION NOT NULL,
  "protein" DOUBLE PRECISION NOT NULL,
  "carbs" DOUBLE PRECISION NOT NULL,
  "fat" DOUBLE PRECISION NOT NULL
);

CREATE TABLE "WeightEntry" (
  "id" TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
  "date" TIMESTAMP NOT NULL,
  "weightKg" DOUBLE PRECISION NOT NULL,
  "notes" TEXT
);
CREATE INDEX "WeightEntry_userId_date_idx" ON "WeightEntry"("userId","date");

CREATE TABLE "Task" (
  "id" TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
  "title" TEXT NOT NULL,
  "description" TEXT,
  "dueDate" TIMESTAMP,
  "priority" "Priority" NOT NULL,
  "status" "TaskStatus" NOT NULL DEFAULT 'todo',
  "taskType" "TaskType" NOT NULL,
  "reminderAt" TIMESTAMP,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);
CREATE INDEX "Task_userId_dueDate_idx" ON "Task"("userId","dueDate");

CREATE TABLE "Tag" (
  "id" TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
  "name" TEXT NOT NULL,
  UNIQUE("userId","name")
);

CREATE TABLE "TaskTag" (
  "taskId" TEXT NOT NULL REFERENCES "Task"("id") ON DELETE CASCADE,
  "tagId" TEXT NOT NULL REFERENCES "Tag"("id") ON DELETE CASCADE,
  PRIMARY KEY("taskId","tagId")
);

CREATE TABLE "Category" (
  "id" TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
  "name" TEXT NOT NULL,
  "categoryType" "CategoryType" NOT NULL,
  UNIQUE("userId","name","categoryType")
);

CREATE TABLE "Account" (
  "id" TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
  "name" TEXT NOT NULL,
  UNIQUE("userId","name")
);

CREATE TABLE "Transaction" (
  "id" TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
  "date" TIMESTAMP NOT NULL,
  "amount" DOUBLE PRECISION NOT NULL,
  "type" "TransactionType" NOT NULL,
  "categoryId" TEXT REFERENCES "Category"("id") ON DELETE SET NULL,
  "accountId" TEXT REFERENCES "Account"("id") ON DELETE SET NULL,
  "notes" TEXT
);
CREATE INDEX "Transaction_userId_date_idx" ON "Transaction"("userId","date");

CREATE TABLE "Budget" (
  "id" TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
  "month" TIMESTAMP NOT NULL,
  "categoryId" TEXT NOT NULL REFERENCES "Category"("id") ON DELETE CASCADE,
  "limit" DOUBLE PRECISION NOT NULL,
  UNIQUE("userId","month","categoryId")
);

CREATE TABLE "Project" (
  "id" TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
  "name" TEXT NOT NULL,
  "status" TEXT NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "Timesheet" (
  "id" TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
  "projectId" TEXT NOT NULL REFERENCES "Project"("id") ON DELETE CASCADE,
  "date" TIMESTAMP NOT NULL,
  "hours" DOUBLE PRECISION NOT NULL,
  "description" TEXT
);
CREATE INDEX "Timesheet_userId_date_idx" ON "Timesheet"("userId","date");

CREATE TABLE "WorkNote" (
  "id" TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
  "projectId" TEXT REFERENCES "Project"("id") ON DELETE SET NULL,
  "title" TEXT NOT NULL,
  "content" TEXT NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);
CREATE INDEX "WorkNote_userId_createdAt_idx" ON "WorkNote"("userId","createdAt");
