import { Plus } from "lucide-react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import CategoryList from "../components/CategoryList";
import { useEffect, useState } from "react";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import Model from "../components/Model";
import AddCategoryForm from "../components/AddCategoryForm";
import { toast } from "react-hot-toast";

const Category=()=>{
  useUser();

  const [loading, setLoading]=useState(false);
  const [categoryData, setCategoryData]=useState([]);
  const [openAddCategoryModel, setOpenAddCategoryModel]=useState(false);
  const [openEditCategoryModel, setOpenEditCategoryModel]=useState(false);
  const [selectedCategory, setSelectedCategory]=useState(null);

  const fetchCategoryDetails=async()=>{
    if(loading){
      return;
    }

    setLoading(true);

    try {
      const response=await axiosConfig.get(API_ENDPOINTS.GET_ALL_CATEGORIES);

      if(response.status===200){
        setCategoryData(response.data);
      }
    } catch (err) {
      console.error("Something went wrong. Please try again.", err);
      toast.error(err.message);
    }finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
    fetchCategoryDetails();
  }, []);

  const handleEditCategory=(categoryToEdit)=>{
    setSelectedCategory(categoryToEdit);
    setOpenEditCategoryModel(true);
  }

  const handleUpadateCategory= async(updatedCategory)=>
  {
    const {id, name, type, icon} = updatedCategory;

    if(!name.trim())
    {
      toast.error("Category name is required");
      return;
    }

    if(!id)
    {
      toast.error("Invalid category selected");
      return;
    }

    try {
      await axiosConfig.put(API_ENDPOINTS.UPDATE_CATEGORY(id), {name, type, icon});
      setOpenEditCategoryModel(false);
      setSelectedCategory(null);
      toast.success("Category updated successfully");
      fetchCategoryDetails();
      
    } catch (err) {
      console.error("Error updating category:", err.response?.data?.message || err.message);
      toast.error(err.response?.data?.message || "Failed to update category.");
    }
  }

  const handleAddCategory= async (category)=>
  {
      const {name, type, icon} = category;

      if(!name.trim())
      {
        toast.error("Category name is required");
        return;
      }

      //check if category with same name and type already exists
      const isDuplicate = categoryData.some(
        (cat) => {
          return cat.name.toLowerCase() === name.trim().toLowerCase();
        }
      )

      if(isDuplicate)
      {
        toast.error("Category name already exists");
        return;
      }

      try {
        const response = await axiosConfig.post(API_ENDPOINTS.ADD_CATEGORY, {name, type, icon});
        
        if(response.status === 201)
        {
          toast.success("Category added successfully");
          setOpenAddCategoryModel(false);
          fetchCategoryDetails();
        }
      } catch (err) {
        console.error("Error adding category:", err);
        toast.error(err.response?.data?.message ||"Failed to add category. Please try again.");
      }
  }
  return (
    <Dashboard activeMenu="Category">
      <div className="my-5 mx-auto">
        {/* Category management interface */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-semibold">All Categories</h2>
          <button 
            onClick={() => {
              setOpenAddCategoryModel(true);
            }}
            className="flex items-center gap-1 cursor-pointer bg-green-100 text-green-700 px-3 py-1 rounded-md">
            <Plus size={15} />
            Add Category
          </button>
        </div>

        {/* List of categories will be displayed here */}
        <CategoryList categories={categoryData} onEditCategory={handleEditCategory}/>

        {/* Add category model */}
        <Model
          isOpen={openAddCategoryModel}
          onClose={() => 
            setOpenAddCategoryModel(false)
          }
          title="Add New Category"
        >
          <AddCategoryForm onAddCategory={handleAddCategory}/>
        </Model>


        {/* Edit category model */}
        <Model 
          isOpen={openEditCategoryModel}
          onClose={()=> {
            setOpenEditCategoryModel(false)
            setSelectedCategory(null)
          }}
          title="Update Category"
        >

          <AddCategoryForm 
              initialCategoryData={selectedCategory}
              onAddCategory={handleUpadateCategory}
              isEditing={true}
          />

        </Model>
      </div>
    </Dashboard>
  );
}


export default Category;