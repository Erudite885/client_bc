import React from 'react'

const FreelancerDashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Card 1 */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
        <p className="mt-4 text-3xl font-bold text-indigo-600">350</p>
      </div>
      {/* Card 2 */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-700">New Bookings</h3>
        <p className="mt-4 text-3xl font-bold text-indigo-600">120</p>
      </div>
      {/* Card 3 */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-700">Revenue</h3>
        <p className="mt-4 text-3xl font-bold text-indigo-600">$45,000</p>
      </div>
    </div>
  );
}

export default FreelancerDashboard