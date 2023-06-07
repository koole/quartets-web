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
    </main>
  )
}
