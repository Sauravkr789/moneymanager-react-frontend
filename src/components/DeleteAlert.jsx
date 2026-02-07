import { LoaderCircle } from "lucide-react";
import { useState } from "react"


const DeleteAlert=({content, onDelete})=>
{
  const [loading, setLoading]=useState(false);

  const handleDelete=async()=>
  {
    setLoading(true);
    try{
      await onDelete();
    }
    finally{
      setLoading(false);
    }
  }
  return (
    <div>
      <p className="text-sm">{content}</p>

      <div className="flex justify-end mt-6">
        <button
          onClick={handleDelete}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700"
          type="button"
        >
          {loading ? (
            <>
              <LoaderCircle className="w-4 h-4 animate-spin" />
              Deleting...
            </>
          ) : (
            <>Delete</>
          )}
        </button>
      </div>
    </div>
  );
}


export default DeleteAlert;