import { Card } from "@/components/ui/card";

interface Account {
  id: string;
  type: string;
  balance: number;
  currency: string;
  number: string;
  createdAt: string;
}

interface AccountOverviewProps {
  accounts: Account[];
}

export default function AccountOverview({ accounts }: AccountOverviewProps) {
  return (
    <div className="grid gap-4">
      {accounts.map((acc) => (
        <Card key={acc.id} className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
          <div>
            <div className="font-semibold text-lg text-gray-900">{acc.type} Account</div>
            <div className="text-xs text-gray-500">{acc.number} • Opened {acc.createdAt}</div>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-green-700">
              {acc.currency} {acc.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
            <div className="text-xs text-gray-400">Available</div>
          </div>
        </Card>
      ))}
    </div>
  );
}
