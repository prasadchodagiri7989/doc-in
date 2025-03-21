
import { User, Question, Tag } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=random',
    role: 'doctor',
    specialization: 'Cardiology'
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=random',
    role: 'doctor',
    specialization: 'Neurology'
  },
  {
    id: '3',
    name: 'Alex Rivera',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=random',
    role: 'student',
    institution: 'Harvard Medical School'
  },
  {
    id: '4',
    name: 'Jenna Williams',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=random',
    role: 'student',
    institution: 'Johns Hopkins School of Medicine'
  }
];

export const mockQuestions: Question[] = [
  {
    id: '1',
    title: 'Interpreting ECG patterns in Wolff-Parkinson-White syndrome',
    content: 'I\'m struggling to identify the key differences between Type A and Type B WPW syndrome on ECG. Could someone explain the distinguishing features and provide some example ECGs?',
    author: mockUsers[3],
    createdAt: '2023-11-10T14:23:00Z',
    tags: ['cardiology', 'ECG', 'electrophysiology'],
    votes: 24,
    answers: [
      {
        id: '101',
        content: 'WPW Type A shows positive delta waves in V1-V6 leads, while Type B shows negative delta waves in leads V1 and V2. Type A indicates left-sided accessory pathways, while Type B suggests right-sided pathways. I recommend looking at the PR interval shortening and delta waves as key diagnostic features.',
        author: mockUsers[0],
        createdAt: '2023-11-10T15:30:00Z',
        votes: 18,
        isVerified: true
      }
    ],
    useExternalResources: true,
    aiAnalysis: 'Your ECG shows characteristics of WPW Type A with positive delta waves in precordial leads. The short PR interval (0.10s) and wide QRS complex (0.12s) with slurred upstroke (delta wave) are consistent with ventricular pre-excitation.'
  },
  {
    id: '2',
    title: 'Differential diagnosis for unilateral pupillary dilation',
    content: 'During my clinical rotation, I encountered a patient with unilateral pupillary dilation but no other neurological symptoms. What conditions should I consider in the differential diagnosis?',
    author: mockUsers[3],
    createdAt: '2023-11-08T09:45:00Z',
    tags: ['neurology', 'ophthalmology', 'clinical-examination'],
    votes: 31,
    answers: [
      {
        id: '201',
        content: 'Key differentials to consider include: 1) Adie\'s tonic pupil, 2) Pharmacological mydriasis (eye drops), 3) Third nerve palsy (look for ptosis and extraocular movement limitations), 4) Direct trauma to the eye, and 5) Early signs of uncal herniation (though typically with other neurological findings). I\'d recommend checking pupillary light response and accommodation, as well as a detailed neurological exam to narrow it down.',
        author: mockUsers[1],
        createdAt: '2023-11-08T10:20:00Z',
        votes: 26,
        isVerified: true
      }
    ],
    useExternalResources: true
  },
  {
    id: '3',
    title: 'Management of diabetic ketoacidosis in pediatric patients',
    content: 'What are the current guidelines for fluid resuscitation and insulin administration in pediatric DKA? Are there any recent changes in protocols to reduce the risk of cerebral edema?',
    author: mockUsers[2],
    createdAt: '2023-11-05T16:30:00Z',
    tags: ['pediatrics', 'endocrinology', 'emergency-medicine'],
    votes: 19,
    answers: [],
    useExternalResources: false
  }
];

export const mockTags: Tag[] = [
  { id: '1', name: 'cardiology', count: 128 },
  { id: '2', name: 'neurology', count: 95 },
  { id: '3', name: 'pediatrics', count: 87 },
  { id: '4', name: 'surgery', count: 76 },
  { id: '5', name: 'dermatology', count: 69 },
  { id: '6', name: 'psychiatry', count: 58 },
  { id: '7', name: 'oncology', count: 52 },
  { id: '8', name: 'emergency-medicine', count: 45 },
  { id: '9', name: 'radiology', count: 42 },
  { id: '10', name: 'pharmacology', count: 38 }
];

export const currentUser: User = {
  id: '4',
  name: 'Jenna Williams',
  avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=random',
  role: 'student',
  institution: 'Johns Hopkins School of Medicine'
};
