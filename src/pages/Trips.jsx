export default function Trips() {
  return (
    <div>
      <div className="text-3xl font-bold text-gray-900 mb-8">Trip Dispatcher</div>
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-2xl mb-8">
        <h3 className="text-xl font-semibold mb-4">New Trip</h3>
        <p>Form goes here...</p>
      </div>
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/50 shadow-2xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-white/50">
            <tr><th className="p-6 text-left text-sm font-bold text-gray-600">Trip ID</th><th>Status</th></tr>
          </thead>
          <tbody>
            <tr className="hover:bg-white/50"><td className="p-6">TRP-001</td><td>Dispatched</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
