import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart2Icon } from "lucide-react";

interface Account {
  id: string;
  type: string;
  balance: number;
  currency: string;
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

function getMonthlySpending(transactions: Transaction[]) {
  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  return transactions
    .filter((t) => {
      const [y, m] = t.date.split("-");
      return Number(y) === year && Number(m) === month && t.amount < 0;
    })
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
}

function getIncome(transactions: Transaction[]) {
  return transactions.filter((t) => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
}

function getTopCategory(transactions: Transaction[]) {
  const spend = transactions.filter((t) => t.amount < 0);
  const byCat: Record<string, number> = {};
  spend.forEach((t) => {
    byCat[t.category] = (byCat[t.category] || 0) + Math.abs(t.amount);
  });
  let maxCat = "-", maxVal = 0;
  Object.entries(byCat).forEach(([cat, val]) => {
    if (val > maxVal) {
      maxCat = cat;
      maxVal = val;
    }
  });
  return maxCat;
}

export default function FinancialInsights({ accounts, transactions }: FinancialInsightsProps) {
  const totalBalance = accounts.reduce((sum, a) => sum + a.balance, 0);
  const monthlySpending = getMonthlySpending(transactions);
  const totalIncome = getIncome(transactions);
  const topCategory = getTopCategory(transactions);

  return (
    <div className="flex flex-col gap-4">
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center gap-2 pb-2">
          <BarChart2Icon className="w-5 h-5 text-blue-500" />
          <CardTitle className="text-base font-semibold">Financial Overview</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <div className="flex justify-between text-sm">
            <span>Total Balance</span>
            <span className="font-bold">${totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Monthly Spending</span>
            <span className="font-bold text-red-500">-${monthlySpending.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Total Income</span>
            <span className="font-bold text-green-600">+${totalIncome.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Top Spending Category</span>
            <span className="font-bold">{topCategory}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
