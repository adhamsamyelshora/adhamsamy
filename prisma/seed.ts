import bcrypt from 'bcryptjs';
import { PrismaClient, Priority, TaskStatus, TaskType, TransactionType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const email = 'demo@smsm.app';
  const passwordHash = await bcrypt.hash('Demo12345!', 10);

  const user = await prisma.user.upsert({
    where: { email },
    create: {
      email,
      passwordHash,
      name: 'Demo User',
      calorieGoal: 2200,
      weightGoalKg: 72
    },
    update: {}
  });

  const food = await prisma.food.create({
    data: { userId: user.id, name: 'Chicken Breast 100g', calories: 165, protein: 31, carbs: 0, fat: 3.6 }
  });

  const meal = await prisma.meal.create({
    data: {
      userId: user.id,
      date: new Date(),
      mealType: 'lunch',
      items: {
        create: [{ foodId: food.id, name: food.name, quantity: 1, unit: 'serving', calories: 165, protein: 31, carbs: 0, fat: 3.6 }]
      }
    }
  });

  await prisma.weightEntry.create({ data: { userId: user.id, date: new Date(), weightKg: 78.5, notes: 'Seed entry' } });
  await prisma.task.create({ data: { userId: user.id, title: 'Plan weekly meals', priority: Priority.medium, status: TaskStatus.todo, taskType: TaskType.personal } });

  const category = await prisma.category.create({ data: { userId: user.id, name: 'Groceries', categoryType: 'expense' } });
  const account = await prisma.account.create({ data: { userId: user.id, name: 'Main Wallet' } });

  await prisma.transaction.create({
    data: { userId: user.id, date: new Date(), amount: 54.3, type: TransactionType.expense, categoryId: category.id, accountId: account.id, notes: `Meal ${meal.id}` }
  });

  const project = await prisma.project.create({ data: { userId: user.id, name: 'Client Portal', status: 'active' } });
  await prisma.timesheet.create({ data: { userId: user.id, projectId: project.id, date: new Date(), hours: 2.5, description: 'Planning' } });
  await prisma.workNote.create({ data: { userId: user.id, projectId: project.id, title: 'Kickoff', content: '# Scope\n- Set milestones' } });
}

main().finally(async () => prisma.$disconnect());
