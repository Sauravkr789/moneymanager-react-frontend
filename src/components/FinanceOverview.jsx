import { addThousandsSeparator } from "../util/utils";
import CustomPieChart from "./CustomPieChart";

const FinanceOverview=({totalBalance, totalIncome, totalExpense})=>{

  const COLORS=["#59168B", "#a0090e", "#016630"];

  const balanceData=[
    {name: "Total Balance", amount: totalBalance},
    {name: "Total Expense", amount: totalExpense},
    {name: "Total Income", amount: totalIncome},
  ];


  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      <div className="flex justify-between items-center">
        <h5 className="text-lg">Financial Overview</h5>
      </div>

      <CustomPieChart
        data={balanceData}
        label="Total Balance"
        totalAmount={`₹${addThousandsSeparator(totalBalance)}`}
        colors={COLORS}
        showTextAnchor
      />
    </div>
    
  );

  
}

export default FinanceOverview;
