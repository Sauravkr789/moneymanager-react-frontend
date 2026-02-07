import { useEffect, useState } from "react";
import { prepareIncomeLineChartData } from "../util/prepareIncomeLineChartData";
import CustomLineChart from "./CustomLineChart";
import { Plus } from "lucide-react";


const IncomeOverview=({transactions, onAddIncome})=>
{
  const [chartData, setChartData]=useState([]);

  useEffect(()=>
  {
    const result=prepareIncomeLineChartData(transactions);
    setChartData(result);

    return ()=>{};

  },[transactions])


  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h5 className="text-lg">Income Overview</h5>
          <p className="text-xs text-gray-400 mt-0 5">
            Track your earnings over time and analyze your income trends.
          </p>
        </div>
        <button
          onClick={onAddIncome}
          className="flex items-center gap-1 cursor-pointer bg-green-100 text-green-700 px-3 py-1 rounded-md"
        >
          <Plus size={15} className="text-lg" />
          Add Income
        </button>
      </div>
      {/* <div className="mt-10">
        <CustomLineChart data={chartData} type="income" />
      </div> */}

      <div className="mt-10 h-80 w-full">
        {" "}
        {/* Added explicit height and width */}
        {chartData.length > 0 ? (
          <CustomLineChart data={chartData} type="income" />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400">
            No data available to display
          </div>
        )}
      </div>
    </div>
  );
}

export default IncomeOverview;