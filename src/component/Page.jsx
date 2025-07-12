import React from "react";
import { useState, useEffect, useMemo } from "react";

const Page = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  useEffect(() => {
    stackdot();
  }, []);

  const stackdot = async () => {
    try {
      const data = await fetch("https://jsonplaceholder.typicode.com/users");

      const apiData = await data.json();
      setUsers(apiData);
      console.log(apiData);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const uniqueCities = useMemo(() => {
    const cities = users.map((user) => user.address.city);
    return [...new Set(cities)].sort();
  }, [users]);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + usersPerPage
  );
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch = user.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCity =
        selectedCity === "" || user.address.city === selectedCity;
      return matchesSearch && matchesCity;
    });
  }, [users, searchTerm, selectedCity]);
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <h1 className="h-12 w-12  text-blue-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-loader-icon lucide-loader"
            >
              <path d="M12 2v4" />
              <path d="m16.2 7.8 2.9-2.9" />
              <path d="M18 12h4" />
              <path d="m16.2 16.2 2.9 2.9" />
              <path d="M12 18v4" />
              <path d="m4.9 19.1 2.9-2.9" />
              <path d="M2 12h4" />
              <path d="m4.9 4.9 2.9 2.9" />
            </svg>
          </h1>
          <p className="text-gray-600 text-lg">Loading users...</p>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
        <h1 className="text-2xl font-bold text-white">User Directory</h1>
        <p className="text-blue-100 mt-1">
          Manage and search through user profiles
        </p>
      </div>

      <div className="relative">
        <input
          type="text"
          placeholder="Search users by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
        />
      </div>

      <div>
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
        >
          <option value="">All Cities</option>
          {uniqueCities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      <div className="px-6 py-3 bg-white border-b border-gray-200">
        <p className="text-sm text-gray-600">
          Showing {paginatedUsers.length} of {filteredUsers.length} users
        </p>
      </div>
    </div>
  );
};

export default Page;
