// "use client";
// import { useState } from "react";
// import Link from "next/link";

// const allColumns = ["name", "email", "age", "role", "department", "location"];

// export default function ManageColumnsPage() {
//   const [selectedCols, setSelectedCols] = useState(() => {
//     const saved = localStorage.getItem("visibleColumns");
//     return saved ? JSON.parse(saved) : allColumns;
//   });

//   function toggleColumn(col) {
//     let updated;
//     if (selectedCols.includes(col)) {
//       updated = selectedCols.filter((c) => c !== col);
//     } else {
//       updated = [...selectedCols, col];
//     }
//     setSelectedCols(updated);
//     localStorage.setItem("visibleColumns", JSON.stringify(updated));
//   }

//   return (
//     <div style={{ margin: "30px" }}>
//       <h2>Manage Table Columns</h2>

//       {allColumns.map((col) => (
//         <div key={col}>
//           <label>
//             <input
//               type="checkbox"
//               checked={selectedCols.includes(col)}
//               onChange={() => toggleColumn(col)}
//             />
//             {col}
//           </label>
//         </div>
//       ))}

//       <Link href="/home">
//         <button style={{ marginTop: "20px" }}>Back</button>
//       </Link>
//     </div>
//   );
// }

"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const allColumns = ["name", "email", "age", "role"];

export default function ManageColumnsPage() {
  const [visibleColumns, setVisibleColumns] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("visibleColumns");
    setVisibleColumns(saved ? JSON.parse(saved) : allColumns);
  }, []);

  function toggleColumn(col) {
    let updated;
    if (visibleColumns.includes(col)) {
      updated = visibleColumns.filter((c) => c !== col);
    } else {
      updated = [...visibleColumns, col];
    }
    setVisibleColumns(updated);
    localStorage.setItem("visibleColumns", JSON.stringify(updated));
  }

  return (
    <div className="p-8">
      <h2 className="text-xl font-semibold mb-4">Manage Table Columns</h2>

      {allColumns.map((col) => (
        <div key={col} className="mb-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={visibleColumns.includes(col)}
              onChange={() => toggleColumn(col)}
            />
            {col.toUpperCase()}
          </label>
        </div>
      ))}

      <Link href="/home">
        <button className="mt-4 px-4 py-2 border rounded hover:bg-gray-200">
          Back to Table
        </button>
      </Link>
    </div>
  );
}

