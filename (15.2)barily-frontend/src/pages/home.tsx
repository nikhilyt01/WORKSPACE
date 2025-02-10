

export  function LandingPage() {
    return (
      <div className="min-h-screen bg-gray-100 text-gray-900">
        {/* Hero Section */}
        <header className="bg-blue-600 text-white text-center py-16 px-6">
          <h1 className="text-4xl font-bold">Unlock Knowledge, Ask & Answer Instantly!</h1>
          <p className="mt-4 text-lg">A community-driven platform where students and experts solve questions together.</p>
          <button className="mt-6 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-200">Get Started</button>
        </header>
        
        {/* Features Section */}
        <section className="py-12 px-6 max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {[
              { title: "Instant Answers", desc: "Get quick responses from peers and experts." },
              { title: "Verified Solutions", desc: "Trusted, community-reviewed answers." },
              { title: "Collaborative Learning", desc: "Help others and grow together." }
            ].map((feature, i) => (
              <div key={i} className="p-6 bg-white shadow-md rounded-lg">
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="mt-2 text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="bg-blue-50 py-12 px-6 text-center">
          <h2 className="text-3xl font-bold">How It Works</h2>
          <div className="mt-8 flex flex-col md:flex-row gap-6 justify-center">
            {[
              "Post a Question – Ask anything academic.",
              "Get Expert Answers – Community or verified responses.",
              "Contribute – Earn points and badges for helping others."
            ].map((step, i) => (
              <div key={i} className="p-6 bg-white shadow-md rounded-lg w-64">
                <span className="text-blue-600 text-2xl font-bold">{i + 1}</span>
                <p className="mt-2 text-gray-700">{step}</p>
              </div>
            ))}
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-12 px-6 text-center">
          <h2 className="text-3xl font-bold">What Our Users Say</h2>
          <div className="mt-8 max-w-3xl mx-auto">
            <p className="italic text-gray-700">"This platform helped me ace my exams! The community is super helpful."</p>
            <p className="mt-4 font-semibold">- Student Name</p>
          </div>
        </section>
        
        {/* Call to Action */}
        <footer className="bg-blue-600 text-white text-center py-12">
          <h2 className="text-3xl font-bold">Join Thousands of Learners Today!</h2>
          <button className="mt-6 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-200">Sign Up Now</button>
        </footer>
      </div>
    );
  }
  