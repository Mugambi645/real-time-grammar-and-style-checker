// src/components/AnalyticsDashboard.tsx
import {
    CheckCircle2,
    AlertCircle,
    Sparkles,
    TrendingUp,
  } from 'lucide-react';
  import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend,
  } from 'recharts';
  
  type Stats = {
    totalErrors: number;
    totalSuggestions: number;
    score: number; // 0–100
  } | null;
  
  interface Props {
    stats: Stats;
  }
  
  // Helpers for pie chart labels
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: any) => {
    const radius = (innerRadius + outerRadius) / 2;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        className="text-sm font-bold"
      >
        {(percent * 100).toFixed(0)}%
      </text>
    );
  };
  
  export const AnalyticsDashboard = ({ stats }: Props) => {
    /** ------------------------------
     *  EMPTY STATE
     * ------------------------------ */
    if (!stats) {
      return (
        <div className="bg-white flex flex-col items-center justify-center p-10 rounded-xl shadow-sm border text-center min-h-[300px]">
          <Sparkles className="h-12 w-12 text-gray-300 mb-4" />
          <p className="text-gray-500 text-lg">
            Start typing to see real-time analytics
          </p>
        </div>
      );
    }
  
    const { totalErrors, totalSuggestions, score } = stats;
  
    /** ------------------------------
     *  SAFE PIE DATA (no negatives)
     * ------------------------------ */
    const correctValue = Math.max(0, 100 - totalErrors);
    const issuesValue = Math.max(0, totalErrors);
  
    const data = [
      { name: 'Correct', value: correctValue, color: '#10b981' },
      { name: 'Issues', value: issuesValue, color: '#ef4444' },
    ];
  
    /** ------------------------------
     *  Dynamic score color
     * ------------------------------ */
    const scoreColor =
      score >= 90
        ? 'text-green-300'
        : score >= 70
        ? 'text-yellow-300'
        : 'text-red-300';
  
    return (
      <div className="space-y-6">
  
        {/* ------------------------------
            SCORE CARD
        ------------------------------ */}
        <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-200 text-sm">Writing Score</p>
              <p className={`text-6xl font-extrabold mt-2 ${scoreColor}`}>
                {score}
              </p>
              <p className="text-blue-200 text-sm mt-1">out of 100</p>
            </div>
            <TrendingUp className="h-16 w-16 opacity-40" />
          </div>
        </div>
  
        {/* ------------------------------
            QUICK STATS CARDS
        ------------------------------ */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-center">
            <AlertCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
            <p className="text-3xl font-bold text-red-700">{totalErrors}</p>
            <p className="text-sm text-red-600">Errors Found</p>
          </div>
  
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-center">
            <Sparkles className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-3xl font-bold text-blue-700">{totalSuggestions}</p>
            <p className="text-sm text-blue-600">Suggestions</p>
          </div>
        </div>
  
        {/* ------------------------------
            PIE CHART
        ------------------------------ */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">
            Text Quality Breakdown
          </h3>
  
          <div className="w-full" style={{ height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={100}
                  dataKey="value"
                >
                  {data.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
  
          {totalErrors === 0 && (
            <div className="text-center mt-4">
              <CheckCircle2 className="h-10 w-10 text-green-500 mx-auto" />
              <p className="text-green-600 font-medium mt-2">
                Perfect text!
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };
  