import React from "react";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const slideIn = {
  hidden: { x: -50, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

export const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <motion.div
        className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="text-3xl font-bold mb-6"
          initial="hidden"
          animate="visible"
          variants={slideIn}
          transition={{ duration: 0.5 }}
        >
          Privacy Policy
        </motion.h1>
        <motion.p
          className="mb-4"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Brand Collaborator ("we," "our," or "us") respects your privacy and is committed to protecting your personal
          data. This Privacy Policy explains how we collect, use, share, and safeguard your information when you
          interact with our platform, including our website and services. Please read this policy carefully to
          understand our practices regarding your personal data.
        </motion.p>
        <motion.h2
          className="text-2xl font-semibold mb-4"
          initial="hidden"
          animate="visible"
          variants={slideIn}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          1. Information We Collect
        </motion.h2>
        <motion.ul
          className="list-disc list-inside mb-4"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <li>
            <strong>Personal Information:</strong> This includes your name, email address, phone number, payment
            information, and other details you provide when signing up for our services.
          </li>
          <li>
            <strong>Profile Information:</strong> Details about your professional experience, skills, and portfolio as a
            content creator or freelancer.
          </li>
          <li>
            <strong>Usage Data:</strong> Information about how you use our website, such as your IP address, browser
            type, pages viewed, and the date and time of your visit.
          </li>
          <li>
            <strong>Cookies:</strong> Small data files stored on your device to enhance user experience, track usage
            patterns, and provide personalized content. See our Cookie Policy for more details.
          </li>
        </motion.ul>

        <motion.h2
          className="text-2xl font-semibold mb-4"
          initial="hidden"
          animate="visible"
          variants={slideIn}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          2. How We Use Your Information
        </motion.h2>
        <motion.ul
          className="list-disc list-inside mb-4"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <li>
            <strong>Service Provision:</strong> To create and manage your account, process payments, and facilitate
            transactions between content creators, freelancers, and brands.
          </li>
          <li>
            <strong>Communication:</strong> To contact you regarding your account, provide customer support, send
            updates, and respond to your inquiries.
          </li>
          <li>
            <strong>Personalization:</strong> To tailor content and services according to your preferences and improve
            your experience on our platform.
          </li>
          <li>
            <strong>Marketing:</strong> To send you promotional materials, offers, and newsletters, provided you have
            opted in to receive such communications.
          </li>
          <li>
            <strong>Legal Compliance:</strong> To comply with legal obligations, resolve disputes, enforce our
            agreements, and protect our rights and the rights of others.
          </li>
        </motion.ul>

        <motion.h2
          className="text-2xl font-semibold mb-4"
          initial="hidden"
          animate="visible"
          variants={slideIn}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          3. How We Share Your Information
        </motion.h2>
        <motion.ul
          className="list-disc list-inside mb-4"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5, delay: 1.4 }}
        >
          <li>
            <strong>Brands:</strong> When you participate in projects or collaborations, we may share relevant details
            with the brand you are working with.
          </li>
          <li>
            <strong>Service Providers:</strong> Third-party vendors who assist in providing our services, such as
            payment processors, hosting services, and marketing partners.
          </li>
          <li>
            <strong>Legal Authorities:</strong> If required by law, we may disclose your information to government
            authorities or other parties in response to legal processes or to protect our rights.
          </li>
          <li>
            <strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your
            information may be transferred to the new owner.
          </li>
        </motion.ul>

        <motion.h2
          className="text-2xl font-semibold mb-4"
          initial="hidden"
          animate="visible"
          variants={slideIn}
          transition={{ duration: 0.5, delay: 1.6 }}
        >
          4. Data Security
        </motion.h2>
        <motion.p
          className="mb-4"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5, delay: 1.8 }}
        >
          We take appropriate security measures to protect your personal data from unauthorized access, alteration,
          disclosure, or destruction. However, no internet-based service is completely secure, and we cannot guarantee
          absolute security.
        </motion.p>

        <motion.h2
          className="text-2xl font-semibold mb-4"
          initial="hidden"
          animate="visible"
          variants={slideIn}
          transition={{ duration: 0.5, delay: 2 }}
        >
          5. Your Rights
        </motion.h2>
        <motion.ul
          className="list-disc list-inside mb-4"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5, delay: 2.2 }}
        >
          <li>
            <strong>Access:</strong> Request access to the personal data we hold about you.
          </li>
          <li>
            <strong>Correction:</strong> Request correction of inaccurate or incomplete personal data.
          </li>
          <li>
            <strong>Deletion:</strong> Request deletion of your personal data, subject to certain exceptions.
          </li>
          <li>
            <strong>Opt-Out:</strong> Opt out of receiving marketing communications from us at any time by following the
            unsubscribe link in our emails or contacting us directly.
          </li>
          <li>
            <strong>Data Portability:</strong> Request a copy of your personal data in a structured, commonly used
            format.
          </li>
        </motion.ul>
        <motion.p
          className="mb-4"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5, delay: 2.4 }}
        >
          To exercise these rights, please contact us at [Insert Contact Information].
        </motion.p>

        <motion.h2
          className="text-2xl font-semibold mb-4"
          initial="hidden"
          animate="visible"
          variants={slideIn}
          transition={{ duration: 0.5, delay: 2.6 }}
        >
          6. Retention of Data
        </motion.h2>
        <motion.p
          className="mb-4"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5, delay: 2.8 }}
        >
          We retain your personal data only as long as necessary to fulfill the purposes outlined in this Privacy
          Policy, comply with legal obligations, resolve disputes, and enforce our agreements. When your data is no
          longer required, we will securely delete or anonymize it.
        </motion.p>

        <motion.h2
          className="text-2xl font-semibold mb-4"
          initial="hidden"
          animate="visible"
          variants={slideIn}
          transition={{ duration: 0.5, delay: 3 }}
        >
          7. Cookies and Tracking Technologies
        </motion.h2>
        <motion.p
          className="mb-4"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5, delay: 3.2 }}
        >
          We use cookies and similar tracking technologies to enhance your experience on our platform. Cookies help us
          understand user behavior, personalize content, and track the effectiveness of our marketing campaigns. You can
          manage your cookie preferences through your browser settings. For more information, please refer to our Cookie
          Policy.
        </motion.p>

        <motion.h2
          className="text-2xl font-semibold mb-4"
          initial="hidden"
          animate="visible"
          variants={slideIn}
          transition={{ duration: 0.5, delay: 3.4 }}
        >
          8. Third-Party Links
        </motion.h2>
        <motion.p
          className="mb-4"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5, delay: 3.6 }}
        >
          Our platform may contain links to third-party websites or services. We are not responsible for the privacy
          practices or content of those third-party sites. We encourage you to review their privacy policies before
          providing any personal information.
        </motion.p>

        <motion.h2
          className="text-2xl font-semibold mb-4"
          initial="hidden"
          animate="visible"
          variants={slideIn}
          transition={{ duration: 0.5, delay: 3.8 }}
        >
          9. Changes to This Privacy Policy
        </motion.h2>
        <motion.p
          className="mb-4"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5, delay: 4 }}
        >
          We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements.
          We will notify you of any significant changes by posting the updated policy on our website with the effective
          date. Your continued use of our platform after the changes take effect constitutes your acceptance of the
          revised Privacy Policy.
        </motion.p>
      </motion.div>
    </div>
  );
};

