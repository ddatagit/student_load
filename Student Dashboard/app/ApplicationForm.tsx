"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function ApplicationForm({ loanId }: { loanId: string }) {
  const [form, setForm] = useState({
    name: "",
    gpa: "",
    income: "",
    faculty: "",
    major: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ [k: string]: string }>({});

  function validate() {
    const errs: { [k: string]: string } = {};
    if (!form.name) errs.name = "Name is required";
    if (!form.gpa || isNaN(Number(form.gpa)) || Number(form.gpa) < 0 || Number(form.gpa) > 4) errs.gpa = "GPA must be 0-4";
    if (!form.income || isNaN(Number(form.income)) || Number(form.income) < 0) errs.income = "Income required";
    if (!form.faculty) errs.faculty = "Faculty required";
    if (!form.major) errs.major = "Major required";
    return errs;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSelect(name: string, value: string) {
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <div className="p-4 text-green-700 font-semibold">Application submitted! (Demo only)</div>
    );
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" value={form.name} onChange={handleChange} />
        {errors.name && <div className="text-red-600 text-xs mt-1">{errors.name}</div>}
      </div>
      <div>
        <Label htmlFor="gpa">GPA</Label>
        <Input id="gpa" name="gpa" value={form.gpa} onChange={handleChange} type="number" step="0.01" min="0" max="4" />
        {errors.gpa && <div className="text-red-600 text-xs mt-1">{errors.gpa}</div>}
      </div>
      <div>
        <Label htmlFor="income">Family Income</Label>
        <Input id="income" name="income" value={form.income} onChange={handleChange} type="number" min="0" />
        {errors.income && <div className="text-red-600 text-xs mt-1">{errors.income}</div>}
      </div>
      <div>
        <Label htmlFor="faculty">Faculty</Label>
        <Select value={form.faculty} onValueChange={(v) => handleSelect("faculty", v)}>
          <SelectTrigger id="faculty">
            <SelectValue placeholder="Select faculty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Science">Science</SelectItem>
            <SelectItem value="Engineering">Engineering</SelectItem>
            <SelectItem value="Arts">Arts</SelectItem>
            <SelectItem value="Business">Business</SelectItem>
          </SelectContent>
        </Select>
        {errors.faculty && <div className="text-red-600 text-xs mt-1">{errors.faculty}</div>}
      </div>
      <div>
        <Label htmlFor="major">Major</Label>
        <Input id="major" name="major" value={form.major} onChange={handleChange} />
        {errors.major && <div className="text-red-600 text-xs mt-1">{errors.major}</div>}
      </div>
      <Button type="submit" className="w-full">Apply</Button>
    </form>
  );
}
