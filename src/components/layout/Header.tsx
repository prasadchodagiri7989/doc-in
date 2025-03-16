
import React from 'react';
import { Link } from 'react-router-dom';
import { User, Settings, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { currentUser } from '@/lib/mockData';

const Header = () => {
  return (
    <header className="w-full px-4 py-3 bg-white/80 backdrop-blur-md border-b border-gray-200 fixed top-0 left-0 right-0 z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2"
          aria-label="DOC.IN Home"
        >
          <span className="font-semibold text-xl text-primary">DOC.IN</span>
        </Link>
        
        <div className="relative mx-auto w-full max-w-md hidden md:block">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search questions..."
            className="w-full bg-gray-100 border-0 rounded-full pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:bg-white focus:outline-none transition-all duration-200"
          />
        </div>
        
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon"
            className="relative text-gray-700 hover:text-primary hover:bg-primary/10"
            aria-label="Search"
          >
            <Search className="h-5 w-5 md:hidden" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            className="relative text-gray-700 hover:text-primary hover:bg-primary/10"
            aria-label="Settings"
          >
            <Settings className="h-5 w-5" />
          </Button>
          
          <Link to="/profile" className="flex items-center">
            <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-transparent hover:border-primary transition-all duration-200">
              <img 
                src={currentUser.avatar} 
                alt={currentUser.name} 
                className="w-full h-full object-cover"
              />
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
