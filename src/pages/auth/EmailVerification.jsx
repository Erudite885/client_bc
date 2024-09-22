import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { verifyEmail } from '../../api/Auth';
import { Button } from '../../components/Button/Button';

const EmailVerification = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      const verifyUserEmail = async () => {
        try {
          await verifyEmail(token);
          setMessage('Email verified successfully! Redirecting to login...');
          setTimeout(() => {
            navigate('/login');
          }, 5000);
        } catch (error) {
          setError('Email verification failed. The link may have expired.');
        }
      };
      verifyUserEmail();
    } else {
      setError('Invalid or missing verification token.');
    }
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {message && <p className="text-green-500 mb-4">{message}</p>}
      </div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
          <h2 className="text-2xl font-bold mb-6">Verify Your Email</h2>
          <p className="text-lg mb-4">
            A verification link has been sent to your email address. Please check your inbox.
          </p>
          <Button
            // onClick={handleResend}
            variant="primary">
            Resend Verification Email
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification

// <Carousel
//             autoplay
//             autoplaySpeed={5000}
//             dots
//             animationDuration={1000}
//             arrows={false}
//             className="carousel-container"
//           >
//             {carouselItems.map((item, index) => (
//               <div key={index} className="w-full h-full flex items-center justify-center">
//                 {item.type === "image" && (
//                   <img src={item.src} alt={`Slide ${index + 1}`} className="object-cover w-full h-full" />
//                 )}
//                 {item.type === "video" && <video src={item.src} controls className="object-cover w-full h-full" />}
//               </div>
//             ))}
//           </Carousel>