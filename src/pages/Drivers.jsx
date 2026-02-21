export default function Drivers() {
  return (
    <div>
      <div className="text-3xl font-bold text-gray-900 mb-8">Driver Profiles</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-2xl">
          <div className="w-16 h-16 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold mb-4">JO</div>
          <h3 className="font-bold text-xl mb-2">James Osei</h3>
          <p className="text-gray-600 mb-4">License expires 2027</p>
          <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm">On Duty</span>
        </div>
      </div>
    </div>
  );
}
