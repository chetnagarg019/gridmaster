"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function ManageColumn() {
  const allColumns = ["name", "email", "age", "role", "department", "location"];

  const [selectedColumns, setSelectedColumns] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("visibleColumns");
    setSelectedColumns(saved ? JSON.parse(saved) : allColumns);
  }, []);

  function handleToggle(column) {
    let updated;
    if (selectedColumns.includes(column)) {
      updated = selectedColumns.filter((col) => col !== column);
    } else {
      updated = [...selectedColumns, column];
    }

    setSelectedColumns(updated);
    localStorage.setItem("visibleColumns", JSON.stringify(updated));
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-6">Manage Columns</h2>

      <div className="space-y-3">
        {allColumns.map((col) => (
          <label key={col} className="flex items-center gap-3 text-gray-700">
            <input
              type="checkbox"
              checked={selectedColumns.includes(col)}
              onChange={() => handleToggle(col)}
            />
            {col.toUpperCase()}
          </label>
        ))}
         <Link href="/home">
        <button className="mt-4 px-4 py-2 border rounded hover:bg-gray-200">
           Back to Table
         </button>
       </Link>
      </div>
    </div>
  );
}


