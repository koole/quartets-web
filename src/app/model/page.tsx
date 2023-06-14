"use client";

import Image from "next/image";
import Navigation from "../../components/Nav";
import {
  CheckCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/20/solid";

import KripkeModelHidden from "../game/KipkeModelHidden";
import KripkeModelStart from "../game/KipkeModelStart";
import KripkeModelRound1 from "../game/KipkeModelRound1";
import KripkeModelRound2 from "../game/KipkeModelRound2";
import KripkeModelRound3 from "../game/KipkeModelRound3";

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
            The task of translating the game of Quartets to a Kripke model was
            extensive, as various states were possible for each player in the
            game. With 24 cards present in the game, the number of combinations
            to be modelled increased significantly. Moreover, once a move is
            made throughout the game, the whole model had to be updated
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
                <strong className="font-semibold text-gray-900"></strong> In
                total, there are 24 cards which are divided into 6 different
                colours. For each colour, the cards are numbered from 0 to 3,
                and a player can have a quartet when all of those 4 numbers of
                the same colour are collected.
              </span>
            </li>
            <li className="flex gap-x-3">
              <CheckCircleIcon
                className="mt-1 h-5 w-5 flex-none text-indigo-600"
                aria-hidden="true"
              />
              <span>
                <strong className="font-semibold text-gray-900"></strong> It is
                common knowledge that when a card is not present in the player's
                own hand, then it means that one of the other players must have
                this card.
              </span>
            </li>
            <li className="flex gap-x-3">
              <CheckCircleIcon
                className="mt-1 h-5 w-5 flex-none text-indigo-600"
                aria-hidden="true"
              />
              <span>
                <strong className="font-semibold text-gray-900"></strong> If a
                player does not place on the table four cards of the same
                colour, forming a quartet, then it means that the specific
                player does not have a quartet in hand.
              </span>
            </li>
            <li className="flex gap-x-3">
              <CheckCircleIcon
                className="mt-1 h-5 w-5 flex-none text-indigo-600"
                aria-hidden="true"
              />
              <span>
                <strong className="font-semibold text-gray-900"></strong> It is
                common knowledge that a player can only ask for a colour that is
                already present in the player's hand.
              </span>
            </li>
          </ul>
          <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
            <h1 className="mt-24 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Simplified model
            </h1>
            <p className="mt-6 text-xl leading-8">
              Intro...
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-900">
              Inital state
            </h2>
            Nobody has seen their cards, anything is possible
            <KripkeModelHidden />
            <h2 className="mt-24 border-t border-gray-300 pt-24 text-2xl font-bold tracking-tight text-gray-900">
              Looking at cards
            </h2>
            Players have seen their cards, but not the other players cards.
            <br />
            Players have the following cards:
            <br />
            Player 1: Red 0, Green 0<br />
            Player 2: Red 1, Yellow 0<br />
            Player 3: Green 1, Yellow 1
            <KripkeModelStart />
            <h2 className="mt-24 border-t border-gray-300 pt-24 text-2xl font-bold tracking-tight text-gray-900">
              Round 1
            </h2>
            Player 1 asks player 2 for Green 1.
            <br />
            CK:
            <br />
            - Player 2 does not have Green 1<br />
            - Player 3 must have Green 1<br />
            - Player 1 must have Green 0
            <KripkeModelRound1 />
            <h2 className="mt-24 border-t border-gray-300 pt-24 text-2xl font-bold tracking-tight text-gray-900">
              Round 2
            </h2>
            Player 2 asks player 1 for Yellow 1.
            <br />
            CK:
            <br />
            - Player 1 does not have Yellow 1<br />
            - Player 2 must have Yellow 0<br />
            - Player 3 must have Yellow 1<br />
            <KripkeModelRound2 />
            <h2 className="mt-24 border-t border-gray-300 pt-24 text-2xl font-bold tracking-tight text-gray-900">
              Round 3
            </h2>
            Player 1 asks Player 3 for Green 1<br />
            CK:
            <br />
            - Player 1 gets Green 1<br />
            - Player 1 gets a suite of Green cards
            <br />
            - No players have Green 0 or Green 1 in their hand anymore
            <br />
            <KripkeModelRound3 />
            <h2 className="mt-24 border-t border-gray-300 pt-24 text-2xl font-bold tracking-tight text-gray-900">
              Round 4
            </h2>
            Player 1 asks Player 2 for Red 1<br />
            CK:
            <br />
            - Player 1 gets Red 1<br />
            - Player 1 gets a suite of Red cards
            <br />
            - No players have Red 0 or Red 1 in their hand anymore
            <br />
            Player 1 wins as they have 2 out of 3 suits already.
            <KripkeModelRound3 />
          </div>
        </div>
      </div>
    </main>
  );
}
