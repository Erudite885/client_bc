import "./app.scss";
import React from "react";

import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import react-toastify CSS

import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Gigs from "./pages/gigs/Gigs";
import Gig from "./pages/gig/Gig";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Add from "./pages/add/Add";
import ForgotPassword from "./pages/auth/ForgotPassword";
import EmailVerification from "./pages/auth/EmailVerification";
import Orders from "./pages/orders/Orders";
import Messages from "./pages/messages/Messages";
import Message from "./pages/message/Message";
import MyGigs from "./pages/myGigs/MyGigs";

import { PrivacyPolicy } from "./pages/common/PrivacyPolicy";
import { FAQ } from "./pages/common/FAQ";
import { TermsOfService } from "./pages/common/TermsOfService";
import { ProfileEdit } from "./pages/profileEdit/ProfileEdit";
import { GetStarted } from "./pages/common/GetStarted";
import { Contact } from "./pages/common/Contact";
import { NotFound } from "./pages/common/NotFound";
import { Support } from "./pages/common/Support";
import { About } from "./pages/common/About";
import ResendEmailVerification from "./pages/auth/ResendEmailVerification";
import EmailSent from "./pages/auth/EmailSent";
import ResetPassword from "./pages/auth/ResetPassword";
import Pricing from "./pages/common/Pricing";
import Dashboard from "./pages/dashboard/Dashboad";
import { Onboarding } from "./pages/common/Onboarding";
import PaymentConfirmation from "./pages/pay/PaymentConfirmation";
import Checkout from "./pages/checkout/Checkout";
import OrderSuccess from "./pages/success/Success";
import PaymentCompleted from "./pages/complete/complete";
import OrderFailure from "./pages/success/Failed";

function App() {
  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <div className="app">
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <Outlet />
          {/* Add ToastContainer here */}
          <ToastContainer position="top-right" autoClose={3000} />
        </QueryClientProvider>
      </div>
    );
  };

  const WIP = () => {
    return (
      <p>Work in Progress</p>
    )
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/onboarding",
          element: <Onboarding />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/privacy-policy",
          element: <PrivacyPolicy />,
        },
        {
          path: "/pricing",
          element: <Pricing />,
        },
        {
          path: "/terms-of-service",
          element: <TermsOfService />,
        },
        {
          path: "/get-started",
          element: <GetStarted />,
        },
        {
          path: "/faq",
          element: <FAQ />,
        },
        {
          path: "*", // Catch-all route for undefined paths
          element: <NotFound />,
        },
        {
          path: "/support",
          element: <Support />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/gigs",
          element: <Gigs />,
        },
        {
          path: "/myGigs",
          element: <MyGigs />,
        },
        {
          path: "/orders",
          element: <Orders />,
        },
        {
          path: "/messages",
          element: <Messages />,
        },
        {
          path: "/message/:id",
          element: <Message />,
        },
        {
          path: "/add",
          element: <Add />,
        },
        {
          path: "/gigs/:id",
          element: <Gig />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/edit-profile",
          element: <ProfileEdit />,
        },
        {
          path: "/forgot-password",
          element: <ForgotPassword />,
        },
        {
          path: "/reset-password",
          element: <ResetPassword />,
        },
        {
          path: "/verify-email",
          element: <EmailVerification />,
        },
        {
          path: "/email-sent",
          element: <EmailSent />,
        },
        {
          path: "/resend-verification",
          element: <ResendEmailVerification />,
        },
        {
          path: "/payment-confirmation/:gigId",
          element: <PaymentConfirmation />,
        },
        {
          path: "/checkout/:gigId",
          element: <Checkout />,
        },
        {
          path: "/payment-completed",
          element: <PaymentCompleted />,
        },
        {
          path: "/order-success",
          element: <OrderSuccess />,
        },
        {
          path: "/order-failure",
          element: <OrderFailure />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
