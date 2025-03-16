
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import FileUpload from '@/components/ui/FileUpload';
import { FileAttachment } from '@/types';

const AskQuestionForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [useExternalResources, setUseExternalResources] = useState(false);
  const [files, setFiles] = useState<FileAttachment[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
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
    
    // Simulate form submission with a timeout
    setTimeout(() => {
      toast({
        title: "Question posted",
        description: "Your question has been successfully posted"
      });
      setIsSubmitting(false);
      navigate('/');
    }, 1500);
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
