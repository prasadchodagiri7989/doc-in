import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

const StudentForm: React.FC = () => {
  const navigate = useNavigate();

  const [college, setCollege] = useState('');
  const [location, setLocation] = useState('');
  const [year, setYear] = useState('');
  const [idCard, setIdCard] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!idCard) return;
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="max-w-md w-full p-6 rounded-2xl shadow-lg animate-fadeIn">
        <h2 className="text-2xl font-bold mb-4 text-center">Student Verification</h2>
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-sm font-medium mb-1">College Name</label>
            <Input
              type="text"
              placeholder="e.g. IIT Bombay"
              value={college}
              onChange={(e) => setCollege(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">College Location</label>
            <Input
              type="text"
              placeholder="e.g. Mumbai"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Current Year</label>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
              className="w-full border rounded-md px-3 py-2 text-sm"
            >
              <option value="" disabled>Select year</option>
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Upload College ID Card</label>
            <Input
              type="file"
              accept="image/*,application/pdf"
              onChange={(e) => setIdCard(e.target.files?.[0] || null)}
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default StudentForm;
