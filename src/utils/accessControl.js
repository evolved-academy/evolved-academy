// src/utils/accessControl.js
import { supabase } from '../supabase';

// Helper to get local access registry
export const getLocalAccessRegistry = () => {
  try {
    const raw = localStorage.getItem('evolved_access_registry');
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
};

// Helper to save access locally
export const saveLocalAccess = (usernameOrEmail, courseCode) => {
  try {
    const registry = getLocalAccessRegistry();
    const cleanKey = usernameOrEmail.trim().toLowerCase().replace(/\s+/g, '');
    const cleanEmailKey = cleanKey.includes('@') ? cleanKey : `${cleanKey}@evolved.app`;
    const cleanUserKey = cleanKey.split('@')[0];

    const currentCodes = registry[cleanUserKey] || [];
    if (!currentCodes.includes(courseCode)) {
      currentCodes.push(courseCode);
    }
    registry[cleanUserKey] = currentCodes;

    const emailCodes = registry[cleanEmailKey] || [];
    if (!emailCodes.includes(courseCode)) {
      emailCodes.push(courseCode);
    }
    registry[cleanEmailKey] = emailCodes;

    localStorage.setItem('evolved_access_registry', JSON.stringify(registry));
  } catch (e) {
    console.error('Error saving local access:', e);
  }
};

// Main function to check student access
export const getStudentUnlockedCourses = async (user) => {
  if (!user) return [];

  const rawUsername = user.username || (user.email ? user.email.split('@')[0] : '');
  const cleanUsername = rawUsername.trim().toLowerCase().replace(/\s+/g, '');
  const cleanEmail = user.email ? user.email.trim().toLowerCase() : `${cleanUsername}@evolved.app`;

  const unlocked = new Set();

  // 1. Check local access registry
  const localRegistry = getLocalAccessRegistry();
  (localRegistry[cleanUsername] || []).forEach(c => unlocked.add(c));
  (localRegistry[cleanEmail] || []).forEach(c => unlocked.add(c));

  // 2. Pre-granted access for specific usernames like taher_72
  if (['taher_72', 'taher72', 'taher'].includes(cleanUsername) || cleanEmail.startsWith('taher_72')) {
    unlocked.add('JAMALI_CLASSES');
  }

  // 3. Query Supabase student_access table
  try {
    const emailQuery = cleanEmail ? `email.ilike.${cleanEmail}` : '';
    const usernameQuery = cleanUsername ? `email.ilike.${cleanUsername}` : '';
    const orCondition = [emailQuery, usernameQuery].filter(Boolean).join(',');

    if (orCondition) {
      const { data, error } = await supabase
        .from('student_access')
        .select('course_code')
        .or(orCondition);

      if (data && data.length > 0) {
        data.forEach(item => {
          if (item.course_code) unlocked.add(item.course_code);
        });
      }
    }
  } catch (error) {
    console.error('Error querying Supabase student_access:', error);
  }

  return Array.from(unlocked);
};

export const hasUserJamaliAccess = (user, unlockedCourses = []) => {
  if (!user) return false;
  if (user.role === 'admin' || user.role === 'editor') return true;

  const rawUsername = user.username || (user.email ? user.email.split('@')[0] : '');
  const cleanUsername = rawUsername.trim().toLowerCase().replace(/\s+/g, '');
  if (['taher_72', 'taher72', 'taher'].includes(cleanUsername)) return true;

  const validCodes = ['JAMALI_CLASSES', 'JAMALI', 'JC', 'JAMALI_ACCESS', 'JAMALI_CLASSES_ACCESS'];
  return unlockedCourses.some(code => validCodes.includes(code?.toUpperCase()));
};
