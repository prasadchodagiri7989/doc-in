
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, MessageSquare, PlusCircle, Brain } from 'lucide-react';

const BottomNavigation = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-t border-gray-200 bottom-nav-shadow">
      <div className="flex items-center justify-around px-6 py-2">
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            `flex flex-col items-center space-y-1 py-2 px-4 rounded-lg ${
              isActive 
                ? 'text-primary' 
                : 'text-gray-600 hover:text-primary hover:bg-primary/5'
            } transition-all duration-200`
          }
          end
        >
          <Home className="h-5 w-5" />
          <span className="text-xs font-medium">Home</span>
        </NavLink>
        
        <NavLink 
          to="/questions" 
          className={({ isActive }) => 
            `flex flex-col items-center space-y-1 py-2 px-4 rounded-lg ${
              isActive 
                ? 'text-primary' 
                : 'text-gray-600 hover:text-primary hover:bg-primary/5'
            } transition-all duration-200`
          }
        >
          <MessageSquare className="h-5 w-5" />
          <span className="text-xs font-medium">Questions</span>
        </NavLink>
        
        <NavLink 
          to="/ask-question" 
          className={({ isActive }) => 
            `flex flex-col items-center space-y-1 py-2 px-4 rounded-lg ${
              isActive 
                ? 'text-primary' 
                : 'text-gray-600 hover:text-primary hover:bg-primary/5'
            } transition-all duration-200`
          }
        >
          <PlusCircle className="h-5 w-5" />
          <span className="text-xs font-medium">Ask</span>
        </NavLink>
        
        <NavLink 
          to="/ai-solver" 
          className={({ isActive }) => 
            `flex flex-col items-center space-y-1 py-2 px-4 rounded-lg ${
              isActive 
                ? 'text-primary' 
                : 'text-gray-600 hover:text-primary hover:bg-primary/5'
            } transition-all duration-200`
          }
        >
          <Brain className="h-5 w-5" />
          <span className="text-xs font-medium">AI Solver</span>
        </NavLink>
      </div>
    </div>
  );
};

export default BottomNavigation;
