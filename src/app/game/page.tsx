"use client";

import Footer from "@/components/Footer";
import Navigation from "../../components/Nav";
import Game from "./Game";

export default function Home() {
  return (
    <main className="">
      <Navigation />
      <Game />
      <Footer />
    </main>
  );
}
