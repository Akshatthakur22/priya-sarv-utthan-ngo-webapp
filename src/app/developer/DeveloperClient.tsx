"use client";

import { motion } from "framer-motion";
import Image from 'next/image';
import Link from 'next/link';
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  Code,
  Users,
  Star,
  Award,
  ArrowRight,
  MapPin,
  ExternalLink,
  Shield,
  FileText,
  Calculator,
} from "lucide-react";

export default function DeveloperClient() {
  return (
    <main className="min-h-screen bg-neutral-50 py-14 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-neutral-200"
      >
        {/* ======================= 1. HERO ======================= */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mx-auto rounded-full overflow-hidden border border-neutral-200 shadow-xl w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56"
          >
            <Image
              src="/images/akki.png"
              alt="Akshat Thakur"
              priority
              width={224}
              height={224}
              className="w-full h-full object-cover"
            />
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 mt-6">
            Akshat Thakur
          </h1>

          <p className="text-lg md:text-xl text-neutral-600 mt-2 font-medium">
            Software Developer & Platform Builder
          </p>

          <div className="flex justify-center gap-3 mt-6 flex-wrap">
            <span className="px-4 py-2 bg-neutral-100 text-neutral-700 rounded-full text-sm font-medium border border-neutral-300">
              Full-Stack Developer
            </span>
            <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium border border-green-200">
              Available for Projects
            </span>
          </div>
        </div>
<br />
        {/* ======================= 2. STATS ======================= */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {[
            { icon: <Code className="w-5 h-5" />, label: "Projects", value: "10+" },
            { icon: <Users className="w-5 h-5" />, label: "Clients", value: "5+" },
            { icon: <Star className="w-5 h-5" />, label: "Experience", value: "2+ Years" },
            { icon: <Award className="w-5 h-5" />, label: "Awards", value: "3+" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 + index * 0.1 }}
              className="
                flex flex-col items-center justify-center 
                bg-white border border-neutral-200 rounded-2xl p-6 
                shadow-sm hover:shadow-md transition-all duration-300
              "
            >
              <div className="text-neutral-700 mb-2">{stat.icon}</div>
              <p className="text-2xl font-bold text-neutral-900">{stat.value}</p>
              <p className="text-sm text-neutral-500 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
        <br />

        {/* ======================= 3. BIO (ADIS COMPLIANT) ======================= */}
        <section className="space-y-6 mb-20">
          <div className="bg-blue-50 rounded-2xl p-8 border border-blue-200 shadow-sm">
            <h2 className="text-xl font-bold text-blue-900 mb-4">About</h2>
            <p className="text-lg leading-relaxed text-blue-900">
              👋 I'm <strong>Akshat Thakur</strong>, a software developer focused on building scalable web applications, AI-powered products, developer tools, educational platforms, and digital systems that solve real-world problems.
            </p>
          </div>

          <div className="bg-neutral-100 rounded-2xl p-8 border border-neutral-200 shadow-sm">
            <h2 className="text-xl font-bold text-neutral-900 mb-4">My Work</h2>
            <p className="text-lg leading-relaxed text-neutral-800">
              I design and build modern software with an emphasis on <strong>scalability</strong>, <strong>usability</strong>, <strong>maintainability</strong>, <strong>accessibility</strong>, and <strong>performance</strong>. My work spans secure online examination platforms, certificate automation, productivity tools, educational software, developer tooling, and digital infrastructure for non-profit organizations.
            </p>
          </div>

          <div className="bg-amber-50 rounded-2xl p-8 border border-amber-200 shadow-sm">
            <h2 className="text-xl font-bold text-amber-900 mb-4">This Project</h2>
            <p className="text-lg leading-relaxed text-amber-900">
              I designed and built the entire digital platform for <strong>Priya Sarv Utthan Seva Sansthan</strong> — frontend, backend, automation, dashboards, donation systems powered by Razorpay, event management, job applications, legal help forms, and more. This NGO website demonstrates modern web development practices while supporting the organization's mission through reliable, secure, and user-centric software.
            </p>
          </div>
        </section>
<br />
        {/* ======================= 4.5. OFFICIAL PRODUCTS (ADIS) ======================= */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6 text-center">
            Other Projects Created
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* SafeExam */}
            <a
              href="https://safexam.in"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-300 hover:shadow-lg transition-all duration-300 hover:border-purple-500"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-purple-900">SafeExam</h3>
                  <p className="text-sm text-purple-700">AI-powered examination platform</p>
                </div>
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-purple-800 mb-4 text-sm leading-relaxed">
                Secure online examination platform with AI monitoring, certificate automation, and comprehensive analytics.
              </p>
              <div className="flex items-center gap-2 text-purple-700 font-medium group-hover:gap-3 transition-all">
                Visit SafeExam <ExternalLink className="w-4 h-4" />
              </div>
            </a>

            {/* MailMyCertificate */}
            <a
              href="https://mailmycertificate.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-300 hover:shadow-lg transition-all duration-300 hover:border-green-500"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-green-900">MailMyCertificate</h3>
                  <p className="text-sm text-green-700">Certificate generation automation</p>
                </div>
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-green-800 mb-4 text-sm leading-relaxed">
                Automated certificate generation and email delivery platform with customizable templates and batch processing.
              </p>
              <div className="flex items-center gap-2 text-green-700 font-medium group-hover:gap-3 transition-all">
                Visit MailMyCertificate <ExternalLink className="w-4 h-4" />
              </div>
            </a>

            {/* Calcuzy */}
            <a
              href="https://calcuzy.app"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 border border-orange-300 hover:shadow-lg transition-all duration-300 hover:border-orange-500"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-orange-900">Calcuzy</h3>
                  <p className="text-sm text-orange-700">Modern productivity platform</p>
                </div>
                <Calculator className="w-6 h-6 text-orange-600" />
              </div>
              <p className="text-orange-800 mb-4 text-sm leading-relaxed">
                Contemporary calculation and productivity application with advanced features and intuitive interface.
              </p>
              <div className="flex items-center gap-2 text-orange-700 font-medium group-hover:gap-3 transition-all">
                Visit Calcuzy <ExternalLink className="w-4 h-4" />
              </div>
            </a>

            {/* Priya Sarv Utthan */}
            <a
              href="https://priyasarvutthan.org"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6 border border-amber-300 hover:shadow-lg transition-all duration-300 hover:border-amber-500"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-amber-900">Priya Sarv Utthan</h3>
                  <p className="text-sm text-amber-700">NGO digital platform</p>
                </div>
                <Code className="w-6 h-6 text-amber-600" />
              </div>
              <p className="text-amber-800 mb-4 text-sm leading-relaxed">
                Complete digital infrastructure for an NGO supporting women empowerment, child education, and legal aid services.
              </p>
              <div className="flex items-center gap-2 text-amber-700 font-medium group-hover:gap-3 transition-all">
                View Project <ExternalLink className="w-4 h-4" />
              </div>
            </a>
          </div>

          <div className="mt-8 p-6 bg-slate-100 rounded-2xl border border-slate-300 text-center">
            <p className="text-neutral-700 italic">
              All projects created by Akshat Thakur — demonstrating expertise in building scalable, user-centric digital solutions for diverse industries and social impact.
            </p>
          </div>
        </section>
<br />
        {/* ======================= 4. SKILLS ======================= */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 mb-5 text-center">
            Tech Skills
          </h2>

          <div className="flex flex-wrap gap-3 justify-center">
            {[
              "Next.js",
              "React",
              "TypeScript",
              "Node.js",
              "Tailwind CSS",
              "API Development",
              "Database Design",
              "Automation",
              "SEO Optimization",
              "UI/UX Design",
              "Deployment",
            ].map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                className="
                  px-4 py-1.5 bg-white border border-neutral-300 
                  rounded-full text-sm font-medium text-neutral-700
                  hover:border-neutral-500 transition
                "
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </section>
<br />
        {/* ======================= 5. SOCIAL LINKS ======================= */}
        <section className="mb-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* GitHub */}
          <a
            href="https://github.com/Akshatthakur22"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-6 rounded-2xl border border-neutral-200 hover:border-neutral-900 transition-all bg-white shadow-sm hover:shadow-lg"
          >
            <div className="w-14 h-14 rounded-xl bg-neutral-900 flex items-center justify-center">
              <Github className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-neutral-900 text-lg">GitHub</p>
              <p className="text-sm text-neutral-600">View my projects</p>
            </div>
            <ArrowRight className="w-5 h-5 text-neutral-400" />
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/akshatthakur22/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-6 rounded-2xl border border-neutral-200 hover:border-blue-600 transition-all bg-white shadow-sm hover:shadow-lg"
          >
            <div className="w-14 h-14 rounded-xl bg-blue-600 flex items-center justify-center">
              <Linkedin className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-neutral-900 text-lg">LinkedIn</p>
              <p className="text-sm text-neutral-600">Know more about me</p>
            </div>
            <ArrowRight className="w-5 h-5 text-neutral-400" />
          </a>

          {/* Email */}
          <a
            href="mailto:akshatthakur22@gmail.com"
            className="flex items-center gap-4 p-6 rounded-2xl border border-neutral-200 hover:border-orange-500 transition-all bg-white shadow-sm hover:shadow-lg"
          >
            <div className="w-14 h-14 rounded-xl bg-orange-500 flex items-center justify-center">
              <Mail className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-neutral-900 text-lg">Email</p>
              <p className="text-sm text-neutral-600">Get in touch</p>
            </div>
            <ArrowRight className="w-5 h-5 text-neutral-400" />
          </a>
        </section>
<br />
        {/* ======================= 6. CONTACT ======================= */}
        <section className="bg-neutral-100 rounded-2xl p-6 border border-neutral-200 mb-14">
          <h3 className="text-xl font-bold text-neutral-800 mb-4 text-center">
            Let's Connect
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-neutral-700" />
              <span className="text-neutral-800">
                akshatthakur22@gmail.com
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-neutral-700" />
              <span className="text-neutral-800">+91 9755533614</span>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-neutral-700" />
              <span className="text-neutral-800">Indore, India</span>
            </div>

            <div className="flex items-center gap-3">
              <Code className="w-5 h-5 text-neutral-700" />
              <span className="text-neutral-800">Available Worldwide</span>
            </div>
          </div>
        </section>

        {/* ======================= 7. SIGNATURE ======================= */}
        <div className="text-center mt-10">
          <p className="font-semibold text-neutral-700 text-lg italic">
            — Crafted with passion by Akshat Thakur
          </p>
        </div>

        <div className="mt-4 text-center text-sm text-neutral-500">
          <p>This page is part of the developer transparency & portfolio initiative.</p>
        </div>
      </motion.div>
    </main>
  );
}
