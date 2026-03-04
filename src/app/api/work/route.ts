import { NextResponse } from 'next/server';
import { WorkService } from '@/modules/work/service/work.service';
import { requireUserId } from '@/server/auth/session';

const service = new WorkService();

export async function GET() {
  return NextResponse.json(await service.dashboard(await requireUserId()));
}

export async function POST(req: Request) {
  const userId = await requireUserId();
  const body = await req.json();
  if ('hours' in body) return NextResponse.json(await service.createTimesheet(userId, body));
  if ('content' in body) return NextResponse.json(await service.createNote(userId, body));
  return NextResponse.json(await service.createProject(userId, body));
}
