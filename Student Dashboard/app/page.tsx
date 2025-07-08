import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { LoanList } from "./LoanList";
import { AppliedLoans } from "./AppliedLoans";

export default function Page() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Student Dashboard</h1>
        <Button variant="outline">Logout</Button>
      </header>
      <div className="flex-1 flex flex-col items-center py-8 px-2">
        <Card className="w-full max-w-4xl">
          <CardHeader>
            <CardTitle>Loans</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="available" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="available">Open Loans</TabsTrigger>
                <TabsTrigger value="applied">Applied Loans</TabsTrigger>
              </TabsList>
              <TabsContent value="available">
                <LoanList />
              </TabsContent>
              <TabsContent value="applied">
                <AppliedLoans />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
