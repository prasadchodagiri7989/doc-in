
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { BadgeCheck, Bookmark, Edit, MessageSquare, PenTool, Settings, User as UserIcon } from 'lucide-react';
import Header from '@/components/layout/Header';
import BottomNavigation from '@/components/layout/BottomNavigation';
import { currentUser } from '@/lib/mockData';
import { useUser } from '@clerk/clerk-react';
import { useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const { id } = useParams<{ id: string }>();
  const {isSignedIn} = useAuth();
  const navigate = useNavigate();
  const {user} = useUser();
  if(!isSignedIn || id!==user.username) navigate('/sign-in');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container max-w-4xl mx-auto px-4 pt-20 pb-24">
        {/* Profile header */}
        <div className="bg-white rounded-xl shadow-sm mb-6 overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>
          <div className="px-6 pb-6 relative">
            <div className="flex flex-col sm:flex-row items-start sm:items-end space-y-4 sm:space-y-0 sm:space-x-4 -mt-12">
              <Avatar className="w-24 h-24 border-4 border-white relative">
                <AvatarImage src={user.imageUrl} alt={currentUser.name} />
                <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 pt-10 sm:pt-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className='mt-12'>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                      {user.fullName.toUpperCase()}
                    </h1>
                    <p className="text-gray-600">
                      {currentUser.role === 'student' 
                        ? `Medical Student at ${currentUser.institution}` 
                        : `${currentUser.specialization} Specialist`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-blue-500" />
              <h3 className="font-medium text-gray-700">Questions</h3>
            </div>
            <p className="text-2xl font-bold mt-2">0</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center space-x-2">
              <PenTool className="h-5 w-5 text-green-500" />
              <h3 className="font-medium text-gray-700">Answers</h3>
            </div>
            <p className="text-2xl font-bold mt-2">0</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center space-x-2">
              <BadgeCheck className="h-5 w-5 text-purple-500" />
              <h3 className="font-medium text-gray-700">Best Answers</h3>
            </div>
            <p className="text-2xl font-bold mt-2">0</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center space-x-2">
              <UserIcon className="h-5 w-5 text-orange-500" />
              <h3 className="font-medium text-gray-700">Reputation</h3>
            </div>
            <p className="text-2xl font-bold mt-2">125</p>
          </div>
        </div>
        
        {/* Coming Soon Placeholder */}
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <div className="max-w-md mx-auto">
            <UserIcon className="h-16 w-16 text-primary/20 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Profile Features Coming Soon</h2>
            <p className="text-gray-600 mb-6">
              We're working on enhancing the profile experience with more features and personalization options.
              Check back soon!
            </p>
            <Button asChild variant="outline">
              <a href="/">Return to Home</a>
            </Button>
          </div>
        </div>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default Profile;
