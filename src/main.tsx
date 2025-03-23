import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import ResumeBulderBase from './components/ResumeBuilderBase'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ResumeBulderBase />
  </StrictMode>,
)
