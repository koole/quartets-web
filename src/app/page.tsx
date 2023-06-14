"use client";

import Image from 'next/image'
import Header from '../components/Header'
import Navigation from '../components/Nav';
import Game from './game/Game';
import {
  ArrowRightCircleIcon,
  PlayCircleIcon
} from "@heroicons/react/20/solid";

export default function Home() {
  return (
    <main className="">
      <Navigation />
      <Header />
      <div className="bg-white px-6 py-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Introduction
          </h1>
          <p className="mt-6 text-xl leading-8">
          Quartets is a classic card game similar to the likes of Go Fish or Happy Families,
          where the ultimate objective is to collect as many full suites of four cards as possible. 
          This website is dedicated to describing Quartets in terms of modal epistemic logic using Kripke
          models and offers a playable version of the game. This website is structured as
          follows:
          <ul role="list" className="mt-8 max-w-xl space-y-8 text-gray-600">
            <li className="flex gap-x-3">
              <ArrowRightCircleIcon
                className="mt-1 h-5 w-5 flex-none text-indigo-600"
                aria-hidden="true"
              />
              <span>
                <strong className="font-semibold text-gray-900">Rules:</strong>{" "}
                Describes the rules of the game and how those were adapted for our implementation of the game.
              </span>
            </li>
            <li className="flex gap-x-3">
              <ArrowRightCircleIcon
                className="mt-1 h-5 w-5 flex-none text-indigo-600"
                aria-hidden="true"
              />
              <span>
                <strong className="font-semibold text-gray-900">Model:</strong>{" "}
                Explains the way the model was created and displays a simple example of a game in terms of a Kripke model.
              </span>
            </li>
            <li className="flex gap-x-3">
              <ArrowRightCircleIcon
                className="mt-1 h-5 w-5 flex-none text-indigo-600"
                aria-hidden="true"
              />
              <span>
                <strong className="font-semibold text-gray-900">Application:</strong>{" "}
                Shows details about the application and the way it was built.
              </span>
            </li>
            <li className="flex gap-x-3">
              <ArrowRightCircleIcon
                className="mt-1 h-5 w-5 flex-none text-indigo-600"
                aria-hidden="true"
              />
              <span>
                <strong className="font-semibold text-gray-900">Experiment:</strong>{" "}
                Here the research question is defined, together with the methods of the experiment and results
                that were achieved.
              </span>
            </li>
            <li className="flex gap-x-3">
              <ArrowRightCircleIcon
                className="mt-1 h-5 w-5 flex-none text-indigo-600"
                aria-hidden="true"
              />
              <span>
                <strong className="font-semibold text-gray-900">Conclusion:</strong>{" "}
                This displays the conclusions of the implementation and research.
              </span>
            </li>
            <li className="flex gap-x-3">
              <PlayCircleIcon
                className="mt-1 h-5 w-5 flex-none text-indigo-600"
                aria-hidden="true"
              />
              <span>
                <strong className="font-semibold text-gray-900">Play Game:</strong>{" "}
                This is the implementation of the game which can be played.
              </span>
            </li>
          </ul>
          </p>
        </div>
      </div>

    </main>
  )
}
