// Admin.jsx
import React, { useState, useEffect } from "react";
import { regions } from "../api/Api";
import AdminAdd from "../component/AdminAdd";
import EditableRow from "../component/EditableRow";





const Admin = () => {
  const [adminData, setAdminData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editedData, setEditedData] = useState({
    id: null,
    title: "",
    image: "",
  });

  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = adminData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        ` http://localhost:8801/deleteCamera/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setAdminData((prevData) => prevData.filter((item) => item.id !== id));
        console.log(`Item with ID ${id} deleted successfully`);
      } else {
        console.error(`Failed to delete item with ID ${id}`);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const updatedTitle = document.getElementById(`editedTitle_${id}`).value;
      const updatedImage = document.getElementById(`editedImage_${id}`).value;

      const response = await fetch(
        ` http://localhost:8801/updateCamera/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: updatedTitle,
            image: updatedImage,
          }),
        }
      );

      if (response.ok) {
        setAdminData((prevData) =>
          prevData.map((item) =>
            item.id === id
              ? { ...item, title: updatedTitle, image: updatedImage }
              : item
          )
        );

        console.log(`Item with ID ${id} updated successfully`);
        setEditedData({ id: null, title: "", image: "" });
      } else {
        console.error(`Failed to update item with ID ${id}`);
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  useEffect(() => {
    regions()
      .then((res) => {
        setAdminData(res);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-1100 mx-auto">
        <AdminAdd setAdminData={setAdminData} />
      </div>
      <div className="w-[40%] py-8">
        <table className="w-full bg-white font-[sans-serif]">
          <tbody className="whitespace-nowrap">
            {currentItems.map((el) => (
              <EditableRow
                key={el.id}
                data={el}
                isEditing={editedData.id === el.id}
                onEdit={() => setEditedData({ id: el.id, title: el.title, image: el.image })}
                onUpdate={() => handleUpdate(el.id)}
                onDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
        {/* Pagination controls */}
        <div className="flex justify-center mt-4">
          {[...Array(Math.ceil(adminData.length / itemsPerPage))].map(
            (_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`px-3 py-2 mx-1 focus:outline-none ${
                  currentPage === index + 1
                    ? "bg-gray-800 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
