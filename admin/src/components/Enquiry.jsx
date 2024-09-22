import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Enquiry = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5); // Change the value for different number of users per page
  const URI = import.meta.env.VITE_API_URL;

  const API_BASE_URL = `${URI}api/user/`;

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchTerm, users]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}all`);
      setUsers(response.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to fetch users",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleSearch = () => {
    const search = searchTerm.toLowerCase();
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(search) ||
      user.phoneNumber.includes(search)
    );
    setFilteredUsers(filtered);
  };

  const handleUpdate = async (userId) => {
    try {
      const newName = prompt("Enter new name:");
      const newPhone = prompt("Enter new phone number:");

      if (newName && newPhone) {
        const payload = {
          name: newName,
          phoneNumber: newPhone,
        };

        const response = await axios.put(`${API_BASE_URL}${userId}`, payload);
        if (response.status === 200) {
          Swal.fire({
            title: "Success",
            text: "User updated successfully!",
            icon: "success",
            confirmButtonText: "OK",
          });
          fetchUsers(); // Refresh the user list
        }
      }
    } catch (error) {
      console.error("Error updating user:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to update user",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleDelete = async (userId) => {
    try {
      const confirm = window.confirm("Are you sure you want to delete this user?");
      if (confirm) {
        const response = await axios.delete(`${API_BASE_URL}${userId}`);
        if (response.status === 200) {
          Swal.fire({
            title: "Success",
            text: "User deleted successfully!",
            icon: "success",
            confirmButtonText: "OK",
          });
          fetchUsers(); // Refresh the user list
        }
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to delete user",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Enquiries</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by name or phone number"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded w-full"
      />

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Phone Number</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.length > 0 ? (
            currentUsers.map((user) => (
              <tr key={user._id}>
                <td className="py-2 px-4 border-b">{user.name}</td>
                <td className="py-2 px-4 border-b">{user.phoneNumber}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-700"
                    onClick={() => handleUpdate(user._id)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="py-4 px-4 text-center">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Enquiry;
