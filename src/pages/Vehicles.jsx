import Layout from '../components/Layout';

export default function Vehicles() {
  return (
    <Layout activePage="vehicles" userRole="manager">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="text-sm font-semibold text-indigo-600 uppercase tracking-wide mb-2">Asset Management</div>
            <h1 className="text-3xl font-bold text-gray-900">Vehicle Registry</h1>
          </div>
          <button className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-8 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl hover:from-indigo-700 hover:to-blue-700 transform hover:-translate-y-1 transition-all duration-300">
            + Add New Vehicle
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-2xl hover:shadow-3xl transition-all duration-300">
            <div className="text-3xl mb-3">48</div>
            <div className="text-sm text-gray-600 mb-1">Total Vehicles</div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-green-100 text-green-800 font-medium">↑ 2 this month</span>
          </div>
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-2xl hover:shadow-3xl transition-all duration-300">
            <div className="text-3xl mb-3 text-indigo-600">32</div>
            <div className="text-sm text-gray-600 mb-1">Available</div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-indigo-100 text-indigo-800 font-medium">Ready to dispatch</span>
          </div>
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-2xl hover:shadow-3xl transition-all duration-300">
            <div className="text-3xl mb-3 text-orange-600">7</div>
            <div className="text-sm text-gray-600 mb-1">In Maintenance</div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-orange-100 text-orange-800 font-medium">2 overdue</span>
          </div>
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-2xl hover:shadow-3xl transition-all duration-300">
            <div className="text-3xl mb-3 text-gray-600">9</div>
            <div className="text-sm text-gray-600 mb-1">On Active Trips</div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-800 font-medium">Real-time</span>
          </div>
        </div>

        {/* Vehicles Table */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/50 shadow-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/50">
                <tr>
                  <th className="px-8 py-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Vehicle</th>
                  <th className="px-8 py-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">License</th>
                  <th className="px-8 py-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Type</th>
                  <th className="px-8 py-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Max Load</th>
                  <th className="px-8 py-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Status</th>
                  <th className="px-8 py-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { name: 'Freightliner Cascadia', plate: 'GJ-2341-A', type: 'Heavy Truck', load: 25000, status: 'Available', odometer: '148k km' },
                  { name: 'Mercedes Actros 2545', plate: 'GJ-8872-B', type: 'Semi-Trailer', load: 20000, status: 'On Trip', odometer: '93k km' },
                  { name: 'Volvo FH16', plate: 'GJ-5510-C', type: 'Heavy Truck', load: 18000, status: 'In Shop', odometer: '210k km' }
                ].map((vehicle, idx) => (
                  <tr key={idx} className="hover:bg-white/50 transition-all duration-200">
                    <td className="px-8 py-8">
                      <div className="font-semibold text-gray-900">{vehicle.name}</div>
                      <div className="text-sm text-gray-500">{vehicle.odometer}</div>
                    </td>
                    <td className="px-8 py-8 font-mono text-sm font-semibold text-gray-900">{vehicle.plate}</td>
                    <td className="px-8 py-8">
                      <span className="px-3 py-1 bg-gray-100 text-xs font-semibold text-gray-800 rounded-full">{vehicle.type}</span>
                    </td>
                    <td className="px-8 py-8 text-sm font-mono text-gray-900">{vehicle.load.toLocaleString()} kg</td>
                    <td className="px-8 py-8">
                      <span className={`px-4 py-2 rounded-full text-xs font-semibold ${
                        vehicle.status === 'Available' ? 'bg-green-100 text-green-800' :
                        vehicle.status === 'On Trip' ? 'bg-blue-100 text-blue-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {vehicle.status}
                      </span>
                    </td>
                    <td className="px-8 py-8">
                      <div className="flex space-x-2">
                        <button className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">Edit</button>
                        <button className="text-gray-500 hover:text-gray-900 text-sm font-medium">View</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
