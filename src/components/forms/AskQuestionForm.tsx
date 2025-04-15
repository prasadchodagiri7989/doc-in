import React, { useState, useEffect } from 'react';
import {User} from '../../types'
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import FileUpload from '@/components/ui/FileUpload';
import { FileAttachment, Question } from '@/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { generateId } from '@/lib/utils';
import { postQuestion, getUserDetails } from '../questions';
import { useAuth, useUser } from '@clerk/clerk-react';

const AskQuestionForm = () => {
  const {isSignedIn} = useAuth();
  const {user} = useUser();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [useExternalResources, setUseExternalResources] = useState(false);
  const [files, setFiles] = useState<FileAttachment[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [whoCanAnswer, setWhoCanAnswer] = useState('anyone'); // 'anyone' or 'medical-professional'
  const [userDetails,setUserDetails] = useState<User | null>(null);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  if(!isSignedIn){
    navigate('/sign-in')
  }

  useEffect(() => {
      const fetchUserDetails = async () => {
        const userDetails = await getUserDetails(user.id);
        setUserDetails(userDetails);
      };
      fetchUserDetails();
    },[isSignedIn, user]);
  
  const handleFileUpload = (uploadedFiles: File[]) => {
    const newFiles: FileAttachment[] = uploadedFiles.map((file, index) => ({
      id: `temp-${Date.now()}-${index}`,
      name: file.name,
      url: URL.createObjectURL(file),
      type: file.type.includes('image') ? 'image' : 'pdf'
    }));
    
    setFiles([...files, ...newFiles]);
  };
  
  const handleRemoveFile = (id: string) => {
    setFiles(files.filter(file => file.id !== id));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      toast({
        title: "Incomplete form",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Create new question object
    const newQuestion: Question = {
      id: generateId(),
      title: title.trim(),
      content: content.trim(),
      author: {
        userId: user.id, // Mock user ID
        name: user.fullName, // Mock user name
        avatar: "/placeholder.svg",
        role: userDetails.role,
        institution: userDetails.institution
      },
      createdAt: new Date().toISOString(),
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
      votes: 0,
      answers: [],
      useExternalResources,
      fileAttachments: files,
      answerableByEveryone: whoCanAnswer !== 'medical-professional' ? true : false
    };
    await postQuestion(newQuestion);
    setIsSubmitting(false);
    navigate('/questions');
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Question Title</Label>
        <Input
          id="title"
          placeholder="E.g., What are the diagnostic criteria for Kawasaki disease?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="content">Question Details</Label>
        <Textarea
          id="content"
          placeholder="Describe your question in detail. Include relevant patient information, symptoms, lab results, etc."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[150px] resize-y"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="tags">Tags</Label>
        <Input
          id="tags"
          placeholder="E.g., cardiology, diagnosis, ECG (separate with commas)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <p className="text-xs text-gray-500">Add up to 5 tags to help categorize your question</p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="whoCanAnswer">Who can answer?</Label>
        <Select value={whoCanAnswer} onValueChange={setWhoCanAnswer}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select who can answer" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="anyone">Anyone can answer</SelectItem>
            <SelectItem value="medical-professional" className="bg-blue-50">Only Medical Professionals</SelectItem>
          </SelectContent>
        </Select>
        {whoCanAnswer === 'medical-professional' && (
          <div className="p-3 bg-blue-50 border border-blue-100 rounded-md text-sm text-blue-800">
            Your question will only be answered by verified medical professionals.
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <Label>Attachments</Label>
        <FileUpload 
          onFileUpload={handleFileUpload} 
          existingFiles={files}
          onRemoveFile={handleRemoveFile}
        />
      </div>
      
      <div className="flex items-start space-x-2">
        <Checkbox 
          id="external-resources" 
          checked={useExternalResources}
          onCheckedChange={(checked) => setUseExternalResources(checked as boolean)}
        />
        <div className="space-y-1">
          <Label 
            htmlFor="external-resources" 
            className="font-medium"
          >
            Use external resources
          </Label>
          <p className="text-xs text-gray-500">
            Allow answers to reference external medical databases and research papers for a more comprehensive response
          </p>
        </div>
      </div>
      
      <div className="flex justify-end pt-2">
        <Button 
          type="submit" 
          className="w-full sm:w-auto"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Posting...' : 'Post Question'}
        </Button>
      </div>
    </form>
  );
};

export default AskQuestionForm;