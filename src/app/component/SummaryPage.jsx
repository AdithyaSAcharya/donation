"use client";
import { useEffect, useState } from "react";
import Loader from "./Loader";  // Importing your Loader component

export default function Home() {
  const [topContributors, setTopContributors] = useState([]);
  const [donationStats, setDonationStats] = useState([]);
  const [totalDonations, setTotalDonations] = useState(0);

  // Separate loading states for each section
  const [loadingContributors, setLoadingContributors] = useState(true);
  const [loadingDonations, setLoadingDonations] = useState(true);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    async function fetchData() {
      // Fetch top contributors
      const contributorsResponse = await fetch("/api/members"); // Adjust API endpoint
      const contributorsData = await contributorsResponse.json();
      const sortedContributors = contributorsData.data.sort(
        (a, b) => b.total_contributions - a.total_contributions
      );
      setTopContributors(sortedContributors.slice(0, 2)); // Top 2 contributors
      setLoadingContributors(false); // Set loading to false once contributors are fetched

      // Fetch donation statistics
      const donationResponse = await fetch("/api/donations"); // Adjust API endpoint
      const donationData = await donationResponse.json();
      setDonationStats(donationData.data);
      setLoadingDonations(false); // Set loading to false once donation data is fetched

      // Calculate total donations
      const total = Object.values(donationData.data).reduce(
        (acc, donationDay) => acc + donationDay.donations.reduce((sum, donation) => sum + donation.amount, 0),
        0
      );
      setTotalDonations(total);
      setLoadingStats(false); // Set loading to false once stats are calculated
    }

    fetchData();
  }, []);

  // Function to get last two days' donation statistics
  const getLastTwoDonationStats = () => {
    const dates = Object.keys(donationStats);
    const lastTwoDates = dates.slice(-2); // Get the last two dates
    const lastTwoStats = lastTwoDates.map(date => {
      const totalAmount = donationStats[date].donations.reduce(
        (sum, donation) => sum + donation.amount,
        0
      );
      return { date, totalAmount };
    });

    return lastTwoStats;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-7xl mx-auto text-center">
        {/* Added Om Raghavendraya Namaha */}
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Om Raghavendraya Namaha
        </h1>

        {/* Total Donations Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-700">Total Donations</h2>
          {loadingStats ? (
            <div className="flex justify-center items-center min-h-[100px]">
              <Loader />  
            </div>
          ) : (
            <p className="text-xl text-green-600 mt-2">₹{totalDonations}</p>
          )}
        </div>

        {/* Top Contributors Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Top 2 Contributors</h2>
            {loadingContributors ? (
              <div className="flex justify-center items-center min-h-[100px]">
                <Loader />  
              </div>
            ) : (
              <ul className="space-y-4">
                {topContributors.length > 0 ? (
                  topContributors.map((contributor, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <div className="font-medium text-gray-800">
                        {index + 1}. {contributor.name}
                      </div>
                      <div className="text-gray-600">₹{contributor.total_contributions}</div>
                    </li>
                  ))
                ) : (
                  <li>No contributors available</li>
                )}
              </ul>
            )}
          </div>

          {/* Last Two Days' Donation Statistics Section */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Last 2 Days' Donation Statistics</h2>
            {loadingDonations ? (
              <div className="flex justify-center items-center min-h-[100px]">
                <Loader /> 
              </div>
            ) : (
              <ul className="space-y-4">
                {getLastTwoDonationStats().map((stat, index) => (
                  <li key={index} className="flex justify-between text-gray-600">
                    <div>{stat.date}</div>
                    <div>₹{stat.totalAmount}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
