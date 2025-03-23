import React, { useState } from 'react';
import { TextField, Button, Box, Grid, Typography, IconButton, Divider } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

interface JobExperience {
  company: string;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface ResumeFormProps {
  onSubmit: (data: any) => void;
}

const ResumeForm: React.FC<ResumeFormProps> = ({ onSubmit }) => {
  const [resumeData, setResumeData] = useState({
    name: '',
    email: '',
    phone: '',
    skills: '',
    experience: [{ company: '', title: '', startDate: '', endDate: '', description: '' }], // Dynamic experience array
    education: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string, index?: number) => {
    const { value } = e.target;
    if (index !== undefined) {
      const newExperience = [...resumeData.experience];
      newExperience[index][field] = value;
      setResumeData((prevData) => ({
        ...prevData,
        experience: newExperience
      }));
    } else {
      setResumeData((prevData) => ({
        ...prevData,
        [field]: value
      }));
    }
  };

  const handleAddExperience = () => {
    setResumeData((prevData) => ({
      ...prevData,
      experience: [
        ...prevData.experience,
        { company: '', title: '', startDate: '', endDate: '', description: '' }
      ]
    }));
  };

  const handleRemoveExperience = (index: number) => {
    const newExperience = resumeData.experience.filter((_, i) => i !== index);
    setResumeData((prevData) => ({
      ...prevData,
      experience: newExperience
    }));
  };

  const handleSubmit = () => {
    onSubmit(resumeData);
  };

  return (
    <Box sx={{ maxWidth: 900, margin: '0 auto', padding: 3, backgroundColor: 'white', boxShadow: 2 }}>
      <Typography variant="h4" gutterBottom>
        Resume Builder
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Full Name"
            fullWidth
            value={resumeData.name}
            onChange={(e) => handleInputChange(e, 'name')}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Email"
            fullWidth
            value={resumeData.email}
            onChange={(e) => handleInputChange(e, 'email')}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Phone"
            fullWidth
            value={resumeData.phone}
            onChange={(e) => handleInputChange(e, 'phone')}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Skills"
            fullWidth
            value={resumeData.skills}
            onChange={(e) => handleInputChange(e, 'skills')}
          />
        </Grid>
      </Grid>

      {/* Experience Section */}
      <Divider sx={{ marginY: 3 }} />
      <Typography variant="h6" gutterBottom>
        Experience
      </Typography>
      {resumeData.experience.map((job, index) => (
        <Box key={index} sx={{ marginBottom: 3 }}>
                      {/* Remove Job Button */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 1 }}>
            <IconButton onClick={() => handleRemoveExperience(index)} color="secondary">
              <Remove />
            </IconButton>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Company"
                fullWidth
                value={job.company}
                onChange={(e) => handleInputChange(e, 'company', index)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Job Title"
                fullWidth
                value={job.title}
                onChange={(e) => handleInputChange(e, 'title', index)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Start Date"
                fullWidth
                value={job.startDate}
                onChange={(e) => handleInputChange(e, 'startDate', index)}
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="End Date"
                fullWidth
                value={job.endDate}
                onChange={(e) => handleInputChange(e, 'endDate', index)}
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Job Description"
                fullWidth
                multiline
                rows={4}
                value={job.description}
                onChange={(e) => handleInputChange(e, 'description', index)}
              />
            </Grid>
          </Grid>

        </Box>
      ))}
      {/* Add Job Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', marginTop: 2 }}>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<Add />}
          onClick={handleAddExperience}
        >
          Add Job Experience
        </Button>
      </Box>

      {/* Education Section */}
      <Divider sx={{ marginY: 3 }} />
      <Typography variant="h6" gutterBottom>
        Education
      </Typography>
      <TextField
        label="Education"
        fullWidth
        value={resumeData.education}
        onChange={(e) => handleInputChange(e, 'education')}
        multiline
        rows={4}
      />

      {/* Submit Button */}
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Submit Resume
        </Button>
      </Box>
    </Box>
  );
};

export default ResumeForm;
