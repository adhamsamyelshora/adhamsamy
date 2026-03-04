import { WeightPage } from '@/modules/weight/ui/weight-page';
import { requireUserId } from '@/server/auth/session';

export default async function WeightDashboardPage() {
  const userId = await requireUserId();
  return <WeightPage userId={userId} />;
}
