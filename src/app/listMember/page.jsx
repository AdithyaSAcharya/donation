"use client";
import React, { useEffect, useState } from "react";

const ListMembersPage = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch("/api/members", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch members.");
        }

        const data = await response.json();
        setMembers(data?.data || []); // Assuming the API response contains a `data` array
      } catch (error) {
        setError(error.message || "An error occurred while fetching members.");
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  return (
    <div className="p-2 ">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-8 mx-auto">
        <h1 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
          List of Members
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin"></div>
            <p className="ml-4 text-gray-600">Loading members...</p>
          </div>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : members.length === 0 ? (
          <p className="text-center text-gray-600">No members found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200 rounded-lg shadow-md">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium">#</th>
                  <th className="px-6 py-4 text-left text-sm font-medium">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-medium">Phone Number</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member, index) => (
                  <tr
                    key={member.$id}
                    className={`hover:bg-gray-100 ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <td className="px-6 py-4 text-sm text-gray-700 border-t border-gray-200">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 border-t border-gray-200">
                      {member.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 border-t border-gray-200">
                      {member.phoneNumber}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListMembersPage;
