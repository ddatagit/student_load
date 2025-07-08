import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const appliedLoans = [
  {
    submissionId: "A1234",
    loanId: "loan1",
    loanName: "Merit Scholarship Loan",
    status: "Approved",
    gpaMatch: true,
    incomeMatch: true,
  },
  {
    submissionId: "A1235",
    loanId: "loan2",
    loanName: "STEM Opportunity Loan",
    status: "Pending",
    gpaMatch: false,
    incomeMatch: true,
  },
  {
    submissionId: "A1236",
    loanId: "loan3",
    loanName: "Community Service Loan",
    status: "Rejected",
    gpaMatch: true,
    incomeMatch: false,
  },
];

const statusColor = {
  Approved: "bg-green-100 text-green-800",
  Pending: "bg-yellow-100 text-yellow-800",
  Rejected: "bg-red-100 text-red-800",
};

export function AppliedLoans() {
  return (
    <div className="grid gap-4">
      {appliedLoans.map((app) => (
        <Card key={app.submissionId} className="flex flex-col md:flex-row items-center md:items-start justify-between p-4">
          <div className="flex-1">
            <CardHeader className="p-0 mb-2">
              <CardTitle className="text-lg">{app.loanName}</CardTitle>
            </CardHeader>
            <CardContent className="p-0 mb-2">
              <div className="flex flex-wrap gap-2 text-sm">
                <Badge variant="outline">Submission ID: {app.submissionId}</Badge>
                <span className={`rounded px-2 py-1 text-xs font-semibold ${statusColor[app.status as keyof typeof statusColor]}`}>{app.status}</span>
                <Badge variant={app.gpaMatch ? "outline" : "destructive"}>GPA {app.gpaMatch ? "Match" : "No Match"}</Badge>
                <Badge variant={app.incomeMatch ? "outline" : "destructive"}>Income {app.incomeMatch ? "Match" : "No Match"}</Badge>
              </div>
            </CardContent>
          </div>
          <div className="mt-4 md:mt-0 md:ml-6">
            <Link href={`/loan/${app.loanId}`}>
              <span className="underline text-blue-600 cursor-pointer">View Details</span>
            </Link>
          </div>
        </Card>
      ))}
    </div>
  );
}
