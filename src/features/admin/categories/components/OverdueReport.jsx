// src/pages/OverdueReport.jsx
"use client";
import React, { useEffect, useState } from "react";

const DEFAULT_FILTERS = {
  startDate: "",
  endDate: "",
  userId: "",
  minFine: "",
  page: 1,
  limit: 10,
};

function OverdueReport() {
  const [items, setItems] = useState([]);
  const [meta, setMeta] = useState({ total: 0, page: 1, limit: 10 });
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async (params = filters) => {
    setLoading(true);
    setError("");

    try {
      const query = new URLSearchParams(params).toString();
      const response = await fetch(
        `/api/reports/borrows/overdue?${query}`,
        { credentials: "include" } // remove if not needed
      );

      if (!response.ok) {
        throw new Error("Failed to load report");
      }

      const data = await response.json();

      setItems(data.items || []);
      setMeta({
        total: data.total,
        page: data.page,
        limit: data.limit,
      });
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Fetch when pagination changes
  useEffect(() => {
    fetchData();
  }, [filters.page, filters.limit]);

  const applyFilters = () => {
    const updated = { ...filters, page: 1 };
    setFilters(updated);
    fetchData(updated);
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    fetchData(DEFAULT_FILTERS);
  };

  const exportFile = (type) => {
    const params = new URLSearchParams(filters).toString();
    window.open(
      `/api/reports/borrows/overdue/export/${type}?${params}`,
      "_blank"
    );
  };

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-4">
        📚 Overdue Borrower Report
      </h1>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
        <input
          type="date"
          value={filters.startDate}
          onChange={(e) =>
            setFilters({ ...filters, startDate: e.target.value })
          }
          className="border p-2 rounded w-full"
        />

        <input
          type="date"
          value={filters.endDate}
          onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
          className="border p-2 rounded w-full"
        />

        <input
          type="text"
          placeholder="User ID"
          value={filters.userId}
          onChange={(e) => setFilters({ ...filters, userId: e.target.value })}
          className="border p-2 rounded w-full"
        />

        <input
          type="number"
          placeholder="Min Fine"
          value={filters.minFine}
          onChange={(e) => setFilters({ ...filters, minFine: e.target.value })}
          className="border p-2 rounded w-full"
        />

        <button
          onClick={applyFilters}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Apply
        </button>

        <button
          onClick={resetFilters}
          className="bg-gray-500 text-white px-4 py-2 rounded w-full"
        >
          Reset
        </button>
      </div>

      {/* Export */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <button
          onClick={() => exportFile("pdf")}
          className="bg-green-600 text-white px-4 py-2 rounded w-full sm:w-auto"
        >
          Export PDF
        </button>
        <button
          onClick={() => exportFile("excel")}
          className="bg-yellow-600 text-white px-4 py-2 rounded w-full sm:w-auto"
        >
          Export Excel
        </button>
        <button
          onClick={() => exportFile("csv")}
          className="bg-purple-600 text-white px-4 py-2 rounded w-full sm:w-auto"
        >
          Export CSV
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-[900px] w-full border-collapse border">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Borrower</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Book</th>
                <th className="border p-2">Author</th>
                <th className="border p-2">Issue Date</th>
                <th className="border p-2">Due Date</th>
                <th className="border p-2">Fine</th>
                <th className="border p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {items.map((b) => (
                <tr key={b.id} className="bg-red-50">
                  <td className="border p-2">{b.borrowerName}</td>
                  <td className="border p-2">{b.borrowerEmail}</td>
                  <td className="border p-2">{b.bookTitle}</td>
                  <td className="border p-2">{b.bookAuthor}</td>
                  <td className="border p-2">
                    {new Date(b.issueDate).toLocaleDateString()}
                  </td>
                  <td className="border p-2">
                    {new Date(b.dueDate).toLocaleDateString()}
                  </td>
                  <td className="border p-2">${b.fineAmount}</td>
                  <td className="border p-2 text-red-600 font-bold">
                    {b.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="mt-4 flex flex-col sm:flex-row items-center gap-3">
        <button
          disabled={filters.page <= 1}
          onClick={() => setFilters({ ...filters, page: filters.page - 1 })}
          className="bg-gray-300 px-4 py-1 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span>
          Page {meta.page} of {Math.ceil(meta.total / meta.limit)}
        </span>

        <button
          disabled={filters.page >= Math.ceil(meta.total / meta.limit)}
          onClick={() => setFilters({ ...filters, page: filters.page + 1 })}
          className="bg-gray-300 px-4 py-1 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default OverdueReport;
