import React, {lazy, Suspense, useState} from 'react';
import { Menu, Search } from 'lucide-react';

const RemoteButton = lazy(() => import('vite-remote/Button'));
function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'Abrading & Polishing',
    'Building & Grounds',
    'Electrical & Lighting',
    'Fabricating',
    'Fastening & Joining',
    'Filtering',
    'Flow & Level Control',
    'Furniture & Storage',
    'Hand Tools',
    'Hardware',
    'Heating & Cooling',
    'Lubricating',
    'Material Handling',
    'Measuring & Inspecting',
    'Office Supplies & Signs',
    'Pipe, Tubing, Hose & Fittings',
    'Plumbing & Janitorial',
    'Power Transmission',
    'Pressure & Temperature Control',
    'Pulling & Lifting',
    'Raw Materials',
    'Safety Supplies',
    'Sawing & Cutting',
    'Sealing',
    'Shipping',
    'Suspending'
  ];

  const fasteners = [
    { name: 'Screws & Bolts', image: 'https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?auto=format&fit=crop&w=100&q=80' },
    { name: 'Nuts', image: 'https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?auto=format&fit=crop&w=100&q=80' },
    { name: 'Washers', image: 'https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?auto=format&fit=crop&w=100&q=80' },
    { name: 'Pins', image: 'https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?auto=format&fit=crop&w=100&q=80' },
    { name: 'Rivets', image: 'https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?auto=format&fit=crop&w=100&q=80' },
    { name: 'Anchors', image: 'https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?auto=format&fit=crop&w=100&q=80' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <div className="bg-[#f8f8f8] border-b border-gray-300">
        <div className="container mx-auto px-4 h-8 flex items-center justify-between">
          <button className="flex items-center text-[#336633] hover:text-[#1a4d1a] text-sm font-semibold">
            <Menu className="h-4 w-4 mr-1" />
            BROWSE CATALOG
          </button>
          <div className="flex items-center space-x-4 text-sm">
            <span>(404) 346-7000</span>
            <a href="#" className="text-[#336633] hover:text-[#1a4d1a]">Email Us</a>
            <a href="#" className="text-[#336633] hover:text-[#1a4d1a]">Log in</a>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="border-b border-gray-300">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="text-[#336633] font-bold text-2xl">McMaster-Carr</div>
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search"
                className="w-full px-3 py-1.5 pr-8 border border-gray-300 focus:outline-none focus:border-[#336633]"
              />
              <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-[#336633] font-semibold hover:text-[#1a4d1a]">ORDER
            </a>
            <a href="#" className="text-[#336633] font-semibold hover:text-[#1a4d1a]">ORDER HISTORY</a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-4">
        <div className="flex">
          {/* Categories Sidebar */}
          <div className="w-64 flex-shrink-0 pr-6">
            <h2 className="font-semibold mb-2">Choose a Category</h2>
            <div className="border-t border-gray-300">
              {categories.map((category) => (
                <a
                  key={category}
                  href="#"
                  className="block py-1.5 text-sm hover:text-[#336633] border-b border-gray-300"
                >
                  {category}
                </a>
              ))}
            </div>
          </div>

          {/* Main Category Content */}
          <div className="flex-1">
            <div className="mb-8">
              <h2 className="text-xl text-[#336633] font-semibold mb-4">Fastening & Joining</h2>
              <div className="grid grid-cols-6 gap-4">
                {fasteners.map((item) => (
                  <a
                    key={item.name}
                    href="#"
                    className="flex flex-col items-center text-center group"
                  >
                    <div className="w-20 h-20 mb-2 bg-white border border-gray-200 p-2 group-hover:border-[#336633]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="text-sm group-hover:text-[#336633]">{item.name}</span>
                  </a>
                ))}
              </div>
            </div>
            <Suspense fallback="Loading Button">
              <RemoteButton />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
