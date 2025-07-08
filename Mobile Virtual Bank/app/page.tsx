"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BellIcon, UserIcon, CreditCardIcon, BarChart2Icon, LogOutIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Navbar from "./Navbar";
import AccountCreation from "./AccountCreation";
import AccountOverview from "./AccountOverview";
import TransactionHistory from "./TransactionHistory";
import FinancialInsights from "./FinancialInsights";
import Notifications from "./Notifications";

const MOCK_USER = {
  id: "user-1",
  name: "Jane Doe",
  email: "jane.doe@email.com",
};

const MOCK_ACCOUNTS = [
  {
    id: "acc-1",
    type: "Checking",
    balance: 3250.75,
    currency: "USD",
    createdAt: "2023-01-15",
  },
  {
    id: "acc-2",
    type: "Savings",
    balance: 10250.0,
    currency: "USD",
    createdAt: "2022-06-10",
  },
];

const MOCK_TRANSACTIONS = [
  {
    id: "txn-1",
    accountId: "acc-1",
    date: "2024-06-01",
    description: "Coffee Shop",
    amount: -4.5,
    category: "Food & Drink",
  },
  {
    id: "txn-2",
    accountId: "acc-1",
    date: "2024-05-30",
    description: "Salary Deposit",
    amount: 2500.0,
    category: "Income",
  },
  {
    id: "txn-3",
    accountId: "acc-2",
    date: "2024-05-28",
    description: "Interest",
    amount: 5.0,
    category: "Interest",
  },
  {
    id: "txn-4",
    accountId: "acc-1",
    date: "2024-05-27",
    description: "Grocery Store",
    amount: -120.0,
    category: "Groceries",
  },
];

const MOCK_NOTIFICATIONS = [
  {
    id: "notif-1",
    type: "transaction",
    message: "Coffee Shop: -$4.50 from Checking Account.",
    date: "2024-06-01T09:15:00Z",
    read: false,
  },
  {
    id: "notif-2",
    type: "security",
    message: "New device login detected.",
    date: "2024-05-31T20:10:00Z",
    read: false,
  },
  {
    id: "notif-3",
    type: "balance",
    message: "Your Savings Account balance is now $10,250.00.",
    date: "2024-05-28T08:00:00Z",
    read: true,
  },
];

export default function Page() {
  const [accounts, setAccounts] = useState(MOCK_ACCOUNTS);
  const [transactions, setTransactions] = useState(MOCK_TRANSACTIONS);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [activeTab, setActiveTab] = useState("accounts");
  const [user] = useState(MOCK_USER);

  const handleCreateAccount = (type: string) => {
    const newAccount = {
      id: `acc-${accounts.length + 1}`,
      type,
      balance: 0,
      currency: "USD",
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setAccounts([newAccount, ...accounts]);
  };

  const handleMarkNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      <Navbar user={user} notifications={notifications} onTabChange={setActiveTab} activeTab={activeTab} />
      <main className="flex-1 flex flex-col items-center px-2 py-4 max-w-md mx-auto w-full">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="accounts" className="flex flex-col items-center gap-1">
              <CreditCardIcon className="w-5 h-5" />
              <span className="text-xs">Accounts</span>
            </TabsTrigger>
            <TabsTrigger value="transactions" className="flex flex-col items-center gap-1">
              <BarChart2Icon className="w-5 h-5" />
              <span className="text-xs">Transactions</span>
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex flex-col items-center gap-1">
              <BarChart2Icon className="w-5 h-5" />
              <span className="text-xs">Insights</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex flex-col items-center gap-1">
              <BellIcon className="w-5 h-5" />
              <span className="text-xs">Alerts</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="accounts">
            <AccountCreation onCreate={handleCreateAccount} />
            <AccountOverview accounts={accounts} />
          </TabsContent>
          <TabsContent value="transactions">
            <TransactionHistory accounts={accounts} transactions={transactions} />
          </TabsContent>
          <TabsContent value="insights">
            <FinancialInsights accounts={accounts} transactions={transactions} />
          </TabsContent>
          <TabsContent value="notifications">
            <Notifications notifications={notifications} onMarkRead={handleMarkNotificationRead} />
          </TabsContent>
        </Tabs>
      </main>
      <footer className="w-full py-3 bg-white border-t text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Mobile Virtual Bank. All rights reserved.
      </footer>
    </div>
  );
}
