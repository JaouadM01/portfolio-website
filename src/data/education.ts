import type { Certificate, EducationItem } from '../types'

export const education: readonly EducationItem[] = [
  {
    id: 'hbo-ict',
    title: 'HBO-ICT · Software Development',
    institution: 'De Haagse Hogeschool, Den Haag',
    period: '2022 – jan. 2027',
    note: 'Afstuderen verwacht in januari 2027.',
    current: true,
  },
  {
    id: 'havo',
    title: 'Havo · Economie & Maatschappijleer',
    institution: 'MboRijnland, Leiden',
    period: '2022',
  },
]

export const certificates: readonly Certificate[] = [
  { id: 'toegankelijkheid', title: 'Digitale Toegankelijkheid', issuer: 'Stichting Accessibility', year: '2023' },
  { id: 'fintech', title: 'Blockchain, AI & Quantum FinTech' },
  { id: 'investing', title: 'Investing & Trading' },
]
