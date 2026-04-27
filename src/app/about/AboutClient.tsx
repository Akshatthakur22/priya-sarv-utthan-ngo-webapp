"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Building2, Users, Heart, Scale, GraduationCap, Home, Award, FileCheck, Shield, ChevronRight, User, Star } from "lucide-react";
import { triggerHaptic } from "@/utils/haptics";

// Static image array to prevent hydration issues
const staticGalleryImages = [
  { src: "/images/random.png", alt: "Community gathering" },
  { src: "/images/child2.png", alt: "Children learning" },
  { src: "/images/woman3.png", alt: "Women empowerment" },
  { src: "/images/achivement.png", alt: "Achievement award ceremony" }
];


// City data with Jabalpur having local contact info
const cities = [
  {
    id: "indore",
    name: "Indore",
    nameHi: "इंदौर",
    type: "Headquarters",
    typeHi: "मुख्यालय",
    icon: Building2,
    color: "from-orange-500 to-amber-500",
    description: "Our main administrative office and the heart of our operations since 1999.",
    projects: [
      { name: "Gandhi Nagar Community Center", desc: "Women empowerment & skill development hub", featured: true },
      { name: "Legal Aid Cell", desc: "Free legal assistance for underprivileged families" },
      { name: "Sanskar Shiksha Kendra", desc: "Education support for marginalized children" }
    ],
    address: "Gandhi Nagar, Indore, Madhya Pradesh",
    image: "/images/child6.png",
    localContact: null
  },
  {
    id: "ujjain",
    name: "Ujjain",
    nameHi: "उज्जैन",
    type: "Outreach Center",
    typeHi: "आउटरीच केंद्र",
    icon: Users,
    color: "from-blue-500 to-indigo-500",
    description: "Grassroots outreach and community programs in the historic city of Ujjain.",
    projects: [
      { name: "Community Welfare Hub", desc: "Coordinating welfare initiatives across the region", featured: true },
      { name: "Women's Self-Help Groups", desc: "Financial literacy and micro-enterprise support" }
    ],
    address: "62 Shivdham Colony, Hamukhedi, Dewas Road, Ujjain, Madhya Pradesh",
    image: "/images/child2.png",
    localContact: {
      name: "Smt. Jyoti Mandal",
      nameHi: "श्रीमती ज्योति मंडल",
      role: "Division In-Charge",
      roleHi: "उज्जैन संभाग प्रभारी",
      phone: "8770669350",
      message: "उज्जैन संभाग प्रभारी श्रीमती ज्योति मंडल"
    }
  }
];

const stats = [
  { value: "27+", label: "Years of Service", labelHi: "वर्षों की सेवा" },
  { value: "2", label: "Cities", labelHi: "शहर" },
  { value: "50,000+", label: "Lives Impacted", labelHi: "प्रभावित जीवन" },
  { value: "100+", label: "Active Programs", labelHi: "सक्रिय कार्यक्रम" }
];

const certificates = [
  { name: "80G Certificate", icon: FileCheck, status: "Verified" },
  { name: "12A Registration", icon: Shield, status: "Verified" },
  { name: "NGO Darpan", icon: Award, status: "Registered" }
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { type: "spring" as const, stiffness: 100, damping: 15 }
  }
};

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0
  })
};

export default function AboutClient() {
  const [activeCity, setActiveCity] = useState("indore");
  const [direction, setDirection] = useState(0);
  const activeCityData = cities.find(c => c.id === activeCity)!;
  const currentIndex = cities.findIndex(c => c.id === activeCity);

  const handleCityChange = (cityId: string) => {
    const newIndex = cities.findIndex(c => c.id === cityId);
    setDirection(newIndex > currentIndex ? 1 : -1);
    setActiveCity(cityId);
  };

  const handleContactClick = () => {
    triggerHaptic(50);
  };

  return (
    <>
      {/* Hero Section */}
      <div className="relative h-[55vh] min-h-[420px] overflow-hidden">
        <Image
          src="/images/child6.png"
          alt="About Priya Sarv Utthan Seva Sansthan"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-orange-500/20 backdrop-blur-sm px-5 py-2 text-sm font-semibold text-orange-200 border border-orange-400/30 mb-4">
            <Award className="w-4 h-4" />
            Registered NGO ID: IND 4124/99
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 max-w-4xl">
            प्रिया सर्व उत्थान सेवा संस्थान
          </h1>
          <p className="text-lg sm:text-xl text-orange-200 font-medium mb-2">
            Priya Sarv Utthan Seva Sansthan
          </p>
          <p className="text-base sm:text-lg text-white/80 max-w-2xl mb-6">
            Empowering communities across Madhya Pradesh since 1999
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="/team"
              className="inline-flex items-center gap-2 bg-white text-orange-600 font-bold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              Meet Our Team
              <ChevronRight className="w-4 h-4" />
            </a>
            <a
              href="tel:+919806502882"
              onClick={handleContactClick}
              className="inline-flex items-center gap-2 bg-orange-500/20 backdrop-blur-sm text-white font-semibold px-6 py-3 rounded-full border border-orange-400/30 hover:bg-orange-500/30 transition-all"
            >
              <Phone className="w-4 h-4" />
              Contact Founder
            </a>
          </div>
        </motion.div>
      </div>

      {/* Stats Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
        className="bg-gradient-to-r from-orange-500 to-amber-500 py-8 sm:py-10"
        style={{ opacity: 1 }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="text-center text-white"
              >
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm sm:text-base opacity-90">{stat.label}</div>
                <div className="text-xs opacity-75">{stat.labelHi}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Global Leadership Section - Founder & President */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={scaleIn}
        className="bg-surface-cream py-16 md:py-20"
        style={{ opacity: 1 }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <motion.span 
              variants={fadeInUp}
              className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700 border border-orange-200 mb-4"
            >
              <Star className="w-4 h-4" />
              Global Leadership • वैश्विक नेतृत्व
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-2">
              Founder
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-orange-600 text-lg font-medium">
              संस्थापक
            </motion.p>
          </div>

          <motion.div
            variants={scaleIn}
            className="bg-gradient-to-br from-teal-900 via-emerald-900 to-teal-950 rounded-[3rem] p-6 sm:p-10 md:p-12 ring-1 ring-emerald-400/20 shadow-2xl"
          >
            <div className="grid md:grid-cols-[280px_1fr] gap-8 items-center">
              <div className="relative mx-auto md:mx-0">
                <motion.a
                  href="/founder"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="block aspect-square w-64 md:w-full rounded-[2.5rem] bg-gradient-to-br from-emerald-400 to-teal-500 p-1 shadow-2xl shadow-emerald-500/20"
                >
                  <div className="w-full h-full rounded-[2.25rem] bg-teal-950/80 overflow-hidden flex items-center justify-center">
                    <Image
                      src="/images/founder_aboutpage.png"
                      alt="Founder Photo"
                      className="object-cover w-full h-full rounded-[2.25rem]"
                      width={256}
                      height={256}
                    />
                  </div>
                </motion.a>
                <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl shadow-lg px-4 py-2">
                  <p className="text-xs text-emerald-100">Since 1999</p>
                  <p className="text-sm font-bold text-white">27+ Years</p>
                </div>
              </div>

              <div className="space-y-6 text-center md:text-left">
                <div>
                  <h3 className="text-3xl sm:text-4xl font-bold text-white mb-1">Jagdish Jadhav</h3>
                  <p className="text-emerald-400 font-semibold text-lg">जगदीश जाधव</p>
                  <p className="text-emerald-200/70 mt-1">Founder & President • संस्थापक एवं अध्यक्ष</p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-emerald-400 font-semibold uppercase tracking-wide">
                    संस्थापक का संदेश • Founder&apos;s Message
                  </p>
                  <blockquote className="relative">
                    <div className="absolute -top-2 -left-2 text-5xl text-emerald-500/30 font-serif">&ldquo;</div>
                    <p className="text-emerald-100/90 italic text-lg leading-relaxed pl-6 pr-2">
                      Building a self-reliant society through compassion and collective action since 1999. Every individual deserves dignity, opportunity, and the chance to thrive.
                    </p>
                    <div className="absolute -bottom-4 right-0 text-5xl text-emerald-500/30 font-serif">&rdquo;</div>
                  </blockquote>
                </div>

                <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
                  <a
                    href="tel:+919806502882"
                    onClick={handleContactClick}
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold px-6 py-4 rounded-2xl shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:scale-105 transition-all"
                  >
                    <Phone className="w-5 h-5" />
                    <span>
                      <span className="block text-xs opacity-80">Contact Founder</span>
                      <span className="text-lg">+91 9977177059</span>
                    </span>
                  </a>
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-white/10 text-white font-semibold px-6 py-4 rounded-2xl ring-1 ring-white/20 hover:bg-white/20 transition-all"
                  >
                    Send Message
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 space-y-16">
        
        {/* Mission Vision Values */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="space-y-8"
        >
          <div className="text-center space-y-2">
            <motion.p variants={fadeInUp} className="text-sm font-semibold text-orange-600 uppercase tracking-wide">
              Who We Are • हम कौन हैं
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold text-neutral-900">
              Our Foundation
            </motion.h2>
          </div>

          <motion.div variants={staggerContainer} className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Mission",
                titleHi: "हमारा उद्देश्य",
                icon: Heart,
                content: "To empower women, children, and the elderly through education, skill development, legal aid, and social justice initiatives that create lasting community impact across Madhya Pradesh."
              },
              {
                title: "Vision",
                titleHi: "हमारी दृष्टि",
                icon: GraduationCap,
                content: "A society where every individual—regardless of age, gender, or background—has equal access to opportunities, education, healthcare, and the means to live with dignity and self-reliance."
              },
              {
                title: "Values",
                titleHi: "हमारे मूल्य",
                icon: Scale,
                content: "We uphold transparency, community participation, dignity for all, and sustainable development. Every program we run is accountable, inclusive, and designed for long-term empowerment."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="bg-white rounded-[2rem] p-6 shadow-lg ring-1 ring-neutral-100 hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-1">{item.title}</h3>
                <p className="text-sm text-orange-600 font-medium mb-3">{item.titleHi}</p>
                <p className="text-neutral-600 text-sm leading-relaxed">{item.content}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Multi-City Presence - Interactive Switcher */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="space-y-8"
        >
          <div className="text-center space-y-2">
            <motion.p variants={fadeInUp} className="text-sm font-semibold text-orange-600 uppercase tracking-wide">
              Our Presence • हमारी उपस्थिति
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold text-neutral-900">
              Serving Across Madhya Pradesh
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-neutral-600 max-w-2xl mx-auto">
              From our headquarters in Indore to branches in Jabalpur and Bhopal, we&apos;re expanding our reach to serve more communities.
            </motion.p>
          </div>

          {/* City Tabs - Mobile Horizontal Scroll */}
          <motion.div variants={fadeInUp} className="sticky top-16 z-20 bg-white/95 backdrop-blur-sm py-4 -mx-4 px-4 md:static md:bg-transparent md:backdrop-blur-none">
            <div className="flex gap-2 overflow-x-auto pb-2 md:justify-center scrollbar-hide">
              {cities.map((city) => {
                const Icon = city.icon;
                const isActive = activeCity === city.id;
                return (
                  <motion.button
                    key={city.id}
                    onClick={() => handleCityChange(city.id)}
                    layout
                    className={`flex-shrink-0 flex items-center gap-2 px-5 py-3 rounded-full font-semibold transition-all ${
                      isActive
                        ? `bg-gradient-to-r ${city.color} text-white shadow-lg`
                        : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{city.name}</span>
                    <span className="text-xs opacity-75">({city.nameHi})</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Active City Card with Slide Animation */}
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeCity}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring" as const, stiffness: 300, damping: 30 }}
                className="bg-white rounded-[3rem] shadow-xl ring-1 ring-neutral-100 overflow-hidden"
              >
                <div className="grid md:grid-cols-2">
                  <div className="relative h-64 md:h-auto min-h-[300px]">
                    <Image
                      src={activeCityData.image}
                      alt={activeCityData.name}
                      fill
                      className="object-cover"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-r ${activeCityData.color} opacity-20`} />
                  </div>
                  <div className="p-6 sm:p-8 md:p-10 space-y-6">
                    <div>
                      <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r ${activeCityData.color} text-white text-sm font-semibold mb-3`}>
                        <activeCityData.icon className="w-4 h-4" />
                        {activeCityData.type} • {activeCityData.typeHi}
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900">
                        {activeCityData.name} <span className="text-orange-600">({activeCityData.nameHi})</span>
                      </h3>
                      <p className="text-neutral-600 mt-2">{activeCityData.description}</p>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-sm font-bold text-neutral-900 uppercase tracking-wide">Key Projects • प्रमुख परियोजनाएं</h4>
                      {activeCityData.projects.map((project, i) => (
                        <div key={i} className={`rounded-2xl p-4 ${project.featured ? 'bg-gradient-to-r from-orange-50 to-amber-50 ring-1 ring-orange-200' : 'bg-neutral-50'}`}>
                          <div className="flex items-start gap-2">
                            {project.featured && <Star className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />}
                            <div>
                              <p className="font-semibold text-neutral-900">{project.name}</p>
                              <p className="text-sm text-neutral-600">{project.desc}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-start gap-3 text-sm text-neutral-600">
                      <MapPin className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                      <span>{activeCityData.address}</span>
                    </div>

                    {/* Local Contact Card for Jabalpur */}
                    {activeCityData.localContact && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-5 ring-1 ring-emerald-200"
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
                            <User className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="text-xs text-emerald-600 font-semibold uppercase tracking-wide">Local Contact • स्थानीय संपर्क</p>
                          </div>
                        </div>
                        <h5 className="text-lg font-bold text-neutral-900">{activeCityData.localContact.name}</h5>
                        <p className="text-sm text-emerald-700 font-medium">{activeCityData.localContact.nameHi} • {activeCityData.localContact.roleHi}</p>
                        <p className="text-xs text-neutral-600 mt-1 mb-3">{activeCityData.localContact.message}</p>
                        <a
                          href={`tel:${activeCityData.localContact.phone}`}
                          onClick={handleContactClick}
                          className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold px-5 py-3 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all"
                        >
                          <Phone className="w-4 h-4" />
                          <span>
                            <span className="block text-xs opacity-80">Contact {activeCityData.localContact.role}</span>
                            <span>{activeCityData.localContact.phone}</span>
                          </span>
                        </a>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.section>

        {/* Transparency Badges */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="space-y-8"
        >
          <div className="text-center space-y-2">
            <motion.p variants={fadeInUp} className="text-sm font-semibold text-orange-600 uppercase tracking-wide">
              Transparency • पारदर्शिता
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold text-neutral-900">
              Verified & Registered
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-neutral-600">
              We maintain complete transparency with all legal certifications
            </motion.p>
          </div>

          <motion.div variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {certificates.map((cert, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="bg-white rounded-[2rem] p-6 shadow-lg ring-1 ring-neutral-100 text-center hover:shadow-xl transition-shadow"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mx-auto mb-4">
                  <cert.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-neutral-900 mb-1">{cert.name}</h3>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                  ✓ {cert.status}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Our Approach */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
          className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-[3rem] p-8 sm:p-12 text-white text-center"
          style={{ opacity: 1 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Our Approach • हमारा दृष्टिकोण</h2>
          <p className="text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
            With over two decades of experience serving Madhya Pradesh, we work closely with local residents to understand their needs. Our programs are practical, accessible, and sustainable—empowering individuals with skills, legal support, elderly care, and self-employment pathways. We believe in grassroots change, driven by the community, for the community.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/donate"
              className="inline-flex items-center gap-2 bg-white text-orange-600 font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              <Heart className="w-5 h-5" />
              Support Our Cause
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-full border border-white/30 hover:bg-white/30 transition-all"
            >
              Get In Touch
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </motion.section>

        {/* Image Gallery */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="space-y-6"
          style={{ opacity: 1 }}
        >
          <div className="text-center">
            <motion.h2 variants={fadeInUp} className="text-2xl sm:text-3xl font-bold text-neutral-900">
              Our Work in Action • हमारा कार्य
            </motion.h2>
          </div>
          <motion.div variants={staggerContainer} className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { src: "/images/random.png", alt: "Community gathering" },
              { src: "/images/child2.png", alt: "Children learning" },
              { src: "/images/woman3.png", alt: "Women empowerment" },
              { src: "/images/child5.png", alt: "Education program" }
            ].map((img, i) => (
              <motion.div
                key={`gallery-${i}-${img.src}`}
                variants={fadeInUp}
                className="relative aspect-square rounded-[2rem] overflow-hidden shadow-lg group"
                suppressHydrationWarning
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <p className="text-white text-sm font-medium">{img.alt}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
      </div>
    </>
  );
}
