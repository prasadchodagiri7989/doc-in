import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import BottomNavigation from '@/components/layout/BottomNavigation';
import AskQuestionForm from '@/components/forms/AskQuestionForm';

const AskQuestion = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container max-w-3xl mx-auto px-4 pt-20 pb-24">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            asChild
            className="mb-4 flex items-center text-gray-600 hover:text-gray-900"
          >
            <Link to="/">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Ask a Medical Question</h1>
          <p className="text-gray-600">
            Share your medical query and get answers from expert doctors and fellow students.
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg mb-6">
            <HelpCircle className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-blue-800 mb-1">Tips for a good question</h3>
              <ul className="text-sm text-blue-700 space-y-1 list-disc pl-4">
                <li>Be specific and include relevant details</li>
                <li>Attach images or PDFs if necessary for better context</li>
                <li>Use proper medical terminology when possible</li>
                <li>Format your question for readability</li>
                <li>Add appropriate tags to reach relevant experts</li>
              </ul>
            </div>
          </div>
          
          <AskQuestionForm />
        </div>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default AskQuestion;
