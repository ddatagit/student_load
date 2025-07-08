import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const loans = [
  {
    id: "loan1",
    name: "Merit Scholarship Loan",
    description: "For high-achieving students with financial need.",
    monthlyOffer: "$500",
    gpaRequirement: 3.5,
    incomeLimit: 40000,
  },
  {
    id: "loan2",
    name: "STEM Opportunity Loan",
    description: "Supporting STEM majors with moderate income.",
    monthlyOffer: "$400",
    gpaRequirement: 3.2,
    incomeLimit: 60000,
  },
  {
    id: "loan3",
    name: "Community Service Loan",
    description: "Rewarding students with volunteer experience.",
    monthlyOffer: "$300",
    gpaRequirement: 3.0,
    incomeLimit: 50000,
  },
];

const applications = [
  {
    submissionId: "A1234",
    loanId: "loan1",
    name: "Alice Smith",
    status: "Approved",
    gpa: 3.7,
    income: 35000,
    faculty: "Science",
    major: "Biology",
  },
  {
    submissionId: "A1235",
    loanId: "loan2",
    name: "Bob Lee",
    status: "Pending",
    gpa: 3.1,
    income: 42000,
    faculty: "Engineering",
    major: "Mechanical",
  },
  {
    submissionId: "A1236",
    loanId: "loan3",
    name: "Carol Tan",
    status: "Rejected",
    gpa: 3.5,
    income: 39000,
    faculty: "Arts",
    major: "History",
  },
];

const statusColor = {
  Approved: "bg-green-100 text-green-800",
  Pending: "bg-yellow-100 text-yellow-800",
  Rejected: "bg-red-100 text-red-800",
};

export default function AdminDashboard() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <Button variant="outline">Logout</Button>
      </header>
      <div className="flex-1 flex flex-col items-center py-8 px-2">
        <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>All Loans</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {loans.map((loan) => (
                  <div key={loan.id} className="flex flex-col md:flex-row md:items-center md:justify-between border rounded p-3">
                    <div>
                      <div className="font-semibold">{loan.name}</div>
                      <div className="text-gray-600 text-sm">{loan.description}</div>
                      <div className="flex gap-2 mt-1 text-xs">
                        <Badge variant="outline">Monthly: {loan.monthlyOffer}</Badge>
                        <Badge variant="outline">GPA ≥ {loan.gpaRequirement}</Badge>
                        <Badge variant="outline">Income ≤ ${loan.incomeLimit.toLocaleString()}</Badge>
                      </div>
                    </div>
                    <Link href={`/loan/${loan.id}`} className="mt-2 md:mt-0">
                      <Button size="sm">View</Button>
                    </Link>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-2 py-1 text-left">Name</th>
                      <th className="px-2 py-1 text-left">Loan</th>
                      <th className="px-2 py-1 text-left">Status</th>
                      <th className="px-2 py-1 text-left">GPA</th>
                      <th className="px-2 py-1 text-left">Income</th>
                      <th className="px-2 py-1 text-left">Faculty</th>
                      <th className="px-2 py-1 text-left">Major</th>
                      <th className="px-2 py-1">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((app) => (
                      <tr key={app.submissionId} className="border-b last:border-b-0">
                        <td className="px-2 py-1">{app.name}</td>
                        <td className="px-2 py-1">{loans.find(l => l.id === app.loanId)?.name}</td>
                        <td className="px-2 py-1">
                          <span className={`rounded px-2 py-1 text-xs font-semibold ${statusColor[app.status as keyof typeof statusColor]}`}>{app.status}</span>
                        </td>
                        <td className="px-2 py-1">{app.gpa}</td>
                        <td className="px-2 py-1">${app.income.toLocaleString()}</td>
                        <td className="px-2 py-1">{app.faculty}</td>
                        <td className="px-2 py-1">{app.major}</td>
                        <td className="px-2 py-1 flex gap-2">
                          <Button size="sm" variant="outline">Accept</Button>
                          <Button size="sm" variant="destructive">Reject</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
