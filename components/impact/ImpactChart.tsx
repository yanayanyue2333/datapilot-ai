"use client";

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card } from "@/components/ui/card";

interface ImpactChartProps {
  title: string;
  description: string;
  data: Array<{
    metric: string;
    Before: number;
    After: number;
  }>;
  unit: string;
}

export function ImpactChart({ title, description, data, unit }: ImpactChartProps) {
  return (
    <Card>
      <h2 className="text-base font-semibold text-slate-950">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
      <div className="mt-5 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="metric" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip formatter={(value) => [`${value}${unit}`, ""]} />
            <Legend />
            <Bar dataKey="Before" fill="#94a3b8" radius={[4, 4, 0, 0]} />
            <Bar dataKey="After" fill="#2563eb" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
