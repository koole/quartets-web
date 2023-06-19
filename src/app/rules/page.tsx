"use client";

import Image from "next/image";
import Navigation from "../../components/Nav";

export default function Home() {
  return (
    <main className="">
      <Navigation />
      <div className="bg-white px-6 py-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Game Rules
          </h1>
          <p className="mt-6 text-xl leading-8 text-justify">
            Quartets is a dedicated deck card game consisting of 32 cards, divided into eight suites of four cards each.
            In the case of our implementation, we chose to use a simplified version of the game, with 6 different colours 
            for the cards, namely:
            <ul className="flex gap-3 my-3">
              <li>
                <span className="inline-block w-4 h-4 mr-2 rounded bg-red-500"></span>
                Red
              </li>
              <li>
                <span className="inline-block w-4 h-4 mr-2 rounded bg-yellow-500"></span>
                Yellow
              </li>
              <li>
                <span className="inline-block w-4 h-4 mr-2 rounded bg-green-500"></span>
                Green
              </li>
              <li>
                <span className="inline-block w-4 h-4 mr-2 rounded bg-blue-500"></span>
                Blue
              </li>
              <li>
                <span className="inline-block w-4 h-4 mr-2 rounded bg-purple-500"></span>
                Purple
              </li>
              <li>
                <span className="inline-block w-4 h-4 mr-2 rounded bg-pink-500"></span>
                Pink
              </li>
            </ul>
          </p>
          <p className="mt-6 text-justify">
            The game is played with three or more players, and the objective is to collect as many full suites of four cards
            as possible. In the current game, there are 3 players out of which two of them are the automated agents following
            a certain strategy. These strategies are further discussed on the Experiment page.
          </p>
          <p className="mt-6 text-justify">
            At the beginning of the game, the deck of cards is shuffled, and each player is dealt an equal number of cards. 
            Players should keep their cards hidden from other players. To start the game, a player is randomly chosen to make the first move. 
            They can ask another player for a specific card from a suite, provided that they already have a card from that suite in their hand. Players can not ask for a card that they already have in their hand.
          </p>
          <p className="mt-6 text-justify">
            For example, if a player has a blue card in their hand with the number 1, then they can ask another player
            for the card blue 2.
            
            
            
            If the player being asked has the requested card, they must give it to the asking player, who then gets another turn to ask for a card. If the player being asked does not have the requested card, it becomes their turn to ask for a card.
            Whenever a player collects a full suite of four cards, known as a &quot;Quartet,&quot; they must place the suite face-up in front of them. The game continues until all the quartets have been formed. Once all the quartets have been created, the game ends, and the player with the most quartets is declared the winner.
            It&apos;s important to note that Quartets has many variations to its rules, so the aforementioned rules are our interpretation of the game.
          </p>
        </div>
      </div>



    </main>
  )
}