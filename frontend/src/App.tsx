import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <nav className={`fixed top-0 w-full ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md z-50`}>
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <BookOpen className={`h-8 w-8 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            <span className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Learning Hub
            </span>
          </div>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-lg ${
              isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'
            }`}
          >
            {isDarkMode ? '🌞' : '🌙'}
          </button>
        </div>
      </nav>

      <main className="container mx-auto px-6 pt-20">
        {!isAuthenticated ? (
          <Auth onLogin={() => setIsAuthenticated(true)} />
        ) : (
          <Dashboard isDarkMode={isDarkMode} />
        )}
      </main>

      <footer className={`mt-20 py-8 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-600'}`}>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">About Learning Hub</h3>
              <p>Your comprehensive platform for online education, offering courses across various fields including IIT, NEET, and government exam preparation.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>Courses</li>
                <li>Study Materials</li>
                <li>Doubt Sessions</li>
                <li>Library</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Contact</h3>
              <ul className="space-y-2">
                <li>Email: support@learninghub.com</li>
                <li>Phone: +1 234 567 890</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-blue-500">Twitter</a>
                <a href="#" className="hover:text-blue-500">Facebook</a>
                <a href="#" className="hover:text-blue-500">LinkedIn</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;