import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import { useEffect, useState } from "react";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import ExpenseList from "../components/ExpenseList";
import { toast } from "react-hot-toast";
import Model from "../components/Model";
import AddExpenseForm from "../components/AddExpenseForm";
import DeleteAlert from "../components/DeleteAlert";
import ExpenseOverview from "../components/ExpenseOverview";

const Expense = () => {
  useUser();

  const [expenseData, setExpenseData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openAddExpenseModel, setOpenAddExpenseModel] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  // Fetch expense details from the backend
  const fetchExpenseDetails = async () => {
    if (loading) {
      return;
    }

    setLoading(true);

    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_EXPENSES);

      if (response.status === 200) {
        setExpenseData(response.data);
      }
    } catch (err) {
      console.error("Error fetching expense details:", err);
      toast.error(
        err.response?.data?.message || "Failed to fetch expense details",
      );
    } finally {
      setLoading(false);
    }
  };

  //fetch categories for expense
  const fetchExpenseCategories = async () => {
    try {
      const response = await axiosConfig.get(
        API_ENDPOINTS.CATEGORY_BY_TYPE("expense"),
      );
      if (response.status === 200) {
        setCategories(response.data);
      }
    } catch (err) {
      console.error("Error fetching expense categories:", err);
      toast.error(
        err.response?.data?.message || "Failed to fetch expense categories",
      );
    }
  };

  const handleAddExpense = async (expense) => {
    const { name, amount, date, icon, categoryId } = expense;

    //Validation
    if (!name.trim()) {
      toast.error("Please enter a name");
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Please enter a valid amount greater than 0");
      return;
    }

    if (!date) {
      toast.error("Please select a date");
      return;
    }

    const today = new Date().toISOString().split("T")[0];

    if (date > today) {
      toast.error("Date can't be in the future");
      return;
    }

    if (!categoryId) {
      toast.error("Please select a category");
      return;
    }

    try {
      const response = await axiosConfig.post(API_ENDPOINTS.ADD_EXPENSE, {
        name,
        amount: Number(amount),
        date,
        icon,
        categoryId,
      });

      if (response.status == 201) {
        setOpenAddExpenseModel(false);
        toast.success("Expense added successfully");
        fetchExpenseDetails();
        fetchExpenseCategories();
      }
    } catch (err) {
      console.log("Error adding expense", err);
      toast.error(err.response?.data?.message || "Failed to add an expense");
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axiosConfig.delete(API_ENDPOINTS.DELETE_EXPENSE(id));

      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Expense deleted successfully");
      fetchExpenseDetails();
    } catch (err) {
      console.log("Error deleting expense", err);
      toast.error(err.response?.data?.message || "Failed to delete expense");
    }
  };

  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axiosConfig.get(
        API_ENDPOINTS.EXPENSE_EXCEL_DOWNLOAD,
        { responseType: "blob" },
      );
      let filename = "expense_details.xlsx";
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Expense details downloaded successfully");
    } catch (err) {
      console.log("Error downloading expense details.", err);
      toast.error(
        err.response?.data?.message || "Failed to download expense details.",
      );
    }
  };

  const handleEmailExpenseDetails = async () => {
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.EMAIL_EXPENSE);

      if (response.status === 200) {
        toast.success("Expense details emailed successfully");
      }
    } catch (err) {
      console.log("Error emailing expense details", err);
      toast.error(
        err.response?.data?.message || "Failed to email expense details",
      );
    }
  };

  useEffect(() => {
    fetchExpenseDetails();
    fetchExpenseCategories();
  }, []);

  return (
    <Dashboard activeMenu="Expense">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div>
            {/* Overview of Expense with line chart */}

            <ExpenseOverview
              transactions={expenseData}
              onAddExpense={() => setOpenAddExpenseModel(true)}
            />
          </div>

          <ExpenseList
            transactions={expenseData}
            onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
            onDownload={handleDownloadExpenseDetails}
            onEmail={handleEmailExpenseDetails}
          />

          {/* Add Expense Model */}
          <Model
            isOpen={openAddExpenseModel}
            onClose={() => setOpenAddExpenseModel(false)}
            title="Add Expense"
          >
            {/* Add Expense Form Component */}
            <AddExpenseForm
              onAddExpense={(Expense) => handleAddExpense(Expense)}
              categories={categories}
            />
          </Model>

          {/* Add Expense Model */}
          <Model
            isOpen={openDeleteAlert.show}
            onClose={() => setOpenDeleteAlert({ show: false, data: null })}
            title="Delete Expense"
          >
            <DeleteAlert
              content="Are you sure, want to delete this Expense details?"
              onDelete={() => deleteExpense(openDeleteAlert.data)}
            />
          </Model>
        </div>
      </div>
    </Dashboard>
  );
};

export default Expense;
