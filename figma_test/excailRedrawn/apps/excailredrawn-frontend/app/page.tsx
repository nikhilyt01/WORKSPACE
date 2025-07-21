"use client";
import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Mail, Github, Linkedin, ArrowRight ,Edit,Clock,Lock,Rocket} from "lucide-react";

export default function HomePage() {
  const faqItems = [
    {
      question: "What is Slate.io?",
      answer: "Slate.io is a collaborative document editor with real-time features for teams.",
    },
    {
      question: "How does real-time collaboration work?",
      answer: "Multiple users can edit documents simultaneously with changes appearing instantly,which becomes possible by the help of websocket.",
    },
    {
      question: "Is my data secure?",
      answer: "We use end-to-end encryption to protect all your documents.",
    }
  ];

  const [openFaq, setOpenFaq] = useState<Record<number, boolean>>({});
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleFaq = (index: number) => {
    setOpenFaq(prev => ({ ...prev, [index]: !prev[index] }));
  };

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("Token"));
  }, []);

  return (
    <>
    

      <div className="bg-slate-900 text-slate-100 min-h-screen">
        {/* Navigation - Simple fade-in effect with CSS opacity transition */}
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center opacity-0 animate-fade-in">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-600 bg-clip-text text-transparent">
              Slate.io
            </h1>
          </div>
          <ul className="hidden md:flex gap-6">
            {['Home', 'Features', 'Demo', 'FAQ'].map((item) => (
              <li key={item}>
                <a 
                  href={`#${item.toLowerCase()}`}
                  className="hover:text-indigo-400 transition-colors duration-200"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Hero Section - Simple slide-up effect with CSS transform */}
        <section 
          id="hero" 
          className="container mx-auto px-6 py-20 text-center translate-y-10 animate-slide-up"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 font-sans">
            Write Together in Real-Time
          </h2>
          <p className="text-lg md:text-xl mb-8 text-slate-300 max-w-2xl mx-auto">
            Slate.io brings your team together with seamless document collaboration.
          </p>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => router.push(isLoggedIn ? "/Dashboard" : "/signup")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
              {isLoggedIn ? "Go to Dashboard" : "Get Started"}
              <ArrowRight size={18} />
            </button>
          </div>
        </section>

        {/* Features - Using CSS grid gap animation */}
        <section id="features" className="container mx-auto px-6 py-16">
          <h3 className="text-3xl font-bold text-center mb-12">Key Features</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Real-Time Editing",
                desc: "See changes from teammates as they happen",
                icon: <Edit className="w-8 h-8 mb-4 text-indigo-400" />
              },
              {
                title: "Creative Growth",
                desc: "unlease your creativity and learn with RTC",
                icon: <Rocket className="w-8 h-8 mb-4 text-indigo-400" />
              },
              {
                title: "Secure Collaboration",
                desc: "End-to-end encrypted document sharing",
                icon: <Lock className="w-8 h-8 mb-4 text-indigo-400" />
              }
            ].map((feature, i) => (
              <div 
                key={i} 
                className="p-6 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors duration-200"
              >
                <div className="text-2xl mb-3">{feature.icon}</div>
                <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
                <p className="text-slate-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Demo Section - Commented image placeholder */}
        <section id="demo" className="container mx-auto px-6 py-16">
          <h3 className="text-3xl font-bold text-center mb-12">See It in Action</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* ADD YOUR DEMO SCREENSHOT HERE */}
            {/* <Image
              src="/demo-screenshot.png"
              alt="Slate.io demo"
              fill
              className="object-cover"
            /> */}
            {/* <div className="flex flex-col md:flex-row items-center justify-center gap-8"> */}
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg hover:scale-[1.02] transition-transform duration-300">
              <Image
                src="/overview.jpg"
                alt=" Demo 1"
                fill
                unoptimized
                style={{ width: '100%', height: '100%' }}
                className=" object-cover object-left "
              />
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg hover:scale-[1.02] transition-transform duration-300">
              <Image
                src="/relation.jpg"
                alt=" Demo 2"
                fill
                unoptimized
                className=" object-cover object-left"
              />
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg hover:scale-[1.02] transition-transform duration-300">
              <Image
                src="/RTC.jpg"
                alt=" Demo 3"
                fill
                unoptimized
                className=" object-cover"
              />
            </div>
          {/* </div> */}
            
            {/* <div className="text-slate-400 text-center p-8">
              <p className="text-2xl mb-2">📋</p>
              <p>Demo screenshot will appear here</p>
              <p className="text-sm mt-4">Replace with your actual image</p>
            </div> */}
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="container mx-auto px-6 py-16 bg-slate-800/50">
          <h3 className="text-3xl font-bold text-center mb-12">Trusted by Teams</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { quote: "Slate.io cut our document review time in half!", author: "Team Alpha" },
              { quote: "The real-time collaboration is game-changing.", author: "Tech Startup" },
              { quote: "Finally a document editor that just works.", author: "Remote Team" }
            ].map((testimonial, i) => (
              <div key={i} className="p-6 bg-slate-900 rounded-lg">
                <p className="italic text-slate-300 mb-4">"{testimonial.quote}"</p>
                <p className="font-medium">— {testimonial.author}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="container mx-auto px-6 py-16 max-w-3xl">
          <h3 className="text-3xl font-bold text-center mb-12">FAQs</h3>
          <div className="space-y-4">
            {faqItems.map((item, i) => (
              <div key={i} className="border border-slate-700 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full p-4 text-left flex justify-between items-center hover:bg-slate-800 transition-colors duration-200"
                >
                  <span className="font-medium">{item.question}</span>
                  <span>{openFaq[i] ? "−" : "+"}</span>
                </button>
                {openFaq[i] && (
                  <div className="p-4 border-t border-slate-700 bg-slate-800/50">
                    <p className="text-slate-300">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-950 py-12">
          <div className="container mx-auto px-6 ">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Slate.io</h2>
                <p className="text-slate-400">Collaborative editing for modern teams.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  {['Home', 'Features', 'Demo', 'FAQ'].map((item) => (
                    <li key={item}>
                      <a href={`#${item.toLowerCase()}`} className="text-slate-400 hover:text-white transition-colors duration-200">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Connect</h3>
                <div className="flex gap-4">
                  <a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">
                    <Github />
                  </a>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">
                    <Linkedin />
                  </a>
                  <a href="mailto:contact@slate.io" className="text-slate-400 hover:text-white transition-colors duration-200">
                    <Mail />
                  </a>
                </div>
              </div>
            </div>
            
            <div className="pt-8 border-t border-slate-800 text-center text-slate-500">
              © {new Date().getFullYear()} Slate.io. All rights reserved.
            </div>
          </div>
        </footer>

        {/* Add these CSS animations to your global CSS file */}
        <style jsx global>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          .animate-fade-in {
            animation: fadeIn 0.8s ease-out forwards;
          }
          .animate-slide-up {
            animation: slideUp 0.8s ease-out forwards;
          }
        `}</style>
      </div>
    </>
  );
}