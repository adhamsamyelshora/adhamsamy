import { MoneyPage } from '@/modules/money/ui/money-page';
import { requireUserId } from '@/server/auth/session';

export default async function MoneyDashboardPage() {
  return <MoneyPage userId={await requireUserId()} />;
}
