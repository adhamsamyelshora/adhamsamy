import { NextResponse } from 'next/server';
import { WeightService } from '@/modules/weight/service/weight.service';
import { requireUserId } from '@/server/auth/session';

const service = new WeightService();

export async function GET() {
  const userId = await requireUserId();
  return NextResponse.json(await service.trend(userId));
}

export async function POST(req: Request) {
  const userId = await requireUserId();
  return NextResponse.json(await service.create(userId, await req.json()));
}
