"use client";

import { formatPrice } from "../lib/currency";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  data: {
    name: string;
    revenue: number;
  }[];
};

export default function SalesChart({ data }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6">
        Sales Analytics
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis
            tickFormatter={(value) =>
              formatPrice(Number(value))
            }
          />

          <Tooltip
            formatter={(value) =>
              formatPrice(Number(value))
            }
          />

          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#db2777"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}