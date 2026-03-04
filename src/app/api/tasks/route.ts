import { NextResponse } from 'next/server';
import { requireUserId } from '@/server/auth/session';
import { TaskService } from '@/modules/tasks/service/task.service';

const service = new TaskService();

export async function GET() {
  const userId = await requireUserId();
  return NextResponse.json(await service.views(userId));
}

export async function POST(req: Request) {
  const userId = await requireUserId();
  return NextResponse.json(await service.create(userId, await req.json()));
}
