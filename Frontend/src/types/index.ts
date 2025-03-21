
export interface User {
  id: string;
  name: string;
  avatar: string;
  role: 'student' | 'doctor';
  specialization?: string;
  institution?: string;
}

export interface Question {
  id: string;
  title: string;
  content: string;
  author: User;
  createdAt: string;
  tags: string[];
  votes: number;
  answers: Answer[];
  fileAttachments?: FileAttachment[];
  useExternalResources: boolean;
  aiAnalysis?: string;
}

export interface Answer {
  id: string;
  content: string;
  author: User;
  createdAt: string;
  votes: number;
  isVerified: boolean;
}

export interface FileAttachment {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'pdf';
  thumbnailUrl?: string;
  file?: File; // Added file property to store the actual File object
}

export interface Tag {
  id: string;
  name: string;
  count: number;
}
