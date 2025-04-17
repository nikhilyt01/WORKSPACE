import React from 'react';
import { 
  Pencil, 
  Share2, 
  Cloud, 
  Layers, 
  Palette, 
  Github,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-purple-50 to-blue-50">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Pencil className="h-8 w-8 text-purple-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">DrawFlow</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-purple-600">Features</a>
              <a href="#" className="text-gray-600 hover:text-purple-600">Docs</a>
              <a href="#" className="text-gray-600 hover:text-purple-600">Blog</a>
              <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                Try Now
              </button>
            </div>
          </div>
        </nav>

        <div className="container mx-auto px-6 py-16 text-center md:py-24">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
            Create Beautiful <br />
            <span className="text-purple-600">Hand-Drawn Diagrams</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            The simplest way to create and share diagrams, wireframes, and visual ideas. No account required.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center">
              Start Drawing <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button className="border-2 border-purple-600 text-purple-600 px-8 py-3 rounded-lg hover:bg-purple-50 transition-colors flex items-center justify-center">
              <Github className="mr-2 h-5 w-5" /> View on GitHub
            </button>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            Everything you need to bring your ideas to life
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <FeatureCard
              icon={<Share2 className="h-8 w-8 text-purple-600" />}
              title="Real-time Collaboration"
              description="Work together with your team in real-time, no matter where they are."
            />
            <FeatureCard
              icon={<Cloud className="h-8 w-8 text-purple-600" />}
              title="Cloud Storage"
              description="Your drawings are automatically saved and synced across devices."
            />
            <FeatureCard
              icon={<Layers className="h-8 w-8 text-purple-600" />}
              title="Rich Components"
              description="Access a library of pre-made components to speed up your workflow."
            />
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="rounded-xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=2000&q=80" 
              alt="DrawFlow Interface Demo"
              className="w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-purple-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Ready to start creating?
          </h2>
          <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already creating beautiful diagrams with DrawFlow.
          </p>
          {/* can also do with onclick handler & router.push*/}
          <Link href={"/signin"}>  
          <button className="bg-white text-purple-600 px-8 py-3 rounded-lg hover:bg-purple-50 transition-colors">
            Get Started for Free
          </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Pencil className="h-6 w-6 text-purple-400" />
              <span className="ml-2 text-lg font-semibold">DrawFlow</span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-purple-400">Terms</a>
              <a href="#" className="hover:text-purple-400">Privacy</a>
              <a href="#" className="hover:text-purple-400">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { 
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 bg-white rounded-xl border border-gray-100 hover:shadow-lg transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default App;