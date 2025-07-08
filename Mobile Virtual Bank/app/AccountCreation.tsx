import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AccountCreationProps {
  onCreate: (type: string) => void;
}

export default function AccountCreation({ onCreate }: AccountCreationProps) {
  const [type, setType] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!type) {
      setError("Please select an account type.");
      return;
    }
    onCreate(type);
    setType("");
    setError("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-2 mb-4">
      <div>
        <label htmlFor="account-type" className="block text-xs font-medium text-gray-700 mb-1">
          New Account Type
        </label>
        <select
          id="account-type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="block w-36 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
        >
          <option value="">Select</option>
          <option value="Checking">Checking</option>
          <option value="Savings">Savings</option>
          <option value="Investment">Investment</option>
        </select>
      </div>
      <Button type="submit" className="h-9">Create</Button>
      {error && <span className="text-xs text-red-500 ml-2">{error}</span>}
    </form>
  );
}
