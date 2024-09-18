import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Enquiry = () => {
  const [users, setUsers] = useState([]);

  const API_BASE_URL = "http://localhost:5002/api/user/";

  // Fetch all users when component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Enquiries</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Phone Number</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
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
    </div>
  );
};

export default Enquiry;
