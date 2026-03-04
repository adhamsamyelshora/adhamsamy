import { WorkPage } from '@/modules/work/ui/work-page';
import { requireUserId } from '@/server/auth/session';

export default async function WorkDashboardPage() {
  return <WorkPage userId={await requireUserId()} />;
}
