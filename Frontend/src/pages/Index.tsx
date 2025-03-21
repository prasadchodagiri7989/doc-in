
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, MessageSquare, Award, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import QuestionCard from '@/components/ui/QuestionCard';
import Header from '@/components/layout/Header';
import BottomNavigation from '@/components/layout/BottomNavigation';
import { mockQuestions, mockTags } from '@/lib/mockData';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('latest');
  
  // Get top tags (limited to 5)
  const topTags = mockTags.slice(0, 5);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-16 pb-20">
        {/* Hero section */}
        <section className="bg-gradient-to-b from-white to-gray-50 border-b border-gray-200">
          <div className="container max-w-6xl mx-auto px-4 py-10 md:py-16">
            <div className="max-w-3xl mx-auto text-center animate-fadeIn">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                Medical knowledge exchange for students and doctors
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Post your medical questions, get expert answers, and collaborate with peers in a supportive community.
              </p>
              
              {/* Search bar for desktop */}
              <div className="relative max-w-2xl mx-auto mb-8 hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search medical questions..."
                  className="pl-10 py-6 text-base border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button className="absolute right-1 top-1/2 transform -translate-y-1/2">
                  Search
                </Button>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link to="/ask-question">
                    Ask a Question <MessageSquare className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                  <Link to="/questions">
                    Browse Questions <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Main content */}
        <section className="container max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Featured Questions</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/questions" className="text-primary flex items-center">
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-sm font-medium text-gray-700">Popular tags:</span>
            {topTags.map(tag => (
              <Badge 
                key={tag.id}
                variant="secondary" 
                className="bg-gray-100 text-gray-800 hover:bg-gray-200"
              >
                {tag.name}
              </Badge>
            ))}
          </div>
          
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
            
            <TabsContent value="latest" className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-slideUp">
              {mockQuestions.map(question => (
                <QuestionCard key={question.id} question={question} />
              ))}
            </TabsContent>
            
            <TabsContent value="popular" className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-slideUp">
              {[...mockQuestions].sort((a, b) => b.votes - a.votes).map(question => (
                <QuestionCard key={question.id} question={question} />
              ))}
            </TabsContent>
          </Tabs>
          
          <div className="mt-10">
            <div className="flex items-center">
              <Award className="h-5 w-5 text-primary mr-2" />
              <h2 className="text-xl font-bold text-gray-900">Expert Doctors</h2>
            </div>
            
            <Separator className="my-4" />
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Doctor profiles would go here */}
              <div className="bg-white rounded-xl shadow-sm p-4 text-center hover:shadow-md transition-shadow">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden border-2 border-primary/20">
                  <img 
                    src="https://randomuser.me/api/portraits/women/44.jpg" 
                    alt="Dr. Sarah Johnson"
                    className="w-full h-full object-cover" 
                  />
                </div>
                <h4 className="font-semibold">Dr. Sarah Johnson</h4>
                <p className="text-xs text-gray-500">Cardiology</p>
                <p className="text-xs text-primary mt-1">243 answers</p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-4 text-center hover:shadow-md transition-shadow">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden border-2 border-primary/20">
                  <img 
                    src="https://randomuser.me/api/portraits/men/32.jpg" 
                    alt="Dr. Michael Chen"
                    className="w-full h-full object-cover" 
                  />
                </div>
                <h4 className="font-semibold">Dr. Michael Chen</h4>
                <p className="text-xs text-gray-500">Neurology</p>
                <p className="text-xs text-primary mt-1">189 answers</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default Index;
