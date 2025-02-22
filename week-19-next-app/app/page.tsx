import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
  <div className="text-lg w-screen h-screen flex justify-center items-center">
    <div>
      Todo application
      <br />
      <Link className="text-md border m-2" href="/signup">signup todo app</Link>
      <br />
      <Link className="text-md border m-2" href="/signin">signin into todo app</Link>
    </div>
  </div>
  );
    
}

