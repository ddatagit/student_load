import { Card } from "@/components/ui/card";
import { TrendingUpIcon, ArrowDownIcon, ArrowUpIcon } from "lucide-react";

interface Account {
  id: string;
  type: string;
  balance: number;
  currency: string;
  number: string;
  createdAt: string;
}

interface Transaction {
  id: string;
  accountId: string;
  date: string;
  description: string;
  amount: number;
  category: string;
}

interface FinancialInsightsProps {
  accounts: Account[];
  transactions: Transaction[];
}

function getMonthlySummary(transactions: Transaction[]) {
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();
  let income = 0;
  let expenses = 0;
  transactions.forEach((txn) => {
    const txnDate = new Date(txn.date);
    if (txnDate.getMonth() === month && txnDate.getFullYear() === year) {
      if (txn.amount > 0) income += txn.amount;
      else expenses += Math.abs(txn.amount);
    }
  });
  return { income, expenses };
}

export default function FinancialInsights({ accounts, transactions }: FinancialInsightsProps) {
  const { income, expenses } = getMonthlySummary(transactions);
  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);
  return (
    <div className="grid gap-4">
      <Card className="flex items-center gap-4 px-6 py-4 bg-white shadow-sm">
        <TrendingUpIcon className="w-8 h-8 text-blue-500" />
        <div>
          <div className="text-xs text-gray-500">Total Balance</div>
          <div className="text-2xl font-bold text-gray-900">
            USD {totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
        </div>
      </Card>
      <div className="grid grid-cols-2 gap-4">
        <Card className="flex items-center gap-3 px-4 py-3">
          <ArrowUpIcon className="w-6 h-6 text-green-600" />
          <div>
            <div className="text-xs text-gray-500">Income (This Month)</div>
            <div className="text-lg font-semibold text-green-700">
              USD {income.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
          </div>
        </Card>
        <Card className="flex items-center gap-3 px-4 py-3">
          <ArrowDownIcon className="w-6 h-6 text-red-600" />
          <div>
            <div className="text-xs text-gray-500">Expenses (This Month)</div>
            <div className="text-lg font-semibold text-red-700">
              USD {expenses.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
