
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/layout/Header';
import BottomNavigation from '@/components/layout/BottomNavigation';
import FileUpload from '@/components/ui/FileUpload';
import { FileAttachment } from '@/types';
import { GEMINI_API_KEY } from '@/config';


const AISolver = () => {
  const [question, setQuestion] = useState('');
  const [useExternalResources, setUseExternalResources] = useState(false);
  const [files, setFiles] = useState<FileAttachment[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState('');
  
  const { toast } = useToast();
  
  const handleFileUpload = (uploadedFiles: File[]) => {
    const newFiles: FileAttachment[] = uploadedFiles.map((file, index) => ({
      id: `temp-${Date.now()}-${index}`,
      name: file.name,
      url: URL.createObjectURL(file),
      type: file.type.includes('image') ? 'image' : 'pdf',
      file: file // Store the actual file object for API upload
    }));
    
    setFiles([...files, ...newFiles]);
  };
  
  const handleRemoveFile = (id: string) => {
    setFiles(files.filter(file => file.id !== id));
  };

  
  // Helper function to convert file to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result as string;
        // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
        const base64Content = base64String.split(',')[1];
        resolve(base64Content);
      };
      reader.onerror = error => reject(error);
    });
  };
  
  const analyzeQuestion = async () => {
    if (!question.trim()) {
      toast({
        title: "Cannot analyze",
        description: "Please add your question first",
        variant: "destructive"
      });
      return;
    }
    
    setIsAnalyzing(true);
    
    try {
      // Prepare the text part of the prompt
      const textPrompt = `
        Medical Question: ${question}
        Use External Resources: ${useExternalResources ? 'Yes' : 'No'}
        ${files.length > 0 ? `Attachments: ${files.length} file(s) attached` : 'No attachments'}
        
        Please provide a detailed medical analysis of this question.
      `;
      
      // Prepare the request body
      const requestBody: any = {
        contents: [{
          parts: [{ text: textPrompt }]
        }]
      };
      
      // Add image parts if there are image files
      if (files.length > 0) {
        // Get the existing parts array
        const parts = requestBody.contents[0].parts;
        
        // Process image files and add them to parts
        for (const file of files) {
          if (file.type === 'image' && file.file) {
            const base64Data = await fileToBase64(file.file);
            parts.push({
              inline_data: {
                mime_type: file.file.type,
                data: base64Data
              }
            });
          }
        }
      }
      
      console.log("Sending request to Gemini API:", JSON.stringify(requestBody, null, 2));
      
      // Make the API request
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro-002:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody)
        }
      );
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Gemini API error:', errorData);
        throw new Error(`Failed to get AI analysis: ${errorData?.error?.message || response.statusText}`);
      }
      
      const data = await response.json();
      
      // Extract response text from Gemini API response
      let analysisText = "Analysis could not be generated.";
      
      if (data.candidates && 
          data.candidates[0] && 
          data.candidates[0].content && 
          data.candidates[0].content.parts && 
          data.candidates[0].content.parts[0] &&
          data.candidates[0].content.parts[0].text) {
        analysisText = data.candidates[0].content.parts[0].text;
      }
      
      setAiAnalysis(analysisText);
      
      toast({
        title: "Analysis complete",
        description: "AI has analyzed your question"
      });
    } catch (error) {
      console.error('Error analyzing with Gemini:', error);
      
      toast({
        title: "Analysis failed",
        description: "Could not complete the AI analysis. Please try again.",
        variant: "destructive"
      });
      
      // Fallback to sample response if API call fails
      setAiAnalysis(
        "Based on your description, this appears to be a case of acute coronary syndrome. " +
        "The symptoms of chest pain radiating to the left arm, shortness of breath, and diaphoresis are classic for myocardial ischemia. " +
        "Consider ordering an ECG, cardiac enzymes, and administering aspirin if not contraindicated."
      );
    } finally {
      setIsAnalyzing(false);
    }
  };
  
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
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">AI Medical Solver</h1>
          <p className="text-gray-600">
          Upload your file and receive AI-powered answers based on its content. Our system efficiently processes your documents to provide accurate insights.
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="space-y-6">
          <div className="space-y-2">
              <Label>Attachments</Label>
              <FileUpload 
                onFileUpload={handleFileUpload} 
                existingFiles={files}
                onRemoveFile={handleRemoveFile}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="question">Your Medical Question</Label>
              <Textarea
                id="question"
                placeholder="Describe your question in detail. Include relevant patient information, symptoms, lab results, etc."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="min-h-[150px] resize-y"
                required
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
                  Allow AI to reference external medical databases and research papers for a more comprehensive response
                </p>
              </div>
            </div>
            
            <Button 
              type="button" 
              className="w-full sm:w-auto flex items-center gap-2"
              onClick={analyzeQuestion}
              disabled={isAnalyzing || !question.trim() || files.length === 0}
            >
              <Brain className="w-4 h-4" />
              {isAnalyzing ? 'Analyzing...' : 'Analyze with AI'}
            </Button>
            
            {aiAnalysis && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mt-6">
                <div className="flex items-start space-x-3">
                  <Brain className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-800 mb-1">AI Analysis</h4>
                    <p className="text-sm text-blue-700 whitespace-pre-line">{aiAnalysis}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default AISolver;
