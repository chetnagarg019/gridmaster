// "use client";
// import { useEffect, useState } from "react";
// import { X } from "lucide-react";

// export default function HomePage() {
//   const [users, setUsers] = useState([]);
//   const [search, setSearch] = useState("");
//   const [sort, setSort] = useState({ column: null, direction: null });

//   // Pagination State
//   const [currentPage, setCurrentPage] = useState(1);
//   const rowsPerPage = 10; // 1 page = 10 rows

//   useEffect(() => {
//     fetch("/data")
//       .then((res) => res.json())
//       .then((data) => setUsers(data));
//   }, []);

//   // Search Filter
//   let filteredUsers = users.filter((user) =>
//     user.name.toLowerCase().includes(search.toLowerCase())
//   );

//   // Sorting Logic
//   if (sort.column) {
//     filteredUsers = [...filteredUsers].sort((a, b) => {
//       if (sort.direction === "asc") {
//         return a[sort.column] > b[sort.column] ? 1 : -1;
//       } else {
//         return a[sort.column] < b[sort.column] ? 1 : -1;
//       }
//     });
//   }

//   function handleSort(column) {
//     if (sort.column !== column) {
//       setSort({ column, direction: "asc" });
//     } else if (sort.direction === "asc") {
//       setSort({ column, direction: "desc" });
//     } else {
//       setSort({ column: null, direction: null });
//     }
//   }

//   // Pagination Calculation
//   const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
//   const indexOfLast = currentPage * rowsPerPage;
//   const indexOfFirst = indexOfLast - rowsPerPage;
//   const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);

//   function handlePrev() {
//     if (currentPage > 1) setCurrentPage(currentPage - 1);
//   }

//   function handleNext() {
//     if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//   }

//   return (
//     <div className="p-8">
//       {/* Search Box */}
//       <div className="mb-6 flex items-center gap-2 w-full max-w-xs border border-gray-300 px-3 py-2 rounded-md shadow-sm">
//         <input
//           type="text"
//           placeholder="Search names.."
//           value={search}
//           onChange={(e) => {
//             setCurrentPage(1); // jab search kare tab first page pr aa jaye
//             setSearch(e.target.value);
//           }}
//           className="w-full outline-none text-sm"
//         />

//         {search && (
//           <button onClick={() => setSearch("")} className="text-gray-500 hover:text-black">
//             <X size={18} />
//           </button>
//         )}
//       </div>

//       <h2 className="text-2xl font-semibold mb-6 text-gray-800">Users Table</h2>

//       <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
//         <table className="w-full border-collapse text-sm">
//           <thead className="bg-gray-100 text-left text-gray-600 font-semibold">
//             <tr>
//               <th onClick={() => handleSort("name")} className="px-4 py-3 border-b cursor-pointer">Name</th>
//               <th className="px-4 py-3 border-b">Email</th>
//               <th onClick={() => handleSort("age")} className="px-4 py-3 border-b cursor-pointer">Age</th>
//               <th onClick={() => handleSort("role")} className="px-4 py-3 border-b cursor-pointer">Role</th>
//             </tr>
//           </thead>

//           <tbody className="text-gray-700">
//             {currentUsers.map((user) => (
//               <tr key={user.id} className="hover:bg-gray-50 transition">
//                 <td className="px-4 py-3 border-b">{user.name}</td>
//                 <td className="px-4 py-3 border-b">{user.email}</td>
//                 <td className="px-4 py-3 border-b">{user.age}</td>
//                 <td className="px-4 py-3 border-b">{user.role}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination Buttons */}
//       <div className="flex justify-between items-center gap-3 mt-4">

//         <button
//           onClick={handlePrev}
//           disabled={currentPage === 1}
//           className="px-4 py-2 border rounded-lg text-sm font-medium  cursor-pointer
//                  hover:bg-gray-100 active:scale-95 transition disabled:opacity-50"
//         >
//           Prev
//         </button>

//         <span className="text-gray-600 text-sm">
//           Page {currentPage} of {totalPages}
//         </span>

//         <button
//           // onClick={handleNext}
//           className="px-4 py-2 border rounded-lg text-sm font-medium cursor-pointer
//                  hover:bg-gray-100 active:scale-95 transition disabled:opacity-50"
//         >
//           Manage Columns
//         </button>

//         <button
//           onClick={handleNext}
//           disabled={currentPage === totalPages}
//           className="px-4 py-2 border rounded-lg text-sm font-medium cursor-pointer
//                  hover:bg-gray-100 active:scale-95 transition disabled:opacity-50"
//         >
//           Next
//         </button>


//       </div>

//     </div>
//   ); 
// }

"use client";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({ column: null, direction: null });

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
    setVisibleColumns(saved ? JSON.parse(saved) : ["name", "email", "age", "role"]);
  }, []);

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
      <div className="mb-6 flex items-center gap-2 w-full max-w-xs border border-gray-300 px-3 py-2 rounded-md shadow-sm">
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
          <button onClick={() => setSearch("")} className="text-gray-500 hover:text-black">
            <X size={18} />
          </button>
        )}
      </div>

      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Users Table</h2>

      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-gray-100 text-left text-gray-600 font-semibold">
            <tr>
              {visibleColumns.includes("name") && (
                <th onClick={() => handleSort("name")} className="px-4 py-3 border-b cursor-pointer">Name</th>
              )}
              {visibleColumns.includes("email") && (
                <th className="px-4 py-3 border-b">Email</th>
              )}
              {visibleColumns.includes("age") && (
                <th onClick={() => handleSort("age")} className="px-4 py-3 border-b cursor-pointer">Age</th>
              )}
              {visibleColumns.includes("role") && (
                <th onClick={() => handleSort("role")} className="px-4 py-3 border-b cursor-pointer">Role</th>
              )}
            </tr>
          </thead>

          <tbody className="text-gray-700">
            {currentUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition">
                {visibleColumns.includes("name") && <td className="px-4 py-3 border-b">{user.name}</td>}
                {visibleColumns.includes("email") && <td className="px-4 py-3 border-b">{user.email}</td>}
                {visibleColumns.includes("age") && <td className="px-4 py-3 border-b">{user.age}</td>}
                {visibleColumns.includes("role") && <td className="px-4 py-3 border-b">{user.role}</td>}
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


