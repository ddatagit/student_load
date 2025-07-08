"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BellIcon, LogOutIcon, PlusIcon, TrendingUpIcon, UserIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Navbar from "./Navbar";
import AccountOverview from "./AccountOverview";
import TransactionHistory from "./TransactionHistory";
import NotificationsPanel from "./NotificationsPanel";
import FinancialInsights from "./FinancialInsights";
import CreateAccountModal from "./CreateAccountModal";

const MOCK_USER = {
  id: "user_001",
  name: "Alex Morgan",
  email: "alex.morgan@email.com",
};

const MOCK_ACCOUNTS = [
  {
    id: "acc_001",
    type: "Checking",
    balance: 4250.75,
    currency: "USD",
    number: "**** 1234",
    createdAt: "2023-01-15",
  },
  {
    id: "acc_002",
    type: "Savings",
    balance: 10250.0,
    currency: "USD",
    number: "**** 5678",
    createdAt: "2022-06-10",
  },
];

const MOCK_TRANSACTIONS = [
  {
    id: "txn_001",
    accountId: "acc_001",
    date: "2024-06-01",
    description: "Starbucks Coffee",
    amount: -5.25,
    category: "Food & Drink",
  },
  {
    id: "txn_002",
    accountId: "acc_001",
    date: "2024-05-30",
    description: "Salary Deposit",
    amount: 2500.0,
    category: "Income",
  },
  {
    id: "txn_003",
    accountId: "acc_002",
    date: "2024-05-28",
    description: "Transfer to Checking",
    amount: -500.0,
    category: "Transfer",
  },
  {
    id: "txn_004",
    accountId: "acc_002",
    date: "2024-05-25",
    description: "Interest Payment",
    amount: 10.0,
    category: "Interest",
  },
];

const MOCK_NOTIFICATIONS = [
  {
    id: "notif_001",
    type: "transaction",
    message: "You spent $5.25 at Starbucks Coffee.",
    date: "2024-06-01T09:30:00Z",
    read: false,
  },
  {
    id: "notif_002",
    type: "balance",
    message: "Your Checking account balance is now $4,250.75.",
    date: "2024-06-01T09:31:00Z",
    read: false,
  },
  {
    id: "notif_003",
    type: "security",
    message: "New login from Chrome on Windows.",
    date: "2024-05-31T20:10:00Z",
    read: true,
  },
];

export default function Page() {
  const [accounts, setAccounts] = useState(MOCK_ACCOUNTS);
  const [transactions, setTransactions] = useState(MOCK_TRANSACTIONS);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [activeTab, setActiveTab] = useState("accounts");

  // Mark notifications as read when panel is opened
  useEffect(() => {
    if (activeTab === "notifications") {
      setNotifications((prev) =>
        prev.map((n) => ({ ...n, read: true }))
      );
    }
  }, [activeTab]);

  const handleCreateAccount = (account: any) => {
    setAccounts((prev) => [
      ...prev,
      {
        ...account,
        id: `acc_${prev.length + 1}`,
        createdAt: new Date().toISOString().slice(0, 10),
        number: `**** ${Math.floor(1000 + Math.random() * 9000)}`,
      },
    ]);
    setShowCreateAccount(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar
        user={MOCK_USER}
        notifications={notifications}
        onNotificationsClick={() => setActiveTab("notifications")}
      />
      <main className="flex-1 w-full max-w-2xl mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-4 mb-6">
            <TabsTrigger value="accounts" className="flex flex-col items-center gap-1">
              <UserIcon className="w-5 h-5" />
              <span className="text-xs">Accounts</span>
            </TabsTrigger>
            <TabsTrigger value="transactions" className="flex flex-col items-center gap-1">
              <TrendingUpIcon className="w-5 h-5" />
              <span className="text-xs">Transactions</span>
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex flex-col items-center gap-1">
              <PlusIcon className="w-5 h-5" />
              <span className="text-xs">Insights</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex flex-col items-center gap-1">
              <BellIcon className="w-5 h-5" />
              <span className="text-xs">Alerts</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="accounts">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Your Accounts</h2>
              <Button onClick={() => setShowCreateAccount(true)} size="sm" variant="outline">
                <PlusIcon className="w-4 h-4 mr-1" /> New Account
              </Button>
            </div>
            <AccountOverview accounts={accounts} />
          </TabsContent>
          <TabsContent value="transactions">
            <TransactionHistory accounts={accounts} transactions={transactions} />
          </TabsContent>
          <TabsContent value="insights">
            <FinancialInsights accounts={accounts} transactions={transactions} />
          </TabsContent>
          <TabsContent value="notifications">
            <NotificationsPanel notifications={notifications} />
          </TabsContent>
        </Tabs>
      </main>
      <footer className="w-full py-4 bg-white border-t text-center text-xs text-gray-500">
        &copy; 2024 Mobile Virtual Bank. All rights reserved.
      </footer>
      <CreateAccountModal
        open={showCreateAccount}
        onOpenChange={setShowCreateAccount}
        onCreate={handleCreateAccount}
      />
    </div>
  );
}
