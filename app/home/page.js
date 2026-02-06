"use client";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({ column: null, direction: null }); //Kaunse column par sort ho raha hai + asc/desc

  // Visible Columns (Load from LocalStorage)
  const [visibleColumns, setVisibleColumns] = useState([]);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10; // 1 page = 10 rows

  useEffect(() => {
    fetch("/data")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("visibleColumns");
    setVisibleColumns(saved ? JSON.parse(saved) : ["name", "email", "age", "role","department","location"]);
  }, []);

  // Import CSV
  function handleImportCSV(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const rows = evt.target.result.split("\n").map((row) => row.split(","));
      const headers = rows[0];

      const importedUsers = rows.slice(1).map((row, index) => {
        const obj = { id: Date.now() + index };
        headers.forEach((key, i) => {
          obj[key.trim()] = row[i]?.trim();
        });
        return obj;
      });

      setUsers((prev) => [...prev, ...importedUsers]);
    };
    reader.readAsText(file);
  }

    function handleExportCSV() {
    if (users.length === 0) return;

    const csvHeader = Object.keys(users[0]).join(",") + "\n";
    const csvRows = users.map((row) => Object.values(row).join(",")).join("\n");
    const blob = new Blob([csvHeader + csvRows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "users_data.csv";
    a.click();
    URL.revokeObjectURL(url);
  }


  // Search Filter
  let filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  // Sorting Logic
  if (sort.column) {
    filteredUsers = [...filteredUsers].sort((a, b) => {
      if (sort.direction === "asc") {
        return a[sort.column] > b[sort.column] ? 1 : -1;
      } else {
        return a[sort.column] < b[sort.column] ? 1 : -1;
      }
    });
  }

  function handleSort(column) {
    if (sort.column !== column) {
      setSort({ column, direction: "asc" });
    } else if (sort.direction === "asc") {
      setSort({ column, direction: "desc" });
    } else {
      setSort({ column: null, direction: null });
    }
  }

  // Pagination Calculation
  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);

  function handlePrev() {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  }
  function handleNext() {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  }

  return (
    <div className="p-8">
      {/* Search Box */}
      <div className="mb-6 flex items-center gap-2 w-full max-w-xs border border-gray-300 px-3 py-2 rounded-full shadow-sm mx-auto">
        <input
          type="text"
          placeholder="Search names.."
          value={search}
          onChange={(e) => {
            setCurrentPage(1);
            setSearch(e.target.value);
          }}
          className="w-full outline-none text-sm"
        />

        {search && (
          <button
            onClick={() => setSearch("")}
            className="text-gray-500 hover:text-black"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <h2 className="text-4xl font-semibold mb-6 text-gray-800 text-center">
        Users Table
      </h2>

      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-gray-100 text-left text-gray-600 font-semibold">
            <tr>
              {visibleColumns.includes("name") && (
                <th
                  onClick={() => handleSort("name")}
                  className="px-4 py-3 border-b cursor-pointer"
                >
                  Name
                </th>
              )}
              {visibleColumns.includes("email") && (
                <th className="px-4 py-3 border-b">Email</th>
              )}
              {visibleColumns.includes("age") && (
                <th
                  onClick={() => handleSort("age")}
                  className="px-4 py-3 border-b cursor-pointer"
                >
                  Age
                </th>
              )}
              {visibleColumns.includes("role") && (
                <th
                  onClick={() => handleSort("role")}
                  className="px-4 py-3 border-b cursor-pointer"
                >
                  Role
                </th>
              )}
              {visibleColumns.includes("department") && (
                <th
                  onClick={() => handleSort("department")}
                  className="px-4 py-3 border-b cursor-pointer"
                >
                  Department
                </th>
              )}
              {visibleColumns.includes("location") && (
                <th
                  onClick={() => handleSort("location")}
                  className="px-4 py-3 border-b cursor-pointer"
                >
                  Location
                </th>
              )}
            </tr>
          </thead>

          <tbody className="text-gray-700">
            {currentUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition">
                {visibleColumns.includes("name") && (
                  <td className="px-4 py-3 border-b">{user.name}</td>
                )}
                {visibleColumns.includes("email") && (
                  <td className="px-4 py-3 border-b">{user.email}</td>
                )}
                {visibleColumns.includes("age") && (
                  <td className="px-4 py-3 border-b">{user.age}</td>
                )}
                {visibleColumns.includes("role") && (
                  <td className="px-4 py-3 border-b">{user.role}</td>
                )}
                {visibleColumns.includes("department") && (
                  <td className="px-4 py-3 border-b">{user.department}</td>
                )}
                {visibleColumns.includes("location") && (
                  <td className="px-4 py-3 border-b">{user.location}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination + Manage Columns Button */}
      <div className="flex justify-between items-center gap-3 mt-4">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded-lg text-sm font-medium  cursor-pointer hover:bg-gray-100 disabled:opacity-50"
        >
          Prev
        </button>

        <span className="text-gray-600 text-sm">
          Page {currentPage} of {totalPages}
        </span>

        <Link href="/manageColumn">
          <button className="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-gray-100">
            Manage Columns
          </button>
        </Link>

        <label className="px-4 py-2 border border-gray-300 rounded-lg text-sm cursor-pointer hover:bg-gray-100 transition">
          Import CSV
          <input type="file" accept=".csv" onChange={handleImportCSV} hidden />
        </label>

        <button
          onClick={handleExportCSV}
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-100 transition"
        >
          Export CSV
        </button>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-gray-100 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
