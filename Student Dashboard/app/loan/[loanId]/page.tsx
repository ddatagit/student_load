import React from "react";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Link from "next/link";
import { ApplicationForm } from "../../ApplicationForm";

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

const applicants = [
  {
    submissionId: "A1234",
    name: "Alice Smith",
    gpa: 3.7,
    income: 35000,
    faculty: "Science",
    major: "Biology",
    status: "Approved",
    adminNotes: "Excellent academic record.",
  },
  {
    submissionId: "A1235",
    name: "Bob Lee",
    gpa: 3.1,
    income: 42000,
    faculty: "Engineering",
    major: "Mechanical",
    status: "Pending",
    adminNotes: "GPA below requirement.",
  },
  {
    submissionId: "A1236",
    name: "Carol Tan",
    gpa: 3.5,
    income: 39000,
    faculty: "Arts",
    major: "History",
    status: "Rejected",
    adminNotes: "Income above limit.",
  },
];

// Simulate user context
const isAdmin = false; // Change to true for admin view
const currentUserSubmissionId = "A1234"; // Simulate logged-in student

function getLoanById(id: string) {
  return loans.find((l) => l.id === id);
}

export default function LoanDetailPage({ params }: { params: { loanId: string } }) {
  const loan = getLoanById(params.loanId);
  if (!loan) return notFound();

  const userApplication = applicants.find(
    (a) => a.submissionId === currentUserSubmissionId && loan.id === "loan1"
  );

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow px-6 py-4 flex items-center justify-between">
        <Link href="/">
          <Button variant="outline">Back</Button>
        </Link>
        <h1 className="text-2xl font-bold">Loan Details</h1>
        <span />
      </header>
      <div className="flex-1 flex flex-col items-center py-8 px-2">
        <Card className="w-full max-w-3xl mb-8">
          <CardHeader>
            <CardTitle>{loan.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-2 text-gray-700">{loan.description}</div>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="outline">Monthly: {loan.monthlyOffer}</Badge>
              <Badge variant="outline">GPA ≥ {loan.gpaRequirement}</Badge>
              <Badge variant="outline">Income ≤ ${loan.incomeLimit.toLocaleString()}</Badge>
            </div>
            {userApplication ? (
              <div className="mb-4">
                <div className="mb-2">
                  <Badge variant="outline">Status: {userApplication.status}</Badge>
                </div>
                <div className="mb-2 text-sm text-gray-600">
                  <span className="font-semibold">Admin Notes:</span> {userApplication.adminNotes}
                </div>
              </div>
            ) : (
              <ApplicationForm loanId={loan.id} />
            )}
          </CardContent>
        </Card>
        <Card className="w-full max-w-3xl">
          <CardHeader>
            <CardTitle>Applicants</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-2 py-1 text-left">Name</th>
                    <th className="px-2 py-1 text-left">GPA</th>
                    <th className="px-2 py-1 text-left">Income</th>
                    <th className="px-2 py-1 text-left">Faculty</th>
                    <th className="px-2 py-1 text-left">Major</th>
                    <th className="px-2 py-1 text-left">Status</th>
                    <th className="px-2 py-1 text-left">Admin Notes</th>
                    {isAdmin && <th className="px-2 py-1">Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {applicants.map((a) => (
                    <tr key={a.submissionId} className="border-b last:border-b-0">
                      <td className="px-2 py-1">{a.name}</td>
                      <td className="px-2 py-1">{a.gpa}</td>
                      <td className="px-2 py-1">${a.income.toLocaleString()}</td>
                      <td className="px-2 py-1">{a.faculty}</td>
                      <td className="px-2 py-1">{a.major}</td>
                      <td className="px-2 py-1">
                        <Badge variant="outline">{a.status}</Badge>
                      </td>
                      <td className="px-2 py-1 text-xs">{a.adminNotes}</td>
                      {isAdmin && (
                        <td className="px-2 py-1 flex gap-2">
                          <Button size="sm" variant="outline">Accept</Button>
                          <Button size="sm" variant="destructive">Reject</Button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
