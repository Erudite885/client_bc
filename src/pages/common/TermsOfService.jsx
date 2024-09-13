// src/pages/Common/TermsOfService.js
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const slideIn = {
  hidden: { x: -50, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

export const TermsOfService = () => {
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
          Terms and Conditions for Brand Collaborator
        </motion.h1>
        <motion.h2
          className="text-2xl font-semibold mb-4"
          initial="hidden"
          animate="visible"
          variants={slideIn}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          1. Introduction
        </motion.h2>
        <motion.p
          className="mb-4"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Welcome to Brand Collaborator. These Terms and Conditions ("T&C") govern your use of the Brand Collaborator
          platform and services provided by "Brand Collaborator," "we," "us," or "our"). By accessing or using our
          services, you agree to comply with these T&C and any other policies or guidelines referenced herein. If you do
          not agree with these terms, please do not use our platform.
        </motion.p>

        <motion.h2
          className="text-2xl font-semibold mb-4"
          initial="hidden"
          animate="visible"
          variants={slideIn}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          2. Services Provided
        </motion.h2>
        <motion.p
          className="mb-4"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          Brand Collaborator is a platform that connects content creators, influencers, and freelancers with brands
          seeking to collaborate on marketing and promotional activities. Our services include facilitating
          introductions, managing collaborations, and processing payments between parties.
        </motion.p>

        <motion.h2
          className="text-2xl font-semibold mb-4"
          initial="hidden"
          animate="visible"
          variants={slideIn}
          transition={{ duration: 0.5, delay: 1 }}
        >
          3. User Eligibility
        </motion.h2>
        <motion.p
          className="mb-4"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          You must be at least 18 years old to use Brand Collaborator. If you are under 18, please review these T&C with
          a parent or guardian.
        </motion.p>

        <motion.h2
          className="text-2xl font-semibold mb-4"
          initial="hidden"
          animate="visible"
          variants={slideIn}
          transition={{ duration: 0.5, delay: 1.4 }}
        >
          4. Platform License
        </motion.h2>
        <motion.p
          className="mb-4"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5, delay: 1.6 }}
        >
          <strong>4.1 Grant of License:</strong> Brand Collaborator grants you a non-exclusive, non-transferable license
          to access and use our platform solely for its intended purpose.
        </motion.p>
        <motion.p
          className="mb-4"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5, delay: 1.8 }}
        >
          <strong>4.2 Restrictions:</strong> You may not sublicense, transfer, or assign your rights to use the
          platform. You must adhere to all usage guidelines and requirements communicated by Brand Collaborator.
        </motion.p>

        <motion.h2
          className="text-2xl font-semibold mb-4"
          initial="hidden"
          animate="visible"
          variants={slideIn}
          transition={{ duration: 0.5, delay: 2 }}
        >
          5. User Responsibilities
        </motion.h2>
        <motion.p
          className="mb-4"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5, delay: 2.2 }}
        >
          <strong>5.1 Compliance:</strong> You agree to comply with all applicable laws, regulations, and policies when
          using our platform.
        </motion.p>
        <motion.p
          className="mb-4"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5, delay: 2.4 }}
        >
          <strong>5.2 Account Information:</strong> You are responsible for maintaining accurate and up-to-date account
          information, including contact details and payment information.
        </motion.p>
        <motion.p
          className="mb-4"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5, delay: 2.6 }}
        >
          <strong>5.3 Security:</strong> You must protect your account credentials and immediately notify us of any
          unauthorized access or use of your account.
        </motion.p>
        <motion.p
          className="mb-4"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5, delay: 2.8 }}
        >
          <strong>5.4 Prohibited Activities:</strong> You may not engage in any activities that could harm our platform
          or its users, including but not limited to:
          <ul className="list-disc list-inside ml-6">
            <li>Using the platform for illegal or unauthorized purposes.</li>
            <li>Attempting to interfere with or disrupt the platform’s operation.</li>
            <li>Engaging in fraudulent or deceptive practices.</li>
          </ul>
        </motion.p>

        <motion.h2
          className="text-2xl font-semibold mb-4"
          initial="hidden"
          animate="visible"
          variants={slideIn}
          transition={{ duration: 0.5, delay: 3 }}
        >
          6. Fees and Payments
        </motion.h2>
        <motion.p
          className="mb-4"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5, delay: 3.2 }}
        >
          <strong>6.1 Fees:</strong> Brand Collaborator charges a sign-up fee of N5,000 for content creators and
          freelancers. Additional fees may apply for specific services or features.
        </motion.p>
        <motion.p
          className="mb-4"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5, delay: 3.4 }}
        >
          <strong>6.2 Commission Rates:</strong>
          <ul className="list-disc list-inside ml-6">
            <li>For freelancers, Brand Collaborator retains 20% of the total project fee as commission.</li>
            <li>For content creators (UGC), Brand Collaborator retains 10% of the total project fee as commission.</li>
          </ul>
        </motion.p>
        <motion.p
          className="mb-4"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5, delay: 3.6 }}
        >
          <strong>6.3 Payment Terms:</strong> Fees are payable in advance and are non-refundable. Payments are processed
          through secure payment methods as described on our platform.
        </motion.p>
        <motion.p
          className="mb-4"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5, delay: 3.8 }}
        >
          <strong>6.4 Payment to Creators and Freelancers:</strong> Brand Collaborator will process payments to content
          creators and freelancers after successful completion of a job, subject to the applicable service fees and
          commission rates.
        </motion.p>

        <motion.h2
          className="text-2xl font-semibold mb-4"
          initial="hidden"
          animate="visible"
          variants={slideIn}
          transition={{ duration: 0.5, delay: 4 }}
        >
          7. Intellectual Property
        </motion.h2>
        <motion.p
          className="mb-4"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5, delay: 4.2 }}
        >
          <strong>7.1 Ownership:</strong> All intellectual property rights in the Brand Collaborator platform and its
          content are owned by us or our licensors.
        </motion.p>
        <motion.p
          className="mb-4"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5, delay: 4.4 }}
        >
          <strong>7.2 Use of Marks:</strong> You may not use our trademarks or service marks without our prior written
          consent.
        </motion.p>

        <motion.h2
          className="text-2xl font-semibold mb-4"
          initial="hidden"
          animate="visible"
          variants={slideIn}
          transition={{ duration: 0.5, delay: 4.6 }}
        >
          8. Termination
        </motion.h2>
        <motion.p
          className="mb-4"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5, delay: 4.8 }}
        >
          <strong>8.1 Termination by You:</strong> You may terminate your account at any time by following the
          instructions provided on our platform.
        </motion.p>
        <motion.p
          className="mb-4"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5, delay: 5 }}
        >
          <strong>8.2 Termination by Us:</strong> We reserve the right to terminate your access to the platform if you
          breach these T&C or engage in any conduct that we deem inappropriate.
        </motion.p>

        <motion.h2
          className="text-2xl font-semibold mb-4"
          initial="hidden"
          animate="visible"
          variants={slideIn}
          transition={{ duration: 0.5, delay: 5.2 }}
        >
          9. Limitation of Liability
        </motion.h2>
        <motion.p
          className="mb-4"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5, delay: 5.4 }}
        >
          <strong>9.1 No Warranty:</strong> Our platform is provided "as is" without any warranties of any kind, either
          express or implied. We do not guarantee that the platform will be error-free or uninterrupted.
        </motion.p>
        <motion.p
          className="mb-4"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5, delay: 5.6 }}
        >
          <strong>9.2 Limitation of Liability:</strong> In no event shall Brand Collaborator be liable for any indirect,
          incidental, consequential, or punitive damages arising out of or in connection with your use of the platform.
        </motion.p>

        <motion.h2
          className="text-2xl font-semibold mb-4"
          initial="hidden"
          animate="visible"
          variants={slideIn}
          transition={{ duration: 0.5, delay: 5.8 }}
        >
          10. Governing Law
        </motion.h2>
        <motion.p
          className="mb-4"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5, delay: 6 }}
        >
          These T&C are governed by and construed in accordance with the laws of Nigeria. Any disputes arising from
          these T&C shall be subject to the exclusive jurisdiction of the courts in Nigeria.
        </motion.p>

        <motion.h2
          className="text-2xl font-semibold mb-4"
          initial="hidden"
          animate="visible"
          variants={slideIn}
          transition={{ duration: 0.5, delay: 6.2 }}
        >
          11. Changes to T&C
        </motion.h2>
        <motion.p
          className="mb-4"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5, delay: 6.4 }}
        >
          Brand Collaborator reserves the right to modify these T&C at any time. We will notify you of any changes by
          posting the revised T&C on our platform. Your continued use of the platform constitutes your acceptance of the
          updated T&C.
        </motion.p>

        <motion.h2
          className="text-2xl font-semibold mb-4"
          initial="hidden"
          animate="visible"
          variants={slideIn}
          transition={{ duration: 0.5, delay: 6.6 }}
        >
          12. Contact Us
        </motion.h2>
        <motion.p
          className="mb-4"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5, delay: 6.8 }}
        >
          For any questions or concerns regarding these T&C, please <Link to="/contact">contact us</Link> at Brand Collaborator.
        </motion.p>
      </motion.div>
    </div>
  );
};
