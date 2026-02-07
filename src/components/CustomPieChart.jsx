import React from "react";
import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";

const CustomPieChart = ({ data, label, totalAmount, colors }) => {
  // Fix for Duplicate Key: Ensure each data item has a unique property
  const chartData = data.map((item, index) => ({
    ...item,
    // Add a unique ID if one doesn't exist to prevent key collisions
    uniqueId: `${item.name}-${index}`,
    fill: colors[index % colors.length],
  }));

  return (
    // 'min-w-0' helps ResponsiveContainer calculate width correctly in flex layouts
    <div className="w-full h-100 flex flex-col justify-between items-center min-w-0">
      <div className="relative w-full flex-1 flex items-center justify-center">
        {/* Use a fixed aspect ratio or ensure parent has height to stop the width(-1) error */}
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              /* --- SLIGHTLY SMALLER & THINNER --- */
              innerRadius={100}
              outerRadius={120}
              /* ---------------------------------- */
              dataKey="amount"
              startAngle={90}
              endAngle={-270}
              stroke="none"
              // Adding a unique name key for the segments
              nameKey="uniqueId"
            />
            <Tooltip
              formatter={(value) => `₹${value.toLocaleString()}`}
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Centered Text Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-gray-400 text-xs font-medium mb-1 uppercase tracking-wider">
            {label}
          </p>
          <h3 className="text-xl font-bold text-gray-800">{totalAmount}</h3>
        </div>
      </div>

      {/* Legend Area */}
      <div className="flex flex-wrap justify-center gap-4 pb-2">
        {chartData.map((entry) => (
          // Fixed the key error here by using the uniqueId we created
          <div key={entry.uniqueId} className="flex items-center gap-2">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: entry.fill }}
            ></div>
            <span className="text-gray-600 text-xs font-medium">
              {entry.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomPieChart;

// import React from "react";
// import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";

// const CustomPieChart = ({ data, label, totalAmount, colors }) => {
//   // Map colors to data to avoid the deprecated <Cell /> component
//   const chartData = data.map((item, index) => ({
//     ...item,
//     fill: colors[index % colors.length],
//   }));

//   return (
//     <div className="w-full h-100 flex flex-col justify-between items-center">
//       <div className="relative w-full flex-1 flex items-center justify-center">
//         <ResponsiveContainer width="100%" height="100%">
//           <PieChart>
//             <Pie
//               data={chartData}
//               cx="50%"
//               cy="50%"
//               /* --- RADIUS ADJUSTMENT --- */
//               innerRadius={115} // Increased inner radius to reduce thickness
//               outerRadius={140} // Keeps the overall size consistent
//               /* ------------------------- */
//               dataKey="amount"
//               startAngle={90}
//               endAngle={-270}
//               stroke="none"
//             />
//             <Tooltip
//               formatter={(value) => `₹${value.toLocaleString()}`}
//               contentStyle={{
//                 borderRadius: "8px",
//                 border: "none",
//                 boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
//               }}
//             />
//           </PieChart>
//         </ResponsiveContainer>

//         {/* Centered Text Overlay */}
//         <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
//           <p className="text-gray-500 text-sm font-medium mb-1">{label}</p>
//           <h3 className="text-3xl font-bold text-gray-800">{totalAmount}</h3>
//         </div>
//       </div>

//       {/* Legend Area */}
//       <div className="flex flex-wrap justify-center gap-6 pb-4">
//         {chartData.map((entry, index) => (
//           <div key={index} className="flex items-center gap-2">
//             <div
//               className="w-3 h-3 rounded-full"
//               style={{ backgroundColor: entry.fill }}
//             ></div>
//             <span className="text-gray-700 text-sm font-medium">
//               {entry.name}
//             </span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CustomPieChart;
