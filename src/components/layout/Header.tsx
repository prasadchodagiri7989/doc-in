
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {  Settings, Search } from 'lucide-react';
import { useAuth, useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {User} from '../../types'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ClerkLoading, ClerkLoaded, UserButton } from "@clerk/clerk-react";
import UserProfileSkeleton from "@/components/ui/UserProfile/UserProfileSkeleton";
import { getUserDetails } from '../questions';

const Header = () => {
  const {isSignedIn} = useAuth();
  const {user} = useUser();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState<User | null>(null);

  useEffect(() => {
    if(isSignedIn && user){
      const fetchUserDetails = async () => {
        const userDetails = await getUserDetails(user.id);
        setUserDetails(userDetails.user);
      };
      fetchUserDetails();
    }
  },[isSignedIn, user]);
  return (
    <header className="w-full px-4 py-3 bg-white/80 backdrop-blur-md border-b border-gray-200 fixed top-0 left-0 right-0 z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2"
          aria-label="DOC.IN Home"
        >
          <span className="font-semibold text-xl text-primary">DOC.IN</span>
          {
            userDetails && (
              userDetails.role === 'student' ? (
                <span className="font-semibold text-md text-blue-500">Student</span>
              ) : userDetails.role === 'professional' ? (
                <span className="font-semibold text-md text-blue-500">Professional</span>
              ) : null
            )
          }
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
          
          {
            isSignedIn && (
              <Button 
            variant="ghost" 
            size="icon"
            className="relative text-gray-700 hover:text-primary hover:bg-primary/10"
            aria-label="Settings"
            onClick={() => navigate(`/profile/${user.username}`)}
          >
            <Settings className="h-5 w-5" />
          </Button>
            )
          }
          
          {/* <Link to="/profile" className="flex items-center">
            <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-transparent hover:border-primary transition-all duration-200">
              <img 
                src={currentUser.avatar} 
                alt={currentUser.name} 
                className="w-full h-full object-cover"
              />
            </div>
          </Link> */}
          <div className="flex items-center gap-6 py-6 md:p-6">
          {isSignedIn ? (
            <div>
              <ClerkLoading>
                <UserProfileSkeleton />
              </ClerkLoading>
              <ClerkLoaded>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <UserButton
                      appearance={{
                        elements: {
                          userButtonAvatarBox: "h-10 w-10",
                        },
                      }}
                    />
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Do you really want to sign out?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => ({ redirectUrl: "/sign-in" })}
                      >
                        Sign Out
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </ClerkLoaded>
            </div>
          ) : (
            <div className="flex gap-6">
              <Button
                // variant={"neon"}
                onClick={() => navigate("/sign-in")}
                className=" hidden sm:block shadow-md  text-white "
              >
              SignIn
              </Button>
              <Button
                // variant={"neon"}
                className="shadow-md text-white"
                onClick={() => navigate("/sign-up")}
              >
              SignUp
              </Button>
            </div>
          )}
      </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
