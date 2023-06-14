"use client";

import Image from "next/image";
import Navigation from "../../components/Nav";
import {
  CheckCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/20/solid";

export default function Home() {
  return (
    <main className="">
      <Navigation />
      <div className="bg-white px-6 py-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Application
          </h1>
          <p className="mt-6 text-xl leading-8">
            For this project, an interactive web application was created using JavaScript to model a game of Quartets.  
          </p>
        </div>
      </div>
    </main>
  );
}
