import moment from "moment";

export const prepareIncomeLineChartData = (transactions = []) => {
  if (!transactions.length) return [];

  // Step 1: group by date
  const groupedByDate = transactions.reduce((acc, item) => {
    const date = item.date; // YYYY-MM-DD

    if (!acc[date]) {
      acc[date] = {
        date,
        totalAmount: 0,
        items: [],
      };
    }

    acc[date].totalAmount += Number(item.amount);
    acc[date].items.push(item);

    return acc;
  }, {});

  // Step 2: convert object → array
  const result = Object.values(groupedByDate).map((entry) => ({
    ...entry,
    month: moment(entry.date).format("Do MMM"),
  }));

  // Step 3: sort by date (ascending)
  result.sort((a, b) => new Date(a.date) - new Date(b.date));

  return result;
};
