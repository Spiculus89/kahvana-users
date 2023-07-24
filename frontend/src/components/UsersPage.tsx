import React, { useEffect, useState } from "react";
import { fetchUsers } from "../api";
import { User } from "../types";
import { Link } from "react-router-dom";

const UsersPage: React.FC = () => {
  const [fetchedUsers, setFetchedUsers] = useState<User[]>([]);
  const [query, setQuery] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const usersPerPage = 5;

  useEffect(() => {
    fetchUsersWithFilters();
  }, []); // eslint-disable-line

  const fetchUsersWithFilters = async () => {
    try {
      const users = await fetchUsers({ query, email, phoneNumber }); // Fetch users with applied filters from the backend
      setFetchedUsers(users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to the first page when form is submitted
    fetchUsersWithFilters();
  };

  const handlePagination = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = fetchedUsers.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-4">Users</h1>
        <form onSubmit={handleFormSubmit} className="space-y-4 mb-4">
          <div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name"
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Search by email"
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>
          <div>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Search by phone number"
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">
            Search
          </button>
        </form>
        {currentUsers.length === 0 ? (
          <div>
            <p className="mb-4 text-gray-700">No users found.</p>
            <Link
              to="/create"
              className="block w-full bg-blue-500 text-white py-3 rounded-md text-center hover:bg-blue-600"
            >
              Add a User
            </Link>
          </div>
        ) : (
          <div>
            <ul className="mt-4">
              {currentUsers.map((user) => (
                <li key={user._id} className="border-b py-3">
                  <Link to={`/edit/${user._id}`} className="text-blue-500 hover:underline">
                    <div className="text-xl font-semibold">
                      {user.firstName} {user.lastName}
                    </div>
                  </Link>
                  <div className="text-gray-600">Email: {user.email}</div>
                  <div className="text-gray-600">Phone Number: {user.phoneNumber}</div>
                </li>
              ))}
            </ul>
            <div className="flex justify-center mt-4">
              {Array.from({ length: Math.ceil(fetchedUsers.length / usersPerPage) }).map(
                (_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePagination(index + 1)}
                    className={`mx-1 px-3 py-1 rounded-md ${
                      currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
                    }`}
                  >
                    {index + 1}
                  </button>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersPage;
