import { createBrowserRouter, Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import LandingPage from "../pages/Landing";
import AuthLayout from "../layout/Auth";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import ForgotPasswordPage from "../pages/ForgotPassword";
import NotFound404Page from "../pages/NotFound404";
import ContactUsPage from "../pages/ContactUs";
import AboutUsPage from "../pages/AboutUs";
import Panel from "../layout/Panel";
import ListingPage from "../pages/ListingPage";
import CourseDetailPage from "../pages/CourseDetail";
import NewsPage from "../pages/NewsPage";
import TeacherList from "../pages/TeacherList";
import TeacherDetail from "../components/Teacher/TeacherDetail";
import NewsDetailPage from "../pages/NewsDetail";
import PaymentResult from "../components/panel/Pages/PaymentResult";
import ProtectedRoute from "../components/auth/ProtectedRoute";

import Dashboard from "../components/panel/Pages/Dashboard";
import MyCourses from "../components/panel/Pages/MyCourses";
import MyReserve from "../components/panel/Pages/MyReserve";
import FavCourses from "../components/panel/Pages/FavCourses";
import FavMag from "../components/panel/Pages/FavMag";
import ProfilePanel from "../components/panel/Pages/Profile";
import NotificationsPage from "../components/panel/Pages/NotificationsPage";
import Payments from "../components/panel/Pages/Payments";
import Accounts from "../components/panel/Pages/Accounts";
import MyAssignments from "../components/panel/Pages/MyAssignments";
import MySessions from "../components/panel/Pages/MySessions";
import MyTickets from "../components/panel/Pages/MyTickets";

const SmoothScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return <Outlet />;
};

const router = createBrowserRouter([
  {
    element: <SmoothScrollToTop />,
    children: [
      { path: "/", element: <LandingPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          { 
            path: "/panel", 
            element: <Panel />,
            children: [
              { index: true, element: <Dashboard /> },
              { path: "my-courses", element: <MyCourses /> },
              { path: "my-classes", element: <MySessions /> },
              { path: "my-assignments", element: <MyAssignments /> },
              { path: "my-tickets", element: <MyTickets /> },
              { path: "reserve", element: <MyReserve /> },
              { path: "fav-courses", element: <FavCourses /> },
              { path: "fav-mag", element: <FavMag /> },
              { path: "profile", element: <ProfilePanel /> },
              { path: "payments", element: <Payments /> },
              { path: "notifications", element: <NotificationsPage /> },
              { path: "accounts", element: <Accounts /> },
            ]
          }
        ]
      },
      {
        path: "/Auth",
        element: <AuthLayout />,
        children: [
          { path: "Login", element: <LoginPage /> },
          { path: "Register", element: <RegisterPage /> },
          { path: "ForgotPassword", element: <ForgotPasswordPage /> },
        ],
      },
      { path: "/About_Us", element: <AboutUsPage /> },
      { path: "/Contact_Us", element: <ContactUsPage /> },
      { path: "/courses", element: <ListingPage /> },
      { path: "/courses/:id", element: <CourseDetailPage /> },
      { path: "/coursDetail", element: <CourseDetailPage /> },
      { path: "/news", element: <NewsPage /> },
      { path: "/news/:id", element: <NewsDetailPage /> },
      { path: "/teacherList", element: <TeacherList /> },
      { path: "/teachers/:id", element: <TeacherDetail /> },
      { path: "/payment-result", element: <PaymentResult /> },
      { path: "*", element: <NotFound404Page /> },
    ],
  },
]);

export default router;