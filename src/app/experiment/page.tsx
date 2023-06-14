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
            Experiment
          </h1>
          <p className="mt-6 text-xl leading-8">
            
          </p>
          <div className="mt-10 max-w-2xl">
            <p>
            In this experiment, all the agent strategies are are pitted against each other, as to answer the research question; which of the Kripke based model strategy performs best in the game of Quartets. 
            We hypothesis that...            
            </p>

            <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
              Method
            </h2>
            <p className="mt-6">
            For this experiment, instead of including the player, three agents are used. Each agent is assigned a strategy such that all combinations of strategies are pitted against each other. 
            This experiment is run for 10,000 episodes per strategy combination, and the total win rate is tallied up.
            </p>

            <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
              Results
            </h2>
            <p className="mt-6">
            For this experiment, instead of including the player, three agents are used. Each agent is assigned a strategy such that all combinations of strategies are pitted against each other. 
            This experiment is run for 10,000 episodes per strategy combination, and the total win rate is tallied up.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
