import { LoaderCircle, Download, Mail } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard";
import moment from "moment";
import { useState } from "react";

const ExpenseList = ({ transactions, onDelete, onDownload, onEmail }) => {
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleEmail = async () => {
    setLoading(true);

    try {
      await onEmail();
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    setDownloading(true);

    try {
      await onDownload();
    } finally {
      setDownloading(false);
    }
  };
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-semibold">Expense Sources</h5>

        <div className="flex items-center justify-end gap-2">
          <button
            onClick={handleEmail}
            disabled={loading}
            className="group flex items-center gap-2 px-3 py-1.5 text-sm font-medium
                   text-gray-600 bg-gray-50 border border-gray-200 rounded-lg
                   hover:bg-purple-100/50 hover:text-purple-800 transition cursor-pointer"
          >
            {loading ? (
              <>
                <LoaderCircle className="w-4 h-4 animate-spin" />
                Emailing...
              </>
            ) : (
              <>
                <Mail size={15} className="group-hover:text-purple-800" />
                Email
              </>
            )}
          </button>

          <button
            onClick={handleDownload}
            disabled={loading}
            className="group flex items-center gap-2 px-3 py-1.5 text-sm font-medium
                   text-gray-600 bg-gray-50 border border-gray-200 rounded-lg
                   hover:bg-purple-100/50 hover:text-purple-800 transition cursor-pointer"
          >
            {downloading ? (
              <>
                <LoaderCircle className="w-4 h-4 animate-spin" />
                Downloading...
              </>
            ) : (
              <>
                <Download size={15} className="group-hover:text-purple-800" />
                Download
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Display the expenses*/}

        {transactions?.map((expense, index) => (
          <TransactionInfoCard
            key={`${expense.id}-${index}`} // Guaranteed uniqueness
            icon={expense.icon}
            title={expense.name}
            date={moment(expense.date).format("Do MMM YYYY")}
            amount={expense.amount}
            type="expense"
            onDelete={() => onDelete(expense.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;
