import { NextResponse } from 'next/server';
import { MoneyService } from '@/modules/money/service/money.service';
import { requireUserId } from '@/server/auth/session';
import { toCsv } from '@/server/core/export';

const service = new MoneyService();

export async function GET(req: Request) {
  const userId = await requireUserId();
  const format = new URL(req.url).searchParams.get('format') ?? 'json';
  const report = await service.monthlyReport(userId);
  if (format === 'csv') {
    return new NextResponse(toCsv(report.transactions.map((t) => ({ date: t.date.toISOString(), amount: t.amount, type: t.type }))), { headers: { 'Content-Type': 'text/csv' } });
  }
  return NextResponse.json(report);
}
