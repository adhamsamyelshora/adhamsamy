import { NextResponse } from 'next/server';
import { requireUserId } from '@/server/auth/session';
import { MoneyService } from '@/modules/money/service/money.service';

const service = new MoneyService();

export async function GET() {
  return NextResponse.json(await service.monthlyReport(await requireUserId()));
}

export async function POST(req: Request) {
  const userId = await requireUserId();
  const body = await req.json();
  if ('limit' in body) {
    return NextResponse.json(await service.createBudget(userId, body));
  }
  return NextResponse.json(await service.createTransaction(userId, body));
}
