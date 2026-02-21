import { useState } from 'react';
import { 
  Bars3Icon, TruckIcon, MapIcon, UserIcon, 
  WrenchScrewdriverIcon, CreditCardIcon, ChartBarIcon
} from '@heroicons/react/24/outline';

export default function Layout({ children, userRole = 'manager', activePage = 'dashboard' }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: ChartBarIcon, href: '/dashboard' },
    { id: 'vehicles', label: 'Vehicles', icon: TruckIcon, href: '/vehicles' },
    { id: 'trips', label: 'Trips', icon: MapIcon, href: '/trips' },
    { id: 'drivers', label: 'Drivers', icon: UserIcon, href: '/drivers' },
    { id: 'maintenance', label: 'Maintenance', icon: WrenchScrewdriverIcon, href: '/maintenance' },
    ...(userRole === 'manager' ? [{ id: 'costs', label: 'Costs', icon: CreditCardIcon, href: '/costs' }] : [])
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* SIMPLIFIED VERSION - Mobile nav hidden for now */}
      <div className="lg:pl-64">
        {/* Top Navbar */}
        <header className="bg-white/90 backdrop-blur-xl border-b border-white/50 shadow-sm sticky top-0 z-30">
          <div className="px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900">
              {activePage.charAt(0).toUpperCase() + activePage.slice(1)}
            </h1>
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm animate-pulse">
                ON
              </div>
              <span className="text-sm font-medium text-gray-700">James Osei (Manager)</span>
            </div>
          </div>
        </header>

        <main className="p-8 max-w-7xl mx-auto">
          {children}
        </main>
      </div>

      {/* Sidebar - DESKTOP ONLY */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white/90 backdrop-blur-xl border-r border-white/50 shadow-2xl hidden lg:block">
        <div className="p-6 border-b border-white/50">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-xl font-bold text-white">FM</span>
            </div>
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                FleetMatrix
              </h2>
              <p className="text-xs text-gray-500">Manager</p>
            </div>
          </div>
        </div>
        
        <nav className="p-4 space-y-2 mt-6">
          {menuItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 group ${
                activePage === item.id
                  ? 'bg-indigo-500/20 text-indigo-700 border-2 border-indigo-200 shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
