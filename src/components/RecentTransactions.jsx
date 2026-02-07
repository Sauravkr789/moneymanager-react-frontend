import { ArrowRight } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard"
import moment from "moment"


const RecentTransactions=({transactions, onMore})=>{
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      <div className="flex items-center justify-between">
        <h4 className="text-lg">Recent Transactions</h4>

        <button
          onClick={onMore}
          className="group flex items-center gap-2 px-3 py-1.5 text-sm font-medium
                   text-gray-600 bg-gray-50 border border-gray-200 rounded-lg
                   hover:bg-gray-100 hover:text-gray-800 transition"
        >
          More <ArrowRight className="text-base" size={15} />
        </button>
      </div>

      <div className="mt-6">
        {transactions?.slice(0, 5)?.map((item,index) => (
          <TransactionInfoCard
            key={`${item.id}-${index}`}
            title={item.name}
            icon={item.icon}
            date={moment(item.date).format("Do MMM YYYY")}
            amount={item.amount}
            type={item.type}
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  );
}


export default RecentTransactions;