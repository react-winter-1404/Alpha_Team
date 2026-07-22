import { useNavigate } from 'react-router-dom';
import { useEffect, useCallback, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const faCommands = [
  { keywords: ['صفحه اصلی', 'خانه', 'اصلی'], path: '/' },
  { keywords: ['داشبورد', 'پنل کاربری', 'پنل', 'پروفایل'], path: '/panel' },
  { keywords: ['دوره ها', 'دوره', 'لیست دوره ها', 'کلاس ها'], path: '/courses' },
  { keywords: ['اخبار', 'خبر', 'مقالات', 'وبلاگ'], path: '/news' },
  { keywords: ['مدرسین', 'اساتید', 'استاد', 'معلمان'], path: '/teacherList' },
  { keywords: ['درباره ما', 'معرفی سایت', 'درباره'], path: '/About_Us' },
  { keywords: ['تماس با ما', 'ارتباط با ما', 'شماره تماس'], path: '/Contact_Us' },
  { keywords: ['ورود', 'لاین', 'ورود به سایت'], path: '/Auth/Login' },
  { keywords: ['ثبت نام', 'عضویت', 'ایجاد حساب'], path: '/Auth/Register' },
  { keywords: ['فراموشی', 'رمز', 'رمز عبور', 'فراموشی رمز عبور', 'فراموشی رمز'], path: '/Auth/ForgotPassword' },
  { keywords: ['سبد خرید', 'خریدها', 'کارت خرید'], path: '/cart' },
  { keywords: ['جزئیات دوره', 'مشخصات دوره'], path: '/course-details' },
  { keywords: ['برگشت', 'قبلی', 'عقب'], action: 'back' }
];

const enCommands = [
  { keywords: ['home', 'main page', 'index'], path: '/' },
  { keywords: ['dashboard', 'panel', 'user panel', 'profile'], path: '/panel' },
  { keywords: ['courses', 'course', 'course list', 'classes'], path: '/courses' },
  { keywords: ['news', 'blog', 'articles', 'article'], path: '/news' },
  { keywords: ['teachers', 'teacher', 'professors', 'instructor', 'instructors'], path: '/teacherList' },
  { keywords: ['about us', 'about'], path: '/About_Us' },
  { keywords: ['contact us', 'contact'], path: '/Contact_Us' },
  { keywords: ['login', 'sign in', 'log in'], path: '/Auth/Login' },
  { keywords: ['register', 'sign up', 'registration'], path: '/Auth/Register' },
  { keywords: ['cart', 'shopping cart', 'basket'], path: '/cart' },
  { keywords: ['course details', 'view course'], path: '/course-details' },
  { keywords: ['back', 'previous', 'go back'], action: 'back' }
];

export const useVoiceNavigation = () => {
  const navigate = useNavigate();
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const [currentLang, setCurrentLang] = useState('fa');

  useEffect(() => {
    const savedLang = localStorage.getItem('language') || 'fa';
    setCurrentLang(savedLang === 'fa' ? 'fa' : 'en');
  }, [listening]);

  const processVoiceCommand = useCallback((text) => {
    if (!text) return;
    const lowerText = text.toLowerCase().trim();
    const activeCommands = currentLang === 'fa' ? faCommands : enCommands;
    
    for (const cmd of activeCommands) {
      const isMatch = cmd.keywords.some(keyword => lowerText.includes(keyword.toLowerCase().trim()));
      if (isMatch) {
        if (cmd.action === 'back') {
          navigate(-1);
        } else if (cmd.path) {
          navigate(cmd.path);
        }
        resetTranscript();
        SpeechRecognition.stopListening();
        return;
      }
    }
  }, [navigate, resetTranscript, currentLang]);

  useEffect(() => {
    if (transcript) {
      processVoiceCommand(transcript);
    }
  }, [transcript, processVoiceCommand]);

  const handleMicClick = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      resetTranscript();
      SpeechRecognition.startListening({ 
        continuous: true, 
        language: currentLang === 'fa' ? 'fa-IR' : 'en-US' 
      });
    }
  };

  return {
    listening,
    transcript,
    currentLang,
    toggleListening: handleMicClick,
  };
};