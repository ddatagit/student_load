import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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

export function LoanList() {
  return (
    <div className="grid gap-4">
      {loans.map((loan) => (
        <Card key={loan.id} className="flex flex-col md:flex-row items-center md:items-start justify-between p-4">
          <div className="flex-1">
            <CardHeader className="p-0 mb-2">
              <CardTitle className="text-lg">{loan.name}</CardTitle>
            </CardHeader>
            <CardContent className="p-0 text-gray-700 mb-2">
              {loan.description}
            </CardContent>
            <div className="flex flex-wrap gap-2 text-sm">
              <Badge variant="outline">Monthly: {loan.monthlyOffer}</Badge>
              <Badge variant="outline">GPA ≥ {loan.gpaRequirement}</Badge>
              <Badge variant="outline">Income ≤ ${loan.incomeLimit.toLocaleString()}</Badge>
            </div>
          </div>
          <div className="mt-4 md:mt-0 md:ml-6">
            <Link href={`/loan/${loan.id}`}>
              <Button>View Details</Button>
            </Link>
          </div>
        </Card>
      ))}
    </div>
  );
}
