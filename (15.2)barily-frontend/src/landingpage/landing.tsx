import { Headers } from "./components/headers";
import { About } from "./components/about";
import { Testimonials } from "./components/testimonial";
import { Herosection } from "./components/details";
import { Contact } from "./components/contact";

export function Landingpg(){
    return  <div className="min-h-screen bg-zinc-900 text-gray-100  p-6">
            <Headers />
            <Herosection />
            <About />
            <Testimonials />
            <Contact />
    </div>
}