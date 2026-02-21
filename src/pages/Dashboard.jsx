export default function Dashboard() {
  return (
    <div>
      <div className="text-4xl font-bold text-gray-900 mb-8 flex items-center">
        🚛 Command Center
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-2xl">
          <div className="text-3xl font-bold text-gray-900 mb-2">48</div>
          <div className="text-gray-600 mb-4">Active Vehicles</div>
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">↑ 3 vs last month</span>
        </div>
        {/* Add 3 more KPI cards similarly */}
      </div>
    </div>
  );
}
