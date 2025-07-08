"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface CreateAccountModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (account: { type: string; balance: number; currency: string }) => void;
}

export default function CreateAccountModal({ open, onOpenChange, onCreate }: CreateAccountModalProps) {
  const [type, setType] = useState("");
  const [balance, setBalance] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!type.trim()) {
      setError("Account type is required.");
      return;
    }
    const bal = parseFloat(balance);
    if (isNaN(bal) || bal < 0) {
      setError("Enter a valid initial balance.");
      return;
    }
    if (!currency.trim()) {
      setError("Currency is required.");
      return;
    }
    onCreate({ type, balance: bal, currency });
    setType("");
    setBalance("");
    setCurrency("USD");
    setError("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Account</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <Input
            placeholder="Account Type (e.g. Checking, Savings)"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
          <Input
            placeholder="Initial Balance"
            type="number"
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
            min={0}
          />
          <Input
            placeholder="Currency (e.g. USD)"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          />
          {error && <div className="text-red-600 text-xs">{error}</div>}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
