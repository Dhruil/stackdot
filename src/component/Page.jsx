import React from "react";
import { useState, useEffect, useMemo } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
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

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + usersPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  
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
    <div className="mx-10 border-3 border-blue-100 rounded-2xl ">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
        <h1 className="text-2xl font-bold text-white">User Directory</h1>
        <p className="text-blue-100 mt-1">
          Manage and search through user profiles
        </p>
      </div>

      <div className=" flex space-x-5 justify-between p-4">
        <input
          type="text"
          placeholder="Search users by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
        />

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

      <div className=" px-4">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase ">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase ">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                City
              </th>
            </tr>
          </thead>
          <tbody className="bg-white ">
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map((user, index) => (
                <tr
                  key={user.id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-6 py-4 ">
                    <div className="text-sm text-gray-900">{user.name}</div>
                  </td>
                  <td className="px-6 py-4 ">
                    <div className="text-sm text-gray-900">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 ">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {user.address.city}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-6 py-12 text-center">
                  <div className="text-gray-500">
                    <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-medium">No users found</p>
                    <p className="text-sm">
                      Try adjusting your search or filter criteria
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {filteredUsers.length > usersPerPage && (
        <div className="px-6 flex justify-end">
          <div className=" flex items-center justify-center">
            <nav className=" inline-flex rounded-md items-center space-x-px">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                      currentPage === page
                        ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                        : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
