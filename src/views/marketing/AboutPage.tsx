/**
 * About Page - Stylish & Clean
 * 
 * Modern, visually appealing design with smooth animations,
 * gradients, and clean aesthetics
 */
'use client'

import React from 'react'
import { 
  Users, 
  Award, 
  Clock, 
  Shield, 
  Target, 
  Heart, 
  CheckCircle,
  Star,
  Calendar,
  MapPin,
  Car,
  Droplets,
  Phone,
  Mail,
  Sparkles,
  TrendingUp
} from 'lucide-react'
import { MarketingLayout } from '@/shared/layouts/marketing'

const AboutPage = () => {
  const handleNewsletterSignup = (email: string) => {
    console.log('Newsletter signup:', email)
  }

  const stats = [
    { number: "2020", label: "Founded", icon: Calendar, gradient: "from-blue-500 to-blue-600" },
    { number: "2,500+", label: "Happy Customers", icon: Users, gradient: "from-green-500 to-green-600" },
    { number: "25+", label: "Team Members", icon: Users, gradient: "from-purple-500 to-purple-600" },
    { number: "4.9", label: "Rating", icon: Star, gradient: "from-yellow-500 to-yellow-600" }
  ]

  const values = [
    { 
      icon: Target, 
      title: "Quality", 
      description: "Every detail matters",
      color: "from-brand-500 to-brand-600",
      bgColor: "bg-brand-50"
    },
    { 
      icon: Shield, 
      title: "Trust", 
      description: "Reliable & insured",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50"
    },
    { 
      icon: Heart, 
      title: "Care", 
      description: "Personal attention",
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50"
    },
    { 
      icon: Users, 
      title: "Community", 
      description: "Local & loyal",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50"
    }
  ]

  const timeline = [
    { 
      year: "2020", 
      title: "First Wash", 
      desc: "Started with mobile car washing in local neighborhoods",
      icon: Droplets,
      color: "bg-gradient-to-r from-blue-500 to-blue-600",
      milestone: "Founded with passion for clean cars"
    },
    { 
      year: "2021", 
      title: "Premium Services", 
      desc: "Added detailing, waxing & ceramic coating services",
      icon: Sparkles,
      color: "bg-gradient-to-r from-green-500 to-green-600",
      milestone: "Expanded service offerings"
    },
    { 
      year: "2022", 
      title: "Customer Choice", 
      desc: "Became #1 rated car wash with 500+ 5-star reviews",
      icon: Award,
      color: "bg-gradient-to-r from-purple-500 to-purple-600",
      milestone: "Community recognition"
    },
    { 
      year: "2024", 
      title: "Tech-Enabled", 
      desc: "Digital booking, eco-friendly products & 2,500+ cars cleaned",
      icon: Star,
      color: "bg-gradient-to-r from-yellow-500 to-yellow-600",
      milestone: "Modern car care solutions"
    }
  ]

  const services = [
    { 
      icon: Car, 
      title: "Mobile", 
      desc: "We come to you",
      gradient: "from-blue-500 to-blue-600",
      bg: "bg-blue-50"
    },
    { 
      icon: Droplets, 
      title: "Eco-Friendly", 
      desc: "Green products",
      gradient: "from-green-500 to-green-600",
      bg: "bg-green-50"
    },
    { 
      icon: Award, 
      title: "Guaranteed", 
      desc: "100% satisfaction",
      gradient: "from-purple-500 to-purple-600",
      bg: "bg-purple-50"
    }
  ]

  return (
    <MarketingLayout
      header={{ variant: 'default', showAuth: true }}
      footer={{ showNewsletter: true, onNewsletterSignup: handleNewsletterSignup }}
    >
      {/* Header - Enhanced with gradient */}
      <section className="relative bg-gradient-to-br from-gray-50 via-white to-gray-50 py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2314b8a6' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-brand-200/30 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-200/30 rounded-full blur-xl animate-float-delayed"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm font-medium mb-8 shadow-lg">
            <Sparkles className="w-4 h-4 text-brand-500" />
            About Our Company
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-brand-700 to-gray-900 bg-clip-text text-transparent mb-6">
            About Bling Auto
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Premium car care since 2020
          </p>
        </div>
      </section>

      {/* Stats - Enhanced with gradients and animations */}
      <section className="py-16 bg-white relative">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                  <div className={`w-16 h-16 bg-gradient-to-r ${stat.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story - Enhanced with visual appeal */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-brand-100 text-brand-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Heart className="w-4 h-4" />
              Our Story
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-brand-400 to-brand-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-brand-500 rounded-full mt-3 flex-shrink-0"></div>
                  Founded by car enthusiasts who believe car care shouldn't be a hassle.
                </p>
                <p className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-brand-500 rounded-full mt-3 flex-shrink-0"></div>
                  From mobile beginnings to trusted local team serving 2,500+ customers.
                </p>
                <p className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-brand-500 rounded-full mt-3 flex-shrink-0"></div>
                  Quality work, genuine care, attention to detail.
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700 rounded-3xl p-10 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                    <div className="grid grid-cols-2 gap-8 text-white text-center">
                      <div className="group">
                        <Car className="w-10 h-10 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                        <div className="text-2xl font-bold">15K+</div>
                        <div className="text-sm opacity-90">Services</div>
                      </div>
                      <div className="group">
                        <Droplets className="w-10 h-10 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                        <div className="text-2xl font-bold">100%</div>
                        <div className="text-sm opacity-90">Eco-Friendly</div>
                      </div>
                      <div className="group">
                        <Shield className="w-10 h-10 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                        <div className="text-2xl font-bold">24/7</div>
                        <div className="text-sm opacity-90">Support</div>
                      </div>
                      <div className="group">
                        <Award className="w-10 h-10 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                        <div className="text-2xl font-bold">99%</div>
                        <div className="text-sm opacity-90">Satisfied</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  <Sparkles className="w-12 h-12 text-yellow-700" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values - Enhanced with gradients */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Target className="w-4 h-4" />
              Our Values
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What We Stand For</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-purple-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="group">
                <div className={`${value.bgColor} rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100`}>
                  <div className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-sm text-gray-600 font-medium">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline - Serpentine Path with Car Animation */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Droplets className="w-4 h-4" />
              Our Washing Journey
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">From First Suds to Sparkling Success</h2>
            <p className="text-lg text-gray-600 mb-4">Follow our car along the path from startup to the premier car wash service</p>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-green-600 mx-auto rounded-full"></div>
          </div>

          {/* Serpentine Timeline Container */}
          <div className="relative h-[500px] overflow-hidden">
            {/* Car Wash Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white/40 to-green-50/60 rounded-3xl"></div>
            
            {/* Floating Soap Bubbles */}
            <div className="absolute top-10 left-10 w-16 h-16 bg-blue-200/30 rounded-full blur-2xl animate-float soap-bubble"></div>
            <div className="absolute top-20 left-32 w-8 h-8 bg-blue-300/40 rounded-full blur-xl animate-float-delayed soap-bubble-small"></div>
            <div className="absolute bottom-20 right-20 w-24 h-24 bg-green-200/25 rounded-full blur-3xl animate-float soap-bubble"></div>
            <div className="absolute bottom-32 right-40 w-12 h-12 bg-blue-200/35 rounded-full blur-2xl animate-float-delayed soap-bubble-small"></div>
            <div className="absolute top-40 right-32 w-20 h-20 bg-cyan-200/30 rounded-full blur-3xl animate-float soap-bubble"></div>
            
            {/* Water Droplet Effects */}
            <div className="absolute top-16 left-1/2 w-4 h-6 bg-blue-400/20 rounded-full blur-sm animate-float water-droplet"></div>
            <div className="absolute bottom-24 left-1/3 w-3 h-5 bg-blue-500/25 rounded-full blur-sm animate-float-delayed water-droplet"></div>
            <div className="absolute top-32 right-1/4 w-5 h-7 bg-cyan-400/20 rounded-full blur-sm animate-float water-droplet"></div>
            
            {/* Serpentine Path SVG */}
            <svg 
              className="absolute inset-0 w-full h-full" 
              viewBox="0 0 1200 500" 
              style={{ zIndex: 1 }}
            >
              <defs>
                {/* Car Wash Journey gradients */}
                <linearGradient id="washPathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0ea5e9" />  {/* Start: Water blue */}
                  <stop offset="25%" stopColor="#06b6d4" /> {/* Soap: Cyan */}
                  <stop offset="50%" stopColor="#8b5cf6" /> {/* Rinse: Purple */}
                  <stop offset="75%" stopColor="#f59e0b" /> {/* Dry: Golden */}
                  <stop offset="100%" stopColor="#10b981" /> {/* Shine: Green */}
                </linearGradient>
                
                <linearGradient id="washShadowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.3" />
                </linearGradient>

                {/* Water/soap glow effect */}
                <filter id="washGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                
                {/* Soap foam pattern */}
                <pattern id="soapFoam" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="10" cy="10" r="3" fill="#ffffff" opacity="0.3"/>
                  <circle cx="30" cy="20" r="2" fill="#ffffff" opacity="0.4"/>
                  <circle cx="20" cy="30" r="2.5" fill="#ffffff" opacity="0.2"/>
                </pattern>
              </defs>
              
              {/* Wash bay shadow */}
              <path
                d="M 120 220 Q 320 120 520 220 T 920 220 Q 1120 170 1120 270"
                stroke="url(#washShadowGradient)"
                strokeWidth="24"
                fill="none"
                strokeLinecap="round"
                opacity="0.4"
                className="blur-sm"
              />
              
              {/* Main car wash journey path */}
              <path
                d="M 120 200 Q 320 100 520 200 T 920 200 Q 1120 150 1120 250"
                stroke="url(#washPathGradient)"
                strokeWidth="18"
                fill="none"
                strokeLinecap="round"
                filter="url(#washGlow)"
                className="wash-path-animation"
              />
              
              {/* Soap foam texture overlay */}
              <path
                d="M 120 200 Q 320 100 520 200 T 920 200 Q 1120 150 1120 250"
                stroke="url(#soapFoam)"
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
                opacity="0.6"
                className="soap-markings"
              />
              
              {/* Water flow markings */}
              <path
                d="M 120 200 Q 320 100 520 200 T 920 200 Q 1120 150 1120 250"
                stroke="#ffffff"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="15,25"
                opacity="0.8"
                className="water-flow"
              />

              {/* Enhanced Timeline Stop Points */}
              {timeline.map((item, index) => {
                const positions = [
                  { x: 120, y: 200 },   // 2020 - First Wash
                  { x: 370, y: 125 },   // 2021 - Premium Services  
                  { x: 720, y: 200 },   // 2022 - Customer Choice
                  { x: 1070, y: 175 }   // 2024 - Tech-Enabled
                ];
                const pos = positions[index];
                // Car wash journey colors: Water Blue → Soap Cyan → Premium Purple → Gold Shine
                const colors = ['#0ea5e9', '#06b6d4', '#8b5cf6', '#f59e0b'];
                
                if (!pos) return null;
                
                return (
                  <g key={index} className={`milestone-stop milestone-${index + 1}`}>
                    {/* Outer glow ring */}
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r="35"
                      fill="none"
                      stroke={colors[index]}
                      strokeWidth="3"
                      opacity="0"
                      className="pulse-ring"
                    />
                    
                    {/* Stop circle background */}
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r="28"
                      fill="white"
                      stroke={colors[index]}
                      strokeWidth="4"
                      opacity="0"
                      className="stop-circle"
                      style={{ filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15))' }}
                    />
                    
                    {/* Inner colored circle */}
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r="20"
                      fill={colors[index]}
                      opacity="0"
                      className="inner-circle"
                    />
                    
                    {/* Icon container */}
                    <foreignObject
                      x={pos.x - 18}
                      y={pos.y - 18}
                      width="36"
                      height="36"
                      className="pointer-events-none"
                      opacity="0"
                    >
                      <div className="w-full h-full flex items-center justify-center stop-icon">
                        <item.icon className="w-6 h-6 text-white" />
                      </div>
                    </foreignObject>
                  </g>
                );
              })}
            </svg>

            {/* Enhanced Animated Car - Gets Cleaner Through Journey */}
            <div className="absolute top-0 left-0 w-full h-full" style={{ zIndex: 2 }}>
              <div className="car-animation">
                <div className="relative">
                  {/* Car shadow */}
                  <div className="absolute top-2 left-1 w-14 h-14 bg-black/20 rounded-xl blur-sm"></div>
                  
                  {/* Car body - gets shinier through the journey */}
                  <div className="washing-car flex items-center justify-center w-14 h-14 rounded-xl shadow-2xl border-2 border-white/20">
                    <Car className="w-7 h-7 text-white transform -rotate-12 drop-shadow-lg" />
                    {/* Progressive shine effect */}
                    <div className="car-shine absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent rounded-xl"></div>
                    
                    {/* Soap bubbles around car */}
                    <div className="soap-bubbles absolute -top-2 -left-2 w-4 h-4">
                      <div className="w-2 h-2 bg-white/60 rounded-full absolute animate-ping"></div>
                      <div className="w-1.5 h-1.5 bg-blue-200/80 rounded-full absolute top-1 left-2 animate-pulse"></div>
                    </div>
                    
                    {/* Water droplets */}
                    <div className="water-drops absolute -bottom-1 -right-1 w-3 h-3">
                      <div className="w-1 h-1.5 bg-blue-400/70 rounded-full absolute animate-bounce"></div>
                      <div className="w-0.5 h-1 bg-cyan-300/60 rounded-full absolute top-1 left-2 animate-pulse"></div>
                    </div>
                  </div>
                  
                  {/* Speed lines with water spray effect */}
                  <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 speed-lines">
                    <div className="w-6 h-0.5 bg-blue-400/60 rounded-full mb-1 speed-line-1"></div>
                    <div className="w-4 h-0.5 bg-cyan-400/40 rounded-full mb-1 speed-line-2"></div>
                    <div className="w-5 h-0.5 bg-blue-300/50 rounded-full speed-line-3"></div>
                  </div>
                  
                  {/* Cleaning spray effect */}
                  <div className="cleaning-spray absolute -right-6 top-1/2 transform -translate-y-1/2">
                    <div className="w-8 h-1 bg-gradient-to-r from-transparent via-blue-300/40 to-transparent rounded-full spray-line-1"></div>
                    <div className="w-6 h-0.5 bg-gradient-to-r from-transparent via-cyan-200/30 to-transparent rounded-full mt-1 spray-line-2"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Timeline Labels */}
            <div className="absolute top-0 left-0 w-full h-full" style={{ zIndex: 3 }}>
              {timeline.map((item, index) => {
                const stopPositions = [
                  { x: 120, y: 200 },   // 2020
                  { x: 370, y: 125 },   // 2021
                  { x: 720, y: 200 },   // 2022
                  { x: 1070, y: 175 }   // 2024
                ];
                
                const labelPositions = [
                  { x: '10%', y: '65%', connectY: '50%' },    // 2020 - below stop
                  { x: '30%', y: '15%', connectY: '25%' },    // 2021 - above stop  
                  { x: '60%', y: '65%', connectY: '50%' },    // 2022 - below stop
                  { x: '89%', y: '30%', connectY: '35%' }     // 2024 - above stop
                ];
                
                const stopPos = stopPositions[index];
                const labelPos = labelPositions[index];
                // Car wash journey colors: Water Blue → Soap Cyan → Premium Purple → Gold Shine
                const colors = ['#0ea5e9', '#06b6d4', '#8b5cf6', '#f59e0b'];
                
                if (!stopPos || !labelPos) return null;
                
                // Calculate connection line from stop to label
                const isAbove = index % 2 === 1;
                const lineLength = isAbove ? 80 : 120;
                
                return (
                  <div key={index}>
                    {/* Connection line from stop to label */}
                    <svg 
                      className={`absolute milestone-connector milestone-${index + 1}`}
                      style={{ 
                        left: `${(stopPos.x / 1200) * 100}%`, 
                        top: `${(stopPos.y / 500) * 100}%`,
                        transform: 'translate(-50%, -50%)',
                        zIndex: 1,
                        opacity: 0
                      }}
                      width="200" 
                      height="200"
                      viewBox="0 0 200 200"
                    >
                      <path
                        d={isAbove 
                          ? "M 100 100 Q 100 60 100 20" // Line going up
                          : "M 100 100 Q 100 140 100 180" // Line going down
                        }
                        stroke={colors[index]}
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray="5,5"
                        className="connection-line"
                      />
                    </svg>
                    
                    {/* Label */}
                    <div 
                      className={`absolute milestone-label milestone-${index + 1} transform -translate-x-1/2`}
                      style={{ 
                        left: labelPos.x, 
                        top: labelPos.y,
                        opacity: 0,
                        transform: `translateX(-50%) scale(0.8) translateY(${isAbove ? '20px' : '-20px'})`
                      }}
                    >
                      <div className="relative group cursor-pointer">
                        {/* Label background with enhanced styling */}
                        <div className="bg-white/98 backdrop-blur-md rounded-2xl p-4 shadow-2xl border-2 hover:shadow-3xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
                             style={{ borderColor: `${colors[index]}40` }}>
                          {/* Year badge */}
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-2" 
                               style={{ backgroundColor: `${colors[index]}20`, color: colors[index] }}>
                            <Calendar className="w-3 h-3" />
                            {item.year}
                          </div>
                          
                          {/* Title with icon */}
                          <div className="flex items-center gap-2 mb-2">
                            <item.icon className="w-4 h-4" style={{ color: colors[index] }} />
                            <h3 className="text-sm font-bold text-gray-900">{item.title}</h3>
                          </div>
                          
                          {/* Description */}
                          <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                          
                          {/* Pulse indicator */}
                          <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                               style={{ backgroundColor: colors[index] }}>
                            <div className="w-2 h-2 bg-white rounded-full absolute top-1 left-1 animate-pulse"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Enhanced Custom CSS for car wash journey animation */}
        <style jsx>{`
          /* Car wash journey animation with progressive cleaning */
          .car-animation {
            animation: washJourney 20s ease-in-out forwards;
            position: absolute;
            top: 170px;
            left: 90px;
            opacity: 1;
          }
          
          /* Car gets progressively cleaner and shinier */
          .washing-car {
            background: linear-gradient(135deg, #374151 0%, #4b5563 50%, #6b7280 100%);
            animation: getCleanerCar 20s ease-in-out forwards;
          }
          
          @keyframes getCleanerCar {
            0% {
              background: linear-gradient(135deg, #6b7280 0%, #9ca3af 50%, #d1d5db 100%);
              filter: brightness(0.7) saturate(0.6);
            }
            25% {
              background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 50%, #67e8f9 100%);
              filter: brightness(0.9) saturate(0.8);
            }
            50% {
              background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 50%, #c084fc 100%);
              filter: brightness(1.1) saturate(1.0);
            }
            75% {
              background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 50%, #fde047 100%);
              filter: brightness(1.2) saturate(1.2);
            }
            100% {
              background: linear-gradient(135deg, #10b981 0%, #34d399 50%, #6ee7b7 100%);
              filter: brightness(1.3) saturate(1.4) drop-shadow(0 0 10px rgba(16, 185, 129, 0.5));
            }
          }
          
          /* Progressive shine effect */
          .car-shine {
            animation: increaseShine 20s ease-in-out forwards;
          }
          
          @keyframes increaseShine {
            0% { opacity: 0.1; }
            25% { opacity: 0.3; }
            50% { opacity: 0.5; }
            75% { opacity: 0.7; }
            100% { opacity: 0.9; }
          }
          
          @keyframes washJourney {
            /* Drive to stop 1 (2020) */
            0% {
              transform: translateX(0px) translateY(0px) rotate(0deg);
              opacity: 1;
            }
            12% {
              transform: translateX(30px) translateY(0px) rotate(0deg);
              opacity: 1;
            }
            
            /* Drive to stop 2 (2021) */
            25% {
              transform: translateX(200px) translateY(-50px) rotate(-12deg);
              opacity: 1;
            }
            37% {
              transform: translateX(280px) translateY(-75px) rotate(-18deg);
              opacity: 1;
            }
            
            /* Drive to stop 3 (2022) */
            50% {
              transform: translateX(500px) translateY(-40px) rotate(-5deg);
              opacity: 1;
            }
            62% {
              transform: translateX(630px) translateY(0px) rotate(8deg);
              opacity: 1;
            }
            
            /* Drive to stop 4 (2024) */
            75% {
              transform: translateX(800px) translateY(-15px) rotate(-10deg);
              opacity: 1;
            }
            87% {
              transform: translateX(950px) translateY(25px) rotate(12deg);
              opacity: 1;
            }
            
            /* Fade out at the end */
            90% {
              transform: translateX(980px) translateY(25px) rotate(12deg);
              opacity: 1;
            }
            100% {
              transform: translateX(1000px) translateY(25px) rotate(12deg);
              opacity: 0;
            }
          }
          
          /* Car wash effects */
          .soap-bubbles {
            animation: bubbleEffect 2s ease-in-out infinite;
          }
          
          @keyframes bubbleEffect {
            0% { opacity: 0; transform: scale(0.8); }
            50% { opacity: 1; transform: scale(1.2); }
            100% { opacity: 0; transform: scale(0.8); }
          }
          
          .water-drops {
            animation: drippingWater 1.5s ease-in-out infinite;
          }
          
          @keyframes drippingWater {
            0% { opacity: 0; transform: translateY(-2px); }
            50% { opacity: 1; transform: translateY(0px); }
            100% { opacity: 0; transform: translateY(2px); }
          }
          
          .cleaning-spray {
            animation: sprayEffect 1s ease-in-out infinite;
          }
          
          @keyframes sprayEffect {
            0% { opacity: 0; transform: scaleX(0); }
            50% { opacity: 0.8; transform: scaleX(1); }
            100% { opacity: 0; transform: scaleX(0.5); }
          }

          /* Enhanced path animations - car wash journey */
          .wash-path-animation {
            stroke-dasharray: 2000;
            stroke-dashoffset: 2000;
            animation: drawWashPath 20s ease-in-out forwards;
          }
          
          @keyframes drawWashPath {
            0% { stroke-dashoffset: 2000; }
            25% { stroke-dashoffset: 1500; }
            50% { stroke-dashoffset: 1000; }
            75% { stroke-dashoffset: 500; }
            100% { stroke-dashoffset: 0; }
          }
          
          .soap-markings {
            animation: foamFlow 3s ease-in-out infinite;
          }
          
          @keyframes foamFlow {
            0% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 0.8; transform: scale(1.05); }
            100% { opacity: 0.3; transform: scale(1); }
          }
          
          .water-flow {
            stroke-dasharray: 2000;
            stroke-dashoffset: 2000;
            animation: waterFlowing 20s ease-in-out forwards;
          }
          
          @keyframes waterFlowing {
            0% { stroke-dashoffset: 2000; opacity: 0.5; }
            25% { stroke-dashoffset: 1500; opacity: 0.7; }
            50% { stroke-dashoffset: 1000; opacity: 0.9; }
            75% { stroke-dashoffset: 500; opacity: 0.8; }
            100% { stroke-dashoffset: 0; opacity: 0.8; }
          }
          
          /* Floating background effects */
          .soap-bubble {
            animation: floatingSoap 6s ease-in-out infinite;
          }
          
          .soap-bubble-small {
            animation: floatingSoapSmall 4s ease-in-out infinite;
          }
          
          @keyframes floatingSoap {
            0%, 100% { transform: translateY(0px) scale(1); opacity: 0.3; }
            50% { transform: translateY(-20px) scale(1.1); opacity: 0.6; }
          }
          
          @keyframes floatingSoapSmall {
            0%, 100% { transform: translateY(0px) scale(1); opacity: 0.4; }
            50% { transform: translateY(-15px) scale(1.2); opacity: 0.7; }
          }
          
          .water-droplet {
            animation: fallingDroplet 3s ease-in-out infinite;
          }
          
          @keyframes fallingDroplet {
            0% { transform: translateY(-5px) scale(1); opacity: 0.6; }
            50% { transform: translateY(0px) scale(1.1); opacity: 1; }
            100% { transform: translateY(5px) scale(0.9); opacity: 0.4; }
          }
          
          /* Sequential milestone stop reveals */
          .milestone-stop.milestone-1 {
            animation: revealStop 1s ease-out forwards;
            animation-delay: 2.4s; /* Car reaches first stop */
          }
          
          .milestone-stop.milestone-2 {
            animation: revealStop 1s ease-out forwards;
            animation-delay: 7.4s; /* Car reaches second stop */
          }
          
          .milestone-stop.milestone-3 {
            animation: revealStop 1s ease-out forwards;
            animation-delay: 12.4s; /* Car reaches third stop */
          }
          
          .milestone-stop.milestone-4 {
            animation: revealStop 1s ease-out forwards;
            animation-delay: 17.4s; /* Car reaches fourth stop */
          }
          
          @keyframes revealStop {
            0% {
              opacity: 0;
              transform: scale(0.5);
            }
            50% {
              opacity: 1;
              transform: scale(1.2);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }
          
          /* Pulse rings appear with stops */
          .pulse-ring {
            animation: none;
            opacity: 0;
          }
          
          .milestone-1 .pulse-ring {
            animation: pulseRingStart 2s infinite;
            animation-delay: 3.4s;
          }
          
          .milestone-2 .pulse-ring {
            animation: pulseRingStart 2s infinite;
            animation-delay: 8.4s;
          }
          
          .milestone-3 .pulse-ring {
            animation: pulseRingStart 2s infinite;
            animation-delay: 13.4s;
          }
          
          .milestone-4 .pulse-ring {
            animation: pulseRingStart 2s infinite;
            animation-delay: 18.4s;
          }
          
          @keyframes pulseRingStart {
            0% {
              opacity: 0.4;
              transform: scale(1);
            }
            50% {
              opacity: 0.1;
              transform: scale(1.3);
            }
            100% {
              opacity: 0.4;
              transform: scale(1);
            }
          }
          
          /* Sequential label reveals from stops */
          .milestone-label.milestone-1 {
            animation: labelFromStop 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
            animation-delay: 3s;
          }
          
          .milestone-label.milestone-2 {
            animation: labelFromStop 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
            animation-delay: 8s;
          }
          
          .milestone-label.milestone-3 {
            animation: labelFromStop 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
            animation-delay: 13s;
          }
          
          .milestone-label.milestone-4 {
            animation: labelFromStop 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
            animation-delay: 18s;
          }
          
          @keyframes labelFromStop {
            0% {
              opacity: 0;
              transform: translateX(-50%) scale(0.5) translateY(0px);
            }
            60% {
              opacity: 1;
              transform: translateX(-50%) scale(1.1) translateY(-10px);
            }
            100% {
              opacity: 1;
              transform: translateX(-50%) scale(1) translateY(0px);
            }
          }
          
          /* Connection lines appear with labels */
          .milestone-connector.milestone-1 {
            animation: drawConnector 0.5s ease-out forwards;
            animation-delay: 3.5s;
          }
          
          .milestone-connector.milestone-2 {
            animation: drawConnector 0.5s ease-out forwards;
            animation-delay: 8.5s;
          }
          
          .milestone-connector.milestone-3 {
            animation: drawConnector 0.5s ease-out forwards;
            animation-delay: 13.5s;
          }
          
          .milestone-connector.milestone-4 {
            animation: drawConnector 0.5s ease-out forwards;
            animation-delay: 18.5s;
          }
          
          @keyframes drawConnector {
            0% {
              opacity: 0;
            }
            100% {
              opacity: 0.6;
            }
          }
          
          .connection-line {
            stroke-dasharray: 100;
            stroke-dashoffset: 100;
            animation: drawLine 0.5s ease-out forwards;
          }
          
          .milestone-connector.milestone-1 .connection-line {
            animation-delay: 3.5s;
          }
          
          .milestone-connector.milestone-2 .connection-line {
            animation-delay: 8.5s;
          }
          
          .milestone-connector.milestone-3 .connection-line {
            animation-delay: 13.5s;
          }
          
          .milestone-connector.milestone-4 .connection-line {
            animation-delay: 18.5s;
          }
          
          @keyframes drawLine {
            to {
              stroke-dashoffset: 0;
            }
          }
          
          /* Car enhancements */
          .speed-lines {
            opacity: 0;
            animation: showSpeedLines 0.5s ease-in-out infinite alternate;
          }
          
          .speed-line-1 {
            animation: speedLine 0.3s ease-in-out infinite;
          }
          
          .speed-line-2 {
            animation: speedLine 0.4s ease-in-out infinite 0.1s;
          }
          
          .speed-line-3 {
            animation: speedLine 0.5s ease-in-out infinite 0.2s;
          }
          
          @keyframes showSpeedLines {
            to {
              opacity: 1;
            }
          }
          
          @keyframes speedLine {
            0% {
              transform: scaleX(0);
              opacity: 0;
            }
            50% {
              transform: scaleX(1);
              opacity: 1;
            }
            100% {
              transform: scaleX(0.8);
              opacity: 0.3;
            }
          }
          
          /* Enhanced hover effects */
          .milestone-label:hover {
            z-index: 10;
          }
          
          /* Responsive design */
          @media (max-width: 768px) {
            .car-animation {
              animation: driveSequentialMobile 20s ease-in-out forwards;
              top: 180px;
              left: 50px;
            }
            
            @keyframes driveSequentialMobile {
              0% { transform: translateX(0px) translateY(0px) rotate(0deg); opacity: 1; }
              25% { transform: translateX(80px) translateY(-30px) rotate(-8deg); opacity: 1; }
              50% { transform: translateX(160px) translateY(0px) rotate(3deg); opacity: 1; }
              75% { transform: translateX(240px) translateY(-15px) rotate(-5deg); opacity: 1; }
              90% { transform: translateX(300px) translateY(10px) rotate(5deg); opacity: 1; }
              100% { transform: translateX(320px) translateY(10px) rotate(5deg); opacity: 0; }
            }
          }
        `}</style>
      </section>

      {/* Services - Enhanced styling */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Car className="w-4 h-4" />
              What We Do
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="group">
                <div className={`${service.bg} rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100`}>
                  <div className={`w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-sm text-gray-600 font-medium">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team - Enhanced with gradient background */}
      <section className="py-20 bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Users className="w-4 h-4" />
            Our Team
          </div>
          <h2 className="text-4xl font-bold mb-4">Professional Excellence</h2>
          <div className="w-20 h-1 bg-white/50 mx-auto rounded-full mb-12"></div>
          
          <p className="text-xl text-brand-100 mb-16 max-w-3xl mx-auto leading-relaxed">
            Automotive care specialists trained to our high standards.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2">Fully Insured</h3>
                <p className="text-sm text-brand-100">Complete protection</p>
              </div>
            </div>

            <div className="group">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2">Professional</h3>
                <p className="text-sm text-brand-100">Trained specialists</p>
              </div>
            </div>

            <div className="group">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2">Reliable</h3>
                <p className="text-sm text-brand-100">Consistent quality</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact - Enhanced with modern styling */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <MapPin className="w-4 h-4" />
              Find Us
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="group">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <MapPin className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Visit Us</h3>
                <p className="text-gray-600 mb-2">123 Business Street</p>
                <p className="text-gray-600 mb-6">Brooklyn, NY 11201</p>
                <div className="flex items-center justify-center gap-3 text-sm text-gray-600 bg-white rounded-lg p-3 shadow-sm">
                  <Clock className="w-4 h-4 text-brand-500" />
                  <span className="font-medium">Mon-Fri: 8AM-6PM</span>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="bg-gradient-to-br from-brand-50 to-white rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className="w-20 h-20 bg-gradient-to-r from-brand-500 to-brand-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Phone className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Connect</h3>
                <div className="space-y-4">
                  <a 
                    href="/contact" 
                    className="block bg-gradient-to-r from-brand-500 to-brand-600 text-white px-8 py-3 rounded-xl font-bold hover:from-brand-600 hover:to-brand-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Contact Us
                  </a>
                  <a 
                    href="/services" 
                    className="block border-2 border-brand-500 text-brand-600 px-8 py-3 rounded-xl font-bold hover:bg-brand-50 transition-all transform hover:scale-105"
                  >
                    View Services
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MarketingLayout>
  )
}

export default AboutPage