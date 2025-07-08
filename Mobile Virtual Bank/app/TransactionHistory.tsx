import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

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

interface TransactionHistoryProps {
  accounts: Account[];
  transactions: Transaction[];
}

export default function TransactionHistory({ accounts, transactions }: TransactionHistoryProps) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">Recent Transactions</h2>
      <div className="grid gap-3">
        {transactions.length === 0 && (
          <div className="text-gray-500 text-sm">No transactions found.</div>
        )}
        {transactions.map((txn) => {
          const acc = accounts.find((a) => a.id === txn.accountId);
          return (
            <Card key={txn.id} className="flex items-center justify-between px-4 py-3">
              <div>
                <div className="font-medium text-gray-900">{txn.description}</div>
                <div className="text-xs text-gray-500">
                  {txn.date} • {acc ? acc.type : "Unknown"} • {txn.category}
                </div>
              </div>
              <div className={cn(
                "font-semibold text-right",
                txn.amount < 0 ? "text-red-600" : "text-green-700"
              )}>
                {txn.amount < 0 ? "-" : "+"}
                {acc ? acc.currency : ""} {Math.abs(txn.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
