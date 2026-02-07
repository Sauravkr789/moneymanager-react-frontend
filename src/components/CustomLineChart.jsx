import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
} from "recharts";

/* ---------- Custom Tooltip ---------- */
const CustomTooltip = ({
  active,
  payload,
}) => {
  if (!active || !payload || !payload.length) return null;
  const data = payload[0].payload;
  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-3 text-sm">
      {" "}
      <p className="font-semibold text-gray-800">{data.month}</p>{" "}
      <p className="mt-1 text-purple-600 font-medium">
        {" "}
        Total: ₹{data.totalAmount.toLocaleString()}{" "}
      </p>{" "}
      <div className="mt-2 text-gray-600">
        {" "}
        <p className="font-medium">Details:</p>{" "}
        {data.items.map((item, index) => (
          <p key={index}>
            {" "}
            {item.name}: ₹{item.amount.toLocaleString()}{" "}
          </p>
        ))}{" "}
      </div>{" "}
    </div>
  );
};

/* ---------- Chart ---------- */
const CustomLineChart = ({ data, type }) => {
  if (!data || data.length === 0) {
    return (
      <div className="text-sm text-gray-400 text-center py-10">
        {" "}
        No {type} data available{" "}
      </div>
    );
  }
  return (
    <div className="w-full h-80">
      {" "}
      <ResponsiveContainer width="100%" height={320}>
        {" "}
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
        >
          {" "}
          {/* Gradients */}{" "}
          <defs>
            {" "}
            {/* Area shadow */}{" "}
            <linearGradient id="incomeAreaGradient" x1="0" y1="0" x2="0" y2="1">
              {" "}
              <stop offset="0%" stopColor="#7c3aed" stopOpacity={0.35} />{" "}
              <stop offset="100%" stopColor="#7c3aed" stopOpacity={0.03} />{" "}
            </linearGradient>{" "}
            {/* Glow effect */}{" "}
            <filter id="glow">
              {" "}
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />{" "}
              <feMerge>
                {" "}
                <feMergeNode in="coloredBlur" />{" "}
                <feMergeNode in="SourceGraphic" />{" "}
              </feMerge>{" "}
            </filter>{" "}
          </defs>{" "}
          <CartesianGrid strokeDasharray="3 3" vertical={false} />{" "}
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />{" "}
          <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />{" "}
          <Tooltip content={<CustomTooltip />} /> {/* Shadow / Area */}{" "}
          <Area
            type="monotone"
            dataKey="totalAmount"
            fill="url(#incomeAreaGradient)"
            stroke="none"
          />{" "}
          {/* Animated Line */}{" "}
          <Line
            type="natural"
            dataKey="totalAmount"
            stroke="#7c3aed"
            strokeWidth={3}
            dot={{ r: 3, fill: "#7c3aed" }}
            activeDot={{ r: 6, fill: "#7c3aed" }}
            strokeLinecap="round"
          />{" "}
        </LineChart>{" "}
      </ResponsiveContainer>{" "}
    </div>
  );
};

export default CustomLineChart;
