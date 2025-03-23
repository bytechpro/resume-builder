import React from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';
import { jsPDF } from 'jspdf';

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

interface ResumePreviewProps {
  resumeData: ResumeData;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ resumeData }) => {

  // Function to generate and download the resume as a PDF
  const downloadResumeAsPDF = () => {
    const doc = new jsPDF();

    // Adding title
    doc.setFontSize(18);
    doc.text("Resume", 20, 20);

    // Adding name
    doc.setFontSize(14);
    doc.text(`Name: ${resumeData.name}`, 20, 30);

    // Adding email
    doc.text(`Email: ${resumeData.email}`, 20, 40);

    // Adding phone number
    doc.text(`Phone: ${resumeData.phone}`, 20, 50);

    // Adding skills
    doc.text("Skills:", 20, 60);
    doc.text(resumeData.skills, 20, 70);

    // Adding experience
    doc.text("Experience:", 20, 100);
    resumeData.experience.forEach((job, idx) => {
      doc.text(`${job.title} at ${job.company} (${job.startDate} - ${job.endDate})`, 20, 110 + idx * 10);
      doc.text(`Description: ${job.description}`, 20, 120 + idx * 10);
    });

    // Adding education
    doc.text("Education:", 20, 150 + resumeData.experience.length * 10);
    doc.text(resumeData.education, 20, 160 + resumeData.experience.length * 10);

    // Download the document as a PDF
    doc.save(`${resumeData.name}_resume.pdf`);
  };

  // Function to generate and download the resume as an HTML file
  const downloadResumeAsHTML = () => {
    const htmlContent = `
      <html>
        <head>
          <title>Resume - ${resumeData.name}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; padding: 0; background: #f4f4f4; }
            .container { max-width: 900px; margin: 0 auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); }
            h1 { text-align: center; font-size: 24px; margin-bottom: 10px; color: #333333; }
            h2 { font-size: 20px; margin: 10px 0; color: #333333; }
            h3 { font-size: 18px; margin-top: 20px; color: #333333; }
            p { font-size: 16px; margin: 5px 0; color: #555555; }
            .section { margin-bottom: 20px; }
            .contact-info, .skills, .experience, .education { margin-bottom: 20px; }
            .contact-info p { font-size: 16px; color: #555555; }
            .skills ul, .experience ul, .education ul { list-style-type: none; padding: 0; }
            .skills li, .experience li, .education li { margin-bottom: 10px; }
            .experience li { background-color: #f8f8f8; padding: 10px; border-radius: 6px; box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.05); }
            .experience li strong { color: #333333; }
            .experience li p { color: #666666; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Resume</h1>
            <h2>${resumeData.name}</h2>
            <div class="contact-info">
              <p><strong>Email:</strong> ${resumeData.email}</p>
              <p><strong>Phone:</strong> ${resumeData.phone}</p>
            </div>
            <div class="skills section">
              <h3>Skills</h3>
              <ul>
                <li>${resumeData.skills}</li>
              </ul>
            </div>
            <div class="experience section">
              <h3>Experience</h3>
              <ul>
                ${resumeData.experience.map(job => `
                  <li>
                    <strong>${job.title} at ${job.company} (${job.startDate} - ${job.endDate})</strong>
                    <p>${job.description}</p>
                  </li>
                `).join('')}
              </ul>
            </div>
            <div class="education section">
              <h3>Education</h3>
              <ul>
                <li>${resumeData.education}</li>
              </ul>
            </div>
          </div>
        </body>
      </html>
    `;

    // Create a Blob from the HTML content
    const blob = new Blob([htmlContent], { type: 'text/html' });


    // Create an anchor element and trigger the download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${resumeData.name}_resume.html`; // Set the file name
    link.click(); // Trigger the download
  };

  return (
    <Box sx={{ maxWidth: 900, margin: '0 auto', padding: 3, backgroundColor: 'white', boxShadow: 2, borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ color: '#333333' }}>
        Resume Preview
      </Typography>
      <Box sx={{ marginBottom: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ color: '#555555' }}>Name:</Typography>
            <Typography sx={{ color: '#333333' }}>{resumeData.name}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ color: '#555555' }}>Email:</Typography>
            <Typography sx={{ color: '#333333' }}>{resumeData.email}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ color: '#555555' }}>Phone:</Typography>
            <Typography sx={{ color: '#333333' }}>{resumeData.phone}</Typography>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h6" sx={{ color: '#555555' }}>Skills</Typography>
        <Typography sx={{ color: '#333333' }}>{resumeData.skills}</Typography>
      </Box>

      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h6" sx={{ color: '#555555' }}>Experience</Typography>
        {resumeData.experience.map((job, index) => (
          <Box key={index} sx={{ marginBottom: 2, backgroundColor: '#f8f8f8', padding: 2, borderRadius: 1, boxShadow: 1 }}>
            <Typography variant="subtitle1" sx={{ color: '#333333' }}>
              {job.title} at {job.company}
            </Typography>
            <Typography variant="body2" sx={{ color: '#666666' }}>{job.startDate} - {job.endDate}</Typography>
            <Typography sx={{ color: '#333333' }}>{job.description}</Typography>
          </Box>
        ))}
      </Box>

      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h6" sx={{ color: '#555555' }}>Education</Typography>
        <Typography sx={{ color: '#333333' }}>{resumeData.education}</Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button variant="contained" color="primary" sx={{ marginRight: 2 }} onClick={downloadResumeAsPDF}>
          Download PDF
        </Button>
        <Button variant="contained" color="secondary" onClick={downloadResumeAsHTML}>
          Download HTML
        </Button>
      </Box>
    </Box>
  );
};

export default ResumePreview;
