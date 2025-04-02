import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ThumbsUp, ThumbsDown, MessageSquare, Share, Bookmark, CheckCircle, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/layout/Header';
import BottomNavigation from '@/components/layout/BottomNavigation';
import { mockQuestions } from '@/lib/mockData';

const QuestionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [answer, setAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  // Find question by id
  const question = mockQuestions.find(q => q.id === id) || mockQuestions[0]; // Fallback to first question
  
  const handleSubmitAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!answer.trim()) {
      toast({
        title: "Empty answer",
        description: "Please write your answer before submitting",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission with a timeout
    setTimeout(() => {
      toast({
        title: "Answer posted",
        description: "Your answer has been successfully posted"
      });
      setIsSubmitting(false);
      setAnswer('');
    }, 1500);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container max-w-4xl mx-auto px-4 pt-20 pb-24">
        <Button 
          variant="ghost" 
          size="sm" 
          asChild
          className="mb-6 flex items-center text-gray-600 hover:text-gray-900"
        >
          <Link to="/">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Questions
          </Link>
        </Button>
        
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Question header */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={question.author.avatar} alt={question.author.name} />
                  <AvatarFallback>{question.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{question.author.name}</p>
                  <p className="text-sm text-gray-500">
                    {question.author.role === 'student' 
                      ? question.author.institution 
                      : `${question.author.specialization} Specialist`}
                  </p>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                {new Date(question.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </div>
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{question.title}</h1>
            
            <p className="text-gray-700 mb-4">{question.content}</p>
            
            {question.aiAnalysis && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-4">
                <div className="flex items-start space-x-3">
                  <Brain className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-800 mb-1">AI Analysis</h4>
                    <p className="text-sm text-blue-700">{question.aiAnalysis}</p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex flex-wrap gap-2 mb-4">
              {question.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                  {tag}
                </Badge>
              ))}
            </div>
            
            {question.useExternalResources && (
              <div className="mb-4 flex items-center text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                <span>This question uses external resources for comprehensive answers</span>
              </div>
            )}
            
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <ThumbsUp className="h-4 w-4" />
                <span>{question.votes}</span>
              </Button>
              
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <ThumbsDown className="h-4 w-4" />
              </Button>
              
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Bookmark className="h-4 w-4" />
                <span className="hidden sm:inline">Save</span>
              </Button>
              
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Share className="h-4 w-4" />
                <span className="hidden sm:inline">Share</span>
              </Button>
            </div>
          </div>
          
          {/* Answers */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold flex items-center">
                <MessageSquare className="h-5 w-5 mr-2" />
                {question.answers.length} Answers
              </h2>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select className="text-sm border-0 focus:ring-0 p-0 pr-6 bg-transparent">
                  <option>Most helpful</option>
                  <option>Newest</option>
                  <option>Oldest</option>
                </select>
              </div>
            </div>
            
            {question.answers.length > 0 ? (
              <div className="space-y-6">
                {question.answers.map((answer) => (
                  <div key={answer.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={answer.author.avatar} alt={answer.author.name} />
                          <AvatarFallback>{answer.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center">
                            <p className="font-medium">{answer.author.name}</p>
                            {answer.isVerified && (
                              <Badge className="ml-2 bg-green-100 text-green-800 border-green-200">
                                <CheckCircle className="h-3 w-3 mr-1" /> Verified Doctor
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">
                            {answer.author.role === 'student' 
                              ? answer.author.institution 
                              : `${answer.author.specialization} Specialist`}
                          </p>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(answer.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-3">{answer.content}</p>
                    
                    <div className="flex items-center gap-3">
                      <Button variant="ghost" size="sm" className="flex items-center gap-1">
                        <ThumbsUp className="h-3 w-3" />
                        <span>{answer.votes}</span>
                      </Button>
                      
                      <Button variant="ghost" size="sm" className="flex items-center gap-1">
                        <ThumbsDown className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-gray-800 mb-1">No answers yet</h3>
                <p className="text-gray-600 mb-4">Be the first to answer this question</p>
              </div>
            )}
            
            <Separator className="my-8" />
            
            {/* Add an answer */}
            <div>
              <h3 className="text-lg font-bold mb-4">Your Answer</h3>
              
              <form onSubmit={handleSubmitAnswer}>
                <Textarea
                  placeholder="Write your answer here..."
                  className="min-h-[150px] mb-4"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                />
                
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Posting...' : 'Post Answer'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default QuestionDetail;
