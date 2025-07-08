import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCardIcon } from "lucide-react";

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

interface TransactionHistoryProps {
  accounts: Account[];
  transactions: Transaction[];
}

export default function TransactionHistory({ accounts, transactions }: TransactionHistoryProps) {
  const accountMap = Object.fromEntries(accounts.map((a) => [a.id, a.type]));
  return (
    <div className="flex flex-col gap-3">
      {transactions.length === 0 && (
        <div className="text-center text-gray-400 text-sm">No transactions found.</div>
      )}
      {transactions.map((txn) => (
        <Card key={txn.id} className="w-full">
          <CardHeader className="flex flex-row items-center gap-2 pb-2">
            <CreditCardIcon className="w-5 h-5 text-blue-400" />
            <CardTitle className="text-base font-medium">
              {txn.description}
            </CardTitle>
            <span className="ml-auto text-xs text-gray-400">{txn.date}</span>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs text-gray-500">{accountMap[txn.accountId]} Account</span>
              <span className="text-xs text-gray-400">{txn.category}</span>
            </div>
            <span className={txn.amount < 0 ? "text-red-500 font-semibold" : "text-green-600 font-semibold"}>
              {txn.amount < 0 ? "-" : "+"}${Math.abs(txn.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
