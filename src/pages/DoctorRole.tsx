import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { createNewUser } from '@/components/user';
import { useAuth, useUser } from '@clerk/clerk-react';

const DoctorForm: React.FC = () => {
  const navigate = useNavigate();
  const {user} = useUser();
  const [idCard, setIdCard] = useState<File | null>(null);
  const [hospital, setHospital] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [experience, setExperience] = useState('');
  const [location, setLocation] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [website, setWebsite] = useState('');
  const [institution, setInstitution] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userDetails = {
          userId: user.id,
          name: user.fullName,
          email: user.emailAddresses[0].emailAddress,
          avatar: "/placeholder.svg",
          role: "professional",
          institution: institution,
        }
    
        const fullDetails = {
          userId: user.id,
          email: user.emailAddresses[0].emailAddress,
          hospital: hospital,
          institution: institution, 
          specialization: specialization,
          abhaNumber: registrationNumber,
          experience: experience,
          linkedin: linkedin,
          website: website,
          location: location
        }
        
        await createNewUser(userDetails, fullDetails);
        if (!idCard) return;
        navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="max-w-md w-full p-6 rounded-2xl shadow-lg animate-fadeIn">
        <h2 className="text-2xl font-bold mb-4 text-center">Doctor Verification</h2>
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-sm font-medium mb-1">Institution Name</label>
            <Input
              type="text"
              placeholder="e.g. Apollo Hospital"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Hospital Name</label>
            <Input
              type="text"
              placeholder="e.g. Apollo Hospital"
              value={hospital}
              onChange={(e) => setHospital(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Institution Location</label>
            <Input
              type="text"
              placeholder="e.g. Delhi"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Upload ID Card</label>
            <Input
              type="file"
              accept="image/*,application/pdf"
              onChange={(e) => setIdCard(e.target.files?.[0] || null)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Specialization</label>
            <select
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              required
              className="w-full border rounded-md px-3 py-2 text-sm"
            >
              <option value="" disabled>Select specialization</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Neurology">Neurology</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Dermatology">Dermatology</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="General Medicine">General Medicine</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">ABHA Number</label>
            <Input
              type="text"
              placeholder="e.g. AP/123456"
              value={registrationNumber}
              onChange={(e) => setRegistrationNumber(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Years of Practice</label>
            <Input
              type="number"
              placeholder="e.g. 5"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              required
              min={0}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">LinkedIn Profile</label>
            <Input
              type="url"
              placeholder="https://linkedin.com/in/username"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Hospital/Clinic Website</label>
            <Input
              type="url"
              placeholder="https://hospitalwebsite.com"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
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

export default DoctorForm;
