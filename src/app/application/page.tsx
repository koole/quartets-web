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
          This model includes the ability for a human player to play against two other AI opponents, or have three AI's play against each other. 
          It is possible to change the strategies of the AI opponents if one wants to see how it feels to play against, or replicate the experiment with three AI's as done in the experiment section of this website.
          </p>

          <p className="mt-6 text-xl leading-8">
          This web application was built using Javascript without any additional dependencies. 
          The full source code of the experiment can be found on GitHub at: LINK 
          </p>

        </div>
      </div>
    </main>
  );
}
