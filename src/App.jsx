import "./app.scss";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import React from "react";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Pay from "./pages/pay/Pay";
import Success from "./pages/success/Success";
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

function App() {
  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <div className="app">
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <Outlet />
          <Footer />
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
      element: <WIP />,
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
          path: "/privacy-policy",
          element: <PrivacyPolicy />,
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
          path: "/gig/:id",
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
        // {
        //   path: "/pay/:id",
        //   element: <Pay />,
        // },
        // {
        //   path: "/success",
        //   element: <Success />,
        // },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
