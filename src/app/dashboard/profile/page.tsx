import { prisma } from '@/lib/prisma';
import { requireUserId } from '@/server/auth/session';

export default async function ProfilePage() {
  const user = await prisma.user.findUnique({ where: { id: await requireUserId() } });
  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold">Profile</h2>
      <p>Name: {user?.name}</p>
      <p>Age: {user?.age ?? '-'}</p>
      <p>Height: {user?.heightCm ?? '-'} cm</p>
      <p>Weight goal: {user?.weightGoalKg ?? '-'} kg</p>
      <p>Calorie goal: {user?.calorieGoal ?? '-'}</p>
    </div>
  );
}
