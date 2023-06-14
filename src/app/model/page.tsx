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
      <div className="bg-white px-6 py-32 lg:px-8 text-justify">
        <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
          <p className="text-base font-semibold leading-7 text-indigo-600">
            Model
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Model
          </h1>
          <p className="mt-6 text-xl leading-8">
            The task of translating the game of Quartets to a Kripke model was extensive, as various states were
            possible for each player in the game. With 24 cards present in the game, the number of 
            combinations to be modelled increased significantly. Moreover, once a move is made throughout the game, the whole 
            model had to be updated
            
          </p>
          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
            Common knowledge
          </h2>
          <div className="mt-6 max-w-2xl">
            <p>
              All agents start out with the following common knowledge about the
              game:
            </p>
          </div>
          <ul role="list" className="mt-8 max-w-xl space-y-8 text-gray-600">
            <li className="flex gap-x-3">
              <CheckCircleIcon
                className="mt-1 h-5 w-5 flex-none text-indigo-600"
                aria-hidden="true"
              />
              <span>
                <strong className="font-semibold text-gray-900"></strong>{" "}
                In total, there are 24 cards which are divided into 6 different colours. For each colour, 
                the cards are numbered from 0 to 3, and a player can have a quartet when all of those 4 numbers
                of the same colour are collected.
              </span>
            </li>
            <li className="flex gap-x-3">
              <CheckCircleIcon
                className="mt-1 h-5 w-5 flex-none text-indigo-600"
                aria-hidden="true"
              />
              <span>
                <strong className="font-semibold text-gray-900"></strong>{" "}
                It is common knowledge that when a card is not present in the player's own hand, then it 
                means that one of the other players must have this card. 
              </span>
            </li>
            <li className="flex gap-x-3">
              <CheckCircleIcon
                className="mt-1 h-5 w-5 flex-none text-indigo-600"
                aria-hidden="true"
              />
              <span>
                <strong className="font-semibold text-gray-900"></strong>{" "}
                If a player does not place on the table four cards of the same colour, forming a quartet, then
                it means that the specific player does not have a quartet in hand. 
              </span>
            </li>
            <li className="flex gap-x-3">
              <CheckCircleIcon
                className="mt-1 h-5 w-5 flex-none text-indigo-600"
                aria-hidden="true"
              />
              <span>
                <strong className="font-semibold text-gray-900"></strong>{" "}
                It is common knowledge that a player can only ask for a colour that is already present in the 
                player's hand.
              </span>
            </li>
          </ul>
          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
            Strategies
          </h2>
          <div className="mt-6 max-w-2xl">
            <p>
              In order to find the best strategy for the game of Quartets, we implemented the following ones:
            </p>
            <ul role="list" className="mt-8 max-w-xl space-y-8 text-gray-600">
              <li className="flex gap-x-3">
                <CheckCircleIcon
                  className="mt-1 h-5 w-5 flex-none text-indigo-600"
                  aria-hidden="true"
                />
                <span>
                  <strong className="font-semibold text-gray-900">
                    Random.
                  </strong>{" "}
                  The player can ask for a random card depending on the cards that are in its own hand. However,
                  the random card that is selected still needs to follow the rules of the game. This means that 
                  the colour needs to already be in the player's hand.
                </span>
              </li>
              <li className="flex gap-x-3">
                <CheckCircleIcon
                  className="mt-1 h-5 w-5 flex-none text-indigo-600"
                  aria-hidden="true"
                />
                <span>
                  <strong className="font-semibold text-gray-900">
                    Most Cards.
                  </strong>{" "}
                  Asks another player for a card they currently have most cards
                  of. If we have knowledge about another agent having a card of
                  this color, ask that agent for that card. Otherwise, ask a
                  random agent for that card.
                </span>
              </li>
              <li className="flex gap-x-3">
                <CheckCircleIcon
                  className="mt-1 h-5 w-5 flex-none text-indigo-600"
                  aria-hidden="true"
                />
                <span>
                  <strong className="font-semibold text-gray-900">
                    Stealth mode
                  </strong>{" "}
                  The agent attempts to keep knowledge about their cards secret
                  from other agents. It does this by only asking for cards
                  colors it knows the other agents already know it has. This
                  way, the other agents gain no new knowledge about the agent's
                  card colors.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
