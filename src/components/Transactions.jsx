import { ArrowRight } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard";
import moment from "moment";

const Transactions=({transactions, onMore, type, title})=>
{
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">{title}</h5>
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
        {transactions?.slice(0, 5)?.map((item, index) => (
          <TransactionInfoCard
            key={`${item.id}-${index}`} // Guaranteed uniqueness
            title={item.name}
            icon={item.icon}
            date={moment(item.date).format("Do MMM YYYY")}
            amount={item.amount}
            type={type}
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  );
}

export default Transactions;