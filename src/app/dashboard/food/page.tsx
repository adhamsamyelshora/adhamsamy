import { FoodPage } from '@/modules/food/ui/food-page';
import { requireUserId } from '@/server/auth/session';

export default async function FoodDashboardPage() {
  const userId = await requireUserId();
  return <FoodPage userId={userId} />;
}
