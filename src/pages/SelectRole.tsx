import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const SelectRole: React.FC = () => {
  const navigate = useNavigate();

  const handleSelect = (role: 'student' | 'doctor') => {
    if (role === 'doctor') {
      navigate('/doctor-form');
    } else {
      navigate('/student-form');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="max-w-md w-full p-6 rounded-2xl shadow-lg animate-fadeIn">
        <h2 className="text-2xl font-bold mb-4 text-center">Who are you?</h2>
        <p className="text-muted-foreground mb-6 text-center">Please select your role to continue</p>
        <div className="flex flex-col gap-4">
          <Button onClick={() => handleSelect('student')} className="w-full">I'm a Student</Button>
          <Button onClick={() => handleSelect('doctor')} variant="outline" className="w-full">I'm a Doctor</Button>
        </div>
      </Card>
    </div>
  );
};

export default SelectRole;
