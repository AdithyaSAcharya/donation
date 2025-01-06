"use client";
import React, { useState, useEffect } from "react";
import Loader from "../component/Loader";

const Page = () => {
  const [donationsData, setDonationsData] = useState({});
  const [expandedDate, setExpandedDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDonations = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/donations");
        const data = await response.json();

        if (data.success) {
          setDonationsData(data.data);
        } else {
          setError(data.message || "Failed to fetch donations");
        }
      } catch (err) {
        setError(err.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  const toggleDate = (date) => {
    setExpandedDate((prev) => (prev === date ? null : date));
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold text-slate-900 mb-6 text-center">
        Daily Donation Listing
      </h1>

      {loading && <div className="text-center text-slate-700 flex justify-center items-center"><Loader /></div>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && !error && Object.keys(donationsData).length === 0 && (
        <p className="text-center text-slate-700">No donations available.</p>
      )}

      {Object.entries(donationsData).map(([date, { donations }]) => (
        <div
          key={date}
          className="bg-white shadow-md rounded-lg p-4 mb-6 border border-slate-200"
        >
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleDate(date)}
          >
            <h2 className="text-lg font-medium text-slate-800">
              Date: {date}
            </h2>
            <span
              className={`text-slate-600 ${
                expandedDate === date ? "text-xl" : "text-lg"
              } sm:text-2xl`}
            >
              {expandedDate === date ? "-" : "+"}
            </span>
          </div>

          {expandedDate === date && (
            <div className="mt-4">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="border-b-2 border-slate-300 pb-2">Member</th>
                    <th className="border-b-2 border-slate-300 pb-2">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {donations.map((donation, index) => (
                    <tr key={index} className="hover:bg-slate-50">
                      <td className="py-2 border-b border-slate-200">
                        {donation.name}
                      </td>
                      <td className="py-2 border-b border-slate-200">
                        ₹{donation.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-4 text-right text-slate-900 font-semibold">
                Total: ₹
                {donations.reduce((total, donation) => total + donation.amount, 0)}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Page;
