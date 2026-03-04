import { MoneyService } from '../service/money.service';

const service = new MoneyService();

export async function MoneyPage({ userId }: { userId: string }) {
  const report = await service.monthlyReport(userId);
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Money + Accounting</h2>
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded border p-3">Income: {report.income.toFixed(2)}</div>
        <div className="rounded border p-3">Expenses: {report.expenses.toFixed(2)}</div>
        <div className="rounded border p-3">Net: {report.net.toFixed(2)}</div>
      </div>
      <div className="rounded border p-3">
        <h3 className="font-medium">Reconcile</h3>
        <ul className="list-disc pl-6">{report.transactions.map((txn) => <li key={txn.id}>{txn.type} {txn.amount} on {new Date(txn.date).toLocaleDateString()}</li>)}</ul>
      </div>
    </div>
  );
}
