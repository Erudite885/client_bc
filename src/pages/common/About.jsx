import React from "react";
import { motion } from "framer-motion";

import cardbg1 from "../../assets/cardbg_1.svg";
import cardbg2 from "../../assets/cardbg_2.svg";
import join_us from "../../assets/join_us.jpg";
import mission from "../../assets/mission2.jpg";
import vision from "../../assets/6images.jpeg";
import { images, teamMembers } from "../../constants/data";

export function About() {

 

  return (
    <>

      {/* Section 2: Mission and Stats */}
      <section className="flex flex-col relative md:flex-row items-center justify-between max-w-6xl mx-auto py-16 px-4 md:px-8 mt-16">
        <div className="absolute top-0 left-0 w-full h-full">
          <img src={cardbg1} alt="Background" className="absolute top-0 left-0 w-auto h-auto" />
          <img src={cardbg2} alt="Background" className="absolute bottom-0 right-0 w-auto h-auto" />
        </div>
        {/* Left Side - Mission Content */}
        <div className="md:w-1/2 md:pr-8">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-gray-900 mb-6"
          >
            Our mission
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-600 mb-6"
          >
            At Brand Collaborator, our mission is to empower brands and creators by providing a dynamic and
            user-friendly platform where they can collaborate on impactful projects. We strive to create a space where
            creativity meets opportunity, delivering high-quality content that resonates with audiences and drives
            results.
          </motion.p>
        </div>

        {/* Right Side - Stats */}
        <motion.div
          className="md:w-1/2 mt-10 md:mt-0 space-y-8 md:pl-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="">
            <img src={mission} alt="Team working on the beach" className="rounded-lg shadow-lg w-full object-cover" />
          </div>
        </motion.div>
      </section>

      {/* Section : Vision and Stats */}
      <section className="flex flex-col relative md:flex-row items-center justify-between max-w-6xl mx-auto py-16 px-4 md:px-8">
        {/* Left Side - Vision Content */}

        <motion.div
          className="md:w-1/2 mt-10 md:mt-0 space-y-8 md:pl-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="">
            <img src={vision} alt="Team working on the beach" className="rounded-lg shadow-lg w-full object-cover" />
          </div>
        </motion.div>

        {/* Right Side  */}
        <div className="md:w-1/2 md:px-8">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-gray-900 mb-6"
          >
            Our vision
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-600 mb-6"
          >
            <span className="font-bold text-xl">• Integrity:</span> We are committed to honesty and transparency in all
            our dealings. We believe in fostering trust and building long-lasting relationships with our users.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-600 mb-6"
          >
            <span className="font-bold text-xl">• Creativity:</span> We celebrate the power of creativity and its
            ability to transform ideas into reality. Our platform is dedicated to nurturing and showcasing creative
            talents.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-600 mb-6"
          >
            <span className="font-bold text-xl"> • Collaboration:</span> We believe in the power of collaboration. By
            bringing together brands and creators, we help both parties achieve their goals through mutual success.
          </motion.p>
        </div>
      </section>

      {/*  */}
      <section className="max-w-6xl mx-auto py-16 px-4 md:px-8">
        <div className="text-start">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our team</h2>
          {/* <p className="text-lg text-gray-600 mb-12">
            Sit facilis neque ab nulla vel. Cum eos in laudantium. Temporibus eos totam in dolorum. Nemo vel facere
            repellendus ut eos dolores similique.
          </p> */}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: index * 0.4 }}
            >
              <img
                className="mx-auto h-24 w-24 rounded-full object-cover shadow-lg"
                src={member.imageUrl}
                alt={member.name}
              />
              <h3 className="mt-4 text-xl font-bold text-gray-900">{member.name}</h3>
              <p className="mt-1 text-gray-600">{member.role}</p>
            </motion.div>
            // <Card className='bg-blue-100' key={index} image={member.imageUrl} title={member.name} description={member.role} />
          ))}
        </div>
      </section>

      {/*  */}
      <section className="bg-gradient-to-br from-darkBlue via-midLightBlue to-lightBlue py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-midLightBlue via-darkBlue to-gray-700 rounded-2xl p-10 md:p-16 flex flex-col md:flex-row items-center">
            {/* Image Section */}
            <div className="md:w-1/2">
              <img src={join_us} alt="Team working on the beach" className="rounded-lg shadow-lg w-full object-cover" />
            </div>

            {/* Text Section */}
            <div className="md:w-1/2 md:pl-16 mt-10 md:mt-0 text-lavender">
              <h2 className="text-4xl font-bold mb-6">Join us</h2>
              <p className="text-lg mb-6">
                Whether you’re a brand looking to elevate your content or a creator seeking new opportunities, Brand
                Collaborator is the platform for you. Join us today and be part of a community where creativity meets
                collaboration.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-blue-900 flex-shrink-0 mr-3" fill="white" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-10.707a1 1 0 00-1.414-1.414L9 9.586 7.707 8.293a1 1 0 10-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Curated Talent Pool
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-blue-900 flex-shrink-0 mr-3" fill="white" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-10.707a1 1 0 00-1.414-1.414L9 9.586 7.707 8.293a1 1 0 10-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Dedicated Support
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-blue-900 flex-shrink-0 mr-3" fill="white" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-10.707a1 1 0 00-1.414-1.414L9 9.586 7.707 8.293a1 1 0 10-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  User-Friendly Platform
                </li>
              </ul>
              <div className="mt-8">
                <a href="/get-started" className="text-blue-400 hover:text-blue-800 text-lg font-medium hover:bg-gray-200 rounded p-4">
                  Get Started &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
