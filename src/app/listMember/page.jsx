"use client";
import React from "react";

const members = [
  { id: 1, name: "John Doe", phone: "9876543210" },
  { id: 2, name: "Jane Smith", phone: "9123456789" },
  { id: 3, name: "Michael Johnson", phone: "9345678901" },
  { id: 4, name: "Emily Davis", phone: "9678901234" },
  { id: 5, name: "Daniel Brown", phone: "9898765432" },
  { id: 6, name: "Samantha Green", phone: "9051234567" },
  { id: 7, name: "Olivia White", phone: "9234567890" },
  { id: 8, name: "James Taylor", phone: "9445678901" },
  ];

const ListMembersPage = () => {
  return (
    <div className="bg-slate-100 p-8">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 mx-auto">
        <h1 className="text-2xl font-semibold text-slate-900 mb-6 text-center">
          List of Members
        </h1>
        {/* Calculate the remaining height for the table */}
        <div
          className="overflow-x-auto"
          style={{ minHeight: "calc(100vh - 15rem)" }} // 4rem is the margin-bottom (mb-16)
        >
          <table className="min-w-full table-auto">
            <thead className="sticky top-0 bg-slate-200">
              <tr>
                <th className="px-4 py-2 text-sm font-medium text-slate-700">#</th>
                <th className="px-4 py-2 text-sm font-medium text-slate-700">Name</th>
                <th className="px-4 py-2 text-sm font-medium text-slate-700">Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.id} className="border-b hover:bg-slate-50">
                  <td className="px-4 py-2 text-sm text-slate-600">{member.id}</td>
                  <td className="px-4 py-2 text-sm text-slate-600">{member.name}</td>
                  <td className="px-4 py-2 text-sm text-slate-600">{member.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListMembersPage;
