import { WorkService } from '../service/work.service';

const service = new WorkService();

export async function WorkPage({ userId }: { userId: string }) {
  const data = await service.dashboard(userId);
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Work Management</h2>
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded border p-3">Hours this week: {data.hoursWeek.toFixed(1)}</div>
        <div className="rounded border p-3">Hours this month: {data.hoursMonth.toFixed(1)}</div>
        <div className="rounded border p-3">Active projects: {data.projects.filter((x) => x.status === 'active').length}</div>
      </div>
      <div className="rounded border p-3">
        <h3 className="font-medium">Work notes (markdown)</h3>
        <ul className="list-disc pl-6">{data.notes.map((note) => <li key={note.id}>{note.title}</li>)}</ul>
      </div>
    </div>
  );
}
