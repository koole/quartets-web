"use client";

import Image from 'next/image'
import Header from '../components/Header'
import Navigation from '../components/Nav';
import Game from './game/Game';

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
          Quartets is a classic card game similar to the likes of Go Fish or Happy Families
          where the ultimate objective is to collect a full suite of four cards. This website is
          dedicated to describing Quartets in terms of modal epistemic logic using Kripke
          models and offers a playable version of the game. This website is structured as
          follows...
          </p>
        </div>
      </div>

    </main>
  )
}
