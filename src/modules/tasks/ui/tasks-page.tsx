import { TaskService } from '../service/task.service';

const service = new TaskService();

export async function TasksPage({ userId }: { userId: string }) {
  const views = await service.views(userId);
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Tasks</h2>
      {Object.entries(views).map(([view, tasks]) => (
        <div className="rounded border p-3" key={view}>
          <h3 className="font-medium capitalize">{view}</h3>
          <ul className="list-disc pl-6">{tasks.map((task) => <li key={task.id}>{task.title} ({task.taskType})</li>)}</ul>
        </div>
      ))}
    </div>
  );
}
