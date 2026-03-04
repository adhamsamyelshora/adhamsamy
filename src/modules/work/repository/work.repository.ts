import { prisma } from '@/lib/prisma';

export class WorkRepository {
  listProjects(userId: string) {
    return prisma.project.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });
  }

  createProject(userId: string, data: { name: string; status: string }) {
    return prisma.project.create({ data: { userId, ...data } });
  }

  listTimesheets(userId: string) {
    return prisma.timesheet.findMany({ where: { userId }, include: { project: true }, orderBy: { date: 'desc' } });
  }

  createTimesheet(userId: string, data: { projectId: string; date: Date; hours: number; description?: string }) {
    return prisma.timesheet.create({ data: { userId, ...data } });
  }

  listNotes(userId: string) {
    return prisma.workNote.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });
  }

  createNote(userId: string, data: { title: string; content: string; projectId?: string }) {
    return prisma.workNote.create({ data: { userId, ...data } });
  }
}
