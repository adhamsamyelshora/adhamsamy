import { TasksPage } from '@/modules/tasks/ui/tasks-page';
import { requireUserId } from '@/server/auth/session';

export default async function TasksDashboardPage() {
  return <TasksPage userId={await requireUserId()} />;
}
