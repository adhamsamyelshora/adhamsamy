import { WorkRepository } from '../repository/work.repository';
import { projectSchema, timesheetSchema, workNoteSchema } from '../validators/work';

const repository = new WorkRepository();

export class WorkService {
  createProject(userId: string, payload: unknown) {
    return repository.createProject(userId, projectSchema.parse(payload));
  }
  createTimesheet(userId: string, payload: unknown) {
    const input = timesheetSchema.parse(payload);
    return repository.createTimesheet(userId, { ...input, date: new Date(input.date) });
  }
  createNote(userId: string, payload: unknown) {
    return repository.createNote(userId, workNoteSchema.parse(payload));
  }
  async dashboard(userId: string) {
    const [projects, timesheets, notes] = await Promise.all([repository.listProjects(userId), repository.listTimesheets(userId), repository.listNotes(userId)]);
    const now = new Date();
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - 7);
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const hoursWeek = timesheets.filter((x) => x.date >= weekStart).reduce((sum, x) => sum + x.hours, 0);
    const hoursMonth = timesheets.filter((x) => x.date >= monthStart).reduce((sum, x) => sum + x.hours, 0);
    return { projects, notes, hoursWeek, hoursMonth, timesheets };
  }
}
