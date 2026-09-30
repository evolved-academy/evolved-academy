/**
 * Career Counselling Data Archive
 * ================================
 * This directory contains all data, questions, profile evaluation logic, page components, 
 * and styles for the Career Counselling module stored safely for future restoration.
 *
 * To restore Career Counselling in the future:
 * 1. Re-add routes in App.jsx pointing to pages in this archive directory or src/pages/
 * 2. Re-enable the Special Course section in HomePage.jsx & MyCoursesPage.jsx
 * 3. Import data structures below into your application logic.
 */

export { aptitudeQuestions } from './aptitudeQuestions';
export { aptitudeProfiles } from './aptitudeProfiles';
export { careerMaterials } from './materials';

export { default as CareerCounsellingPage } from './pages/CareerCounsellingPage';
export { default as CareerCourseSubPage } from './pages/CareerCourseSubPage';
export { default as CareerChoiceMaterialsPage } from './pages/CareerChoiceMaterialsPage';
export { default as AptitudeTestPage } from './pages/AptitudeTestPage';
export { default as ExpertSessionPage } from './pages/ExpertSessionPage';
export { default as GuidanceSessionPage } from './pages/GuidanceSessionPage';
