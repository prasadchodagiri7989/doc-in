import React, { useState, useEffect } from 'react';
import { Search, Filter, ArrowLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import QuestionCard from '@/components/ui/QuestionCard';
import Header from '@/components/layout/Header';
import BottomNavigation from '@/components/layout/BottomNavigation';
import { mockTags } from '@/lib/mockData';
import { Link } from 'react-router-dom';
import { getQuestions } from '@/components/questions';
import {User} from '../types'
import { useAuth, useUser } from '@clerk/clerk-react';
import { getUserDetails } from '@/components/questions';

const Questions = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('latest');
  const [questions, setQuestions] = useState([]);
  const {isSignedIn} = useAuth();
    const {user} = useUser()

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
  
  // Get top tags (limited to 8)
  const topTags = mockTags.slice(0, 8);
  
  // Load questions from localStorage on component mount
  useEffect(() => {
    const loadQuestions = async () => {
      const storedQuestions = await getQuestions();
      setQuestions(storedQuestions);
    };
    loadQuestions();
  }, []);
  
  // Filter questions based on search query
  const filteredQuestions = questions.filter(question => 
    question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    question.content.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Sort questions based on active tab
  const sortedQuestions = [...filteredQuestions].sort((a, b) => {
    if (activeTab === 'latest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else {
      return b.votes - a.votes;
    }
  });
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header />
      
      <main className="pt-16 container max-w-4xl mx-auto px-4">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="ghost" size="icon" asChild className="md:hidden">
            <Link to="/">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Browse Questions</h1>
        </div>
        
        {/* Search bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            placeholder="Search medical questions..."
            className="pl-10 py-6 text-base border-gray-300 shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {/* Tags */}
        <div className="mb-6 overflow-x-auto pb-2">
          <div className="flex gap-2 flex-nowrap">
            {topTags.map(tag => (
              <Badge 
                key={tag.id}
                variant="secondary" 
                className="bg-gray-100 text-gray-800 hover:bg-gray-200 whitespace-nowrap"
              >
                {tag.name}
              </Badge>
            ))}
          </div>
        </div>
        
        {/* Question list */}
        <Tabs defaultValue="latest" onValueChange={setActiveTab} className="w-full">
          <div className="flex items-center justify-between mb-6">
            <TabsList className="grid grid-cols-2 w-[200px]">
              <TabsTrigger value="latest">Latest</TabsTrigger>
              <TabsTrigger value="popular">Popular</TabsTrigger>
            </TabsList>
            
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </Button>
          </div>
          
          <TabsContent value="latest" className="grid grid-cols-1 gap-5 animate-slideUp">
            {sortedQuestions.length > 0 ? (
              sortedQuestions.map(question => (
                <QuestionCard key={question._id} question={question} role={userDetails?.role} />
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500">No questions found. Be the first to ask a question!</p>
                <Button className="mt-4" asChild>
                  <Link to="/ask-question">Ask a Question</Link>
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="popular" className="grid grid-cols-1 gap-5 animate-slideUp">
            {sortedQuestions.length > 0 ? (
              sortedQuestions.map(question => (
                <QuestionCard key={question._id} question={question} role ={userDetails?.role} />
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500">No questions found. Be the first to ask a question!</p>
                <Button className="mt-4" asChild>
                  <Link to="/ask-question">Ask a Question</Link>
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default Questions;