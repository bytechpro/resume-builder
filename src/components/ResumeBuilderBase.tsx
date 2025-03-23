import { useState } from 'react';
import ResumeForm from './ResumeForm';
import ResumePreview from './ResumePreview';

interface JobExperience {
  company: string;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface ResumeData {
  name: string;
  email: string;
  phone: string;
  skills: string;
  experience: JobExperience[];
  education: string;
}

const ResumeBuilderBase: React.FC = () => {
  const [resumeData, setResumeData] = useState<ResumeData>({
    name: '',
    email: '',
    phone: '',
    skills: '',
    experience: [{ company: '', title: '', startDate: '', endDate: '', description: '' }],
    education: ''
  });

  const handleResumeDataChange = (data: ResumeData) => {
    setResumeData(data);
  };

  return (
    <div className="App">
      <ResumeForm onSubmit={handleResumeDataChange} />
      <ResumePreview resumeData={resumeData} />
    </div>
  );
};

export default ResumeBuilderBase;
