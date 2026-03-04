import { MoneyRepository } from '../repository/money.repository';
import { budgetSchema, transactionSchema } from '../validators/money';

const repository = new MoneyRepository();

export class MoneyService {
  listTransactions(userId: string) {
    return repository.listTransactions(userId);
  }
  createTransaction(userId: string, payload: unknown) {
    const input = transactionSchema.parse(payload);
    return repository.createTransaction(userId, { ...input, date: new Date(input.date) });
  }
  createBudget(userId: string, payload: unknown) {
    const input = budgetSchema.parse(payload);
    return repository.createBudget(userId, { ...input, month: new Date(input.month) });
  }

  async monthlyReport(userId: string) {
    const [transactions, budgets, categories] = await Promise.all([
      repository.listTransactions(userId),
      repository.listBudgets(userId),
      repository.listCategories(userId)
    ]);
    const income = transactions.filter((x) => x.type === 'income').reduce((s, x) => s + x.amount, 0);
    const expenses = transactions.filter((x) => x.type === 'expense').reduce((s, x) => s + x.amount, 0);
    const byCategory = categories.map((category) => ({
      category: category.name,
      total: transactions.filter((txn) => txn.categoryId === category.id).reduce((sum, txn) => sum + txn.amount, 0)
    }));
    return { income, expenses, net: income - expenses, budgets, byCategory, transactions };
  }
}
