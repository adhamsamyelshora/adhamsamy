import { DashboardWidgets } from '@/modules/dashboard/ui/dashboard-page';
import { requireUserId } from '@/server/auth/session';

export default async function DashboardPage() {
  return <DashboardWidgets userId={await requireUserId()} />;
}
