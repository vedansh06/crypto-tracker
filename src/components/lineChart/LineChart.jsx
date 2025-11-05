import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const LineChart = ({ data, strokeColor = "#4e8cff" }) => {
  return (
    <div className="w-full bg-[#0D1117] p-5 rounded-xl">
      <div style={{ width: "100%", height: 350 }}>
        <ResponsiveContainer>
          <AreaChart
            data={data}
            margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={strokeColor} stopOpacity={0.4} />
                <stop offset="100%" stopColor={strokeColor} stopOpacity={0} />
              </linearGradient>
            </defs>

            <YAxis
              stroke="#ccc"
              tickFormatter={(value) => "$" + value.toLocaleString("en-US")}
              tick={{ fontSize: 12 }}
            />

            <XAxis dataKey="date" tick={{ fill: "#9ca3af", fontSize: 12 }} />

            <CartesianGrid strokeOpacity={0.1} />

            <Tooltip
              formatter={(value) => [
                `$${value.toLocaleString("en-US")}`,
                "Price",
              ]}
              labelStyle={{ color: "#fff" }}
              contentStyle={{ background: "#111", border: "none" }}
            />

            <Area
              type="monotone"
              dataKey="price"
              stroke={strokeColor}
              strokeWidth={3}
              fill="url(#colorPrice)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineChart;
