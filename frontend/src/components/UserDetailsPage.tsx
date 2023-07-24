import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchUserById, updateUser, deleteUser } from "../api"; // Import the fetchUserById, updateUser, and deleteUser functions from api.ts

import { User } from "../types";

const UserDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<Partial<User>>({});

  useEffect(() => {
    fetchUser();
  }, []); // eslint-disable-line

  const fetchUser = async () => {
    try {
      if (!id) {
        console.error("Invalid user ID");
        return;
      }
      const user = await fetchUserById(id); // Fetch user details from the backend
      setFormData(user || {});
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!id) {
        console.error("Invalid user ID");
        return;
      }
      await updateUser(id, formData); // Send a PUT request to update the user details
      navigate("/");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDelete = async () => {
    try {
      if (!id) {
        console.error("Invalid user ID");
        return;
      }
      await deleteUser(id); // Send a DELETE request to delete the user
      navigate("/");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-4">Edit User</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block text-gray-700 font-semibold"
            >
              First Name:
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              onChange={handleChange}
              value={formData.firstName || ""}
              className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block text-gray-700 font-semibold"
            >
              Last Name:
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              onChange={handleChange}
              value={formData.lastName || ""}
              className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              value={formData.email || ""}
              className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="phoneNumber"
              className="block text-gray-700 font-semibold"
            >
              Phone Number:
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              onChange={handleChange}
              value={formData.phoneNumber || ""}
              className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600"
          >
            Update User
          </button>
          <button
            type="button"
            className="w-full bg-red-500 text-white py-3 rounded-md hover:bg-red-600"
            onClick={handleDelete}
          >
            Delete User
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserDetailsPage;
