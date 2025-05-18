import Image from "next/image";
import Link from "next/link";
export default function Welcome() {
  return (
    <div className="grid grid-cols-1 md:grid grid-cols-2 ">
      <div id="right-part" className="bg-blue-500 flex items-center justify-center">alt img..</div>

   <div id="left-part">
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      {/* Welcome Message */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Welcome to TickTech_Jr</h1>
        <p className="text-xl text-gray-700">Sign up and explore more! I am a...</p>
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-2 gap-8 ">
        {/* Parent Option */}
        <div className="flex flex-col items-center">
          <Link href="/Dashboard" passHref >
          <div className="relative h-40 w-40 rounded-full border-4  border-blue-400 shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <Image
              src="/parent.jpg"
              alt="Parent"
              fill
              className="object-cover "
            />
          </div>
          </Link>
          <span className="mt-4 text-xl font-semibold text-blue-600">PARENT</span>
          
        </div>

        {/* Teacher Option */}
        <div className="flex flex-col items-center">
          <Link href="/teacher-dasbord" passHref >
          <div className="relative h-40 w-40  rounded-full border-4 border-green-400 shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <Image
              src="/teacher.jpg"
              alt="Teacher"
              fill
              className="object-cover"
            />
          </div>
          </Link>
          <span className="mt-4 text-xl font-semibold text-green-600">TEACHER</span>
        </div>
      </div>
    </div>
    </div> 

    </div>
  );
}