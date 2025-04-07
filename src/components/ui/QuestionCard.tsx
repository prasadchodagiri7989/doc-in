
import React from 'react';
import { Link } from 'react-router-dom';
import { ThumbsUp, MessageSquare, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const QuestionCard = ({ question }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm question-card-hover">
      <div className="p-5">
        <div className="flex items-center space-x-2 mb-3">
          <Avatar className="w-8 h-8">
            <AvatarImage  alt={question.author.name} />
            <AvatarFallback>{question.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{question.author.name}</span>
            <span className="text-xs text-gray-500">
              {question.author.role === 'student' 
                ? question.author.institution 
                : `${question.author.specialization} Specialist`}
            </span>
          </div>
          <div className="ml-auto text-xs text-gray-500">
            {new Date(question.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric'
            })}
          </div>
        </div>
        
        <Link to={`/questions/${question._id}`} state={question}>
          <h3 className="text-lg font-semibold mb-2 hover:text-primary transition-colors duration-200">
            {question.title}
          </h3>
          <p className="text-gray-700 text-sm line-clamp-2 mb-3">
            {question.content}
          </p>
        </Link>
        
        {/* <div className="flex flex-wrap gap-2 mb-4">
          {question.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
              {tag}
            </Badge>
          ))}
        </div> */}

        {question.useExternalResources && (
          <div className="mb-4 flex items-center text-xs text-gray-600">
            <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
            <span>Using external resources for comprehensive answers</span>
          </div>
        )}
        
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-4">
            <button className="flex items-center text-gray-600 hover:text-primary transition-colors">
              <ThumbsUp className="w-4 h-4 mr-1" />
              <span className="text-xs font-medium">{question.votes}</span>
            </button>
            <div className="flex items-center text-gray-600">
              <MessageSquare className="w-4 h-4 mr-1" />
              <span className="text-xs font-medium">{question.answers.length}</span>
            </div>
          </div>
          
          {question.answers.length > 0 && question.answers.some(a => a.isVerified) && (
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <CheckCircle className="w-3 h-3 mr-1" /> Verified Answer
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
