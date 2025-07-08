import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCardIcon } from "lucide-react";

interface Account {
  id: string;
  type: string;
  balance: number;
  currency: string;
  createdAt: string;
}

interface AccountOverviewProps {
  accounts: Account[];
}

export default function AccountOverview({ accounts }: AccountOverviewProps) {
  return (
    <div className="flex flex-col gap-4">
      {accounts.map((acc) => (
        <Card key={acc.id} className="w-full">
          <CardHeader className="flex flex-row items-center gap-2 pb-2">
            <CreditCardIcon className="w-5 h-5 text-blue-500" />
            <CardTitle className="text-base font-semibold">{acc.type} Account</CardTitle>
            <span className="ml-auto text-xs text-gray-400">Opened {acc.createdAt}</span>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <span className="text-2xl font-bold text-gray-800">
              ${acc.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
            <span className="text-xs text-gray-500">{acc.currency}</span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
