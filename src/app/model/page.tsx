"use client";

import Navigation from "../../components/Nav";
import {
  CheckCircleIcon,
  XCircleIcon,
  XMarkIcon
} from "@heroicons/react/20/solid";

import KripkeModelHidden from "./KipkeModelHidden";
import KripkeModelStart from "./KipkeModelStart";
import KripkeModelRound1 from "./KipkeModelRound1";
import KripkeModelRound2 from "./KipkeModelRound2";
import KripkeModelRound3 from "./KipkeModelRound3";
import CardDisplay from "../game/CardDisplay";
import SuitDisplay from "../game/SuitDisplay";
import EmptyCard from "../game/EmptyCard";

export default function Home() {
  return (
    <main className="">
      <Navigation />
      <div className="bg-white px-6 py-32 lg:px-8 text-justify">
        <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
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
          <h2>Formal Model</h2>
          <p>This project uses the following definitions in reference to the set of <strong>m</strong> agents <strong>A = &langle; a<sub>1</sub>, a<sub>2</sub>, ..., a<sub>m</sub> &rangle;</strong> and the set of propositional atoms <strong>P</strong>. The Kripke model <strong>M</strong> for quartets consists of the tuple &langle; <strong>S</strong>, <strong>&pi;</strong>, <strong>R<sub>1</sub></strong>, ..., <strong>R<sub>m</sub></strong> &rangle; where:</p>

          <ul>
            <li><strong>Set of States (S):</strong> The set <strong>S</strong> represents all possible states of the system. In this case, each state <em>s</em> represents a particular configuration of cards in each agent's hand.</li>
            <li><strong>Truth Assignment Function (&pi;):</strong> The function &pi;: S &rarr; (P &rarr; {<strong>t</strong>, <strong>f</strong>}) assigns truth values to propositional atoms for each state.</li>
            <li><strong>Accessibility Relations (R<sub>1</sub>, R<sub>2</sub>, ..., R<sub>m</sub>):</strong> The accessibility relations R<sub>i</sub> &sube; S &times; S represent the relations between different states in the model. These relations define the transitions or possible state changes within the system.</li>
          </ul>
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
                common knowledge that when a card is not present in the player&apos;s
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
                already present in the player&apos;s hand.
              </span>
            </li>
          </ul>
          <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
            <h1 className="mt-24 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Simplified model
            </h1>
            <p className="mt-6 text-xl leading-8">
              In order to be able to represent the knowledge in the game and the possible states, we make use of a
              simplified model.
              <br />
              The true state, shown by the green dot <span className="inline-block w-3 h-3 bg-green-500 rounded-full" /> in each Kripke model,
              is as follows:
              <ul className="flex justify-around mt-6 mb-12">
                <li>
                  <strong>Player 1: </strong>
                  <br />
                  <div className="flex gap-3">
                    <CardDisplay
                      hide={false}
                      card={{ color: "red", number: 0, id: "red-0" }}
                    />
                    <CardDisplay
                      hide={false}
                      card={{ color: "green", number: 0, id: "green-0" }}
                    />
                  </div>
                </li>
                <li>
                  <strong>Player 2: </strong>
                  <br />
                  <div className="flex gap-3">
                    <CardDisplay
                      hide={false}
                      card={{ color: "red", number: 1, id: "red-1" }}
                    />
                    <CardDisplay
                      hide={false}
                      card={{ color: "yellow", number: 0, id: "yellow-0" }}
                    />
                  </div>
                </li>
                <li>
                  <strong>Player 3: </strong>
                  <br />
                  <div className="flex gap-3">
                    <CardDisplay
                      hide={false}
                      card={{ color: "green", number: 1, id: "green-1" }}
                    />
                    <CardDisplay
                      hide={false}
                      card={{ color: "yellow", number: 1, id: "yellow-1" }}
                    />
                  </div>
                </li>
              </ul>
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-900">
              Inital state
            </h2>
            This represents the start of the game, when the cards have just been dealt between the three players.
            Nobody has seen their cards, so anything is possible.
            <KripkeModelHidden />
            <h2 className="mt-24 border-t border-gray-300 pt-24 text-2xl font-bold tracking-tight text-gray-900">
              Looking at cards
            </h2>
            Players have seen their own cards, but not the other players' cards.
            <br />
            In this scenario, we have the following true state:
            <br />
            <div>
              <ul className="flex justify-around mt-6 mb-12 rounded-md bg-slate-100 py-12">
                <b>True state</b>
                <li>
                  <strong>Player 1: </strong>
                  <br />
                  <div className="flex gap-3">
                    <CardDisplay
                      hide={false}
                      card={{ color: "red", number: 0, id: "red-0" }}
                    />
                    <CardDisplay
                      hide={false}
                      card={{ color: "green", number: 0, id: "green-0" }}
                    />
                  </div>
                </li>
                <li>
                  <strong>Player 2: </strong>
                  <br />
                  <div className="flex gap-3">
                    <CardDisplay
                      hide={false}
                      card={{ color: "red", number: 1, id: "red-1" }}
                    />
                    <CardDisplay
                      hide={false}
                      card={{ color: "yellow", number: 0, id: "yellow-0" }}
                    />
                  </div>
                </li>
                <li>
                  <strong>Player 3: </strong>
                  <br />
                  <div className="flex gap-3">
                    <CardDisplay
                      hide={false}
                      card={{ color: "green", number: 1, id: "green-1" }}
                    />
                    <CardDisplay
                      hide={false}
                      card={{ color: "yellow", number: 1, id: "yellow-1" }}
                    />
                  </div>
                </li>
              </ul>
            </div>
            {/* Player 1: Red 0, Green 0<br />
            Player 2: Red 1, Yellow 0<br />
            Player 3: Green 1, Yellow 1 */}
            <KripkeModelStart />
            <h2 className="mt-24 border-t border-gray-300 pt-24 text-2xl font-bold tracking-tight text-gray-900">
              Round 1
            </h2>
            Once the game starts, it is Player 1 who can ask for the first card. Player 1 decides to ask Player 2
            for Green 1.
            <br />
            <div>
              <ul className="flex justify-around mt-6 mb-12 rounded-md bg-slate-100 py-12">
                <b>True state</b>
                <li>
                  <strong>Player 1: </strong>
                  <br />
                  <div className="flex gap-3">
                    <CardDisplay
                      hide={false}
                      card={{ color: "red", number: 0, id: "red-0" }}
                    />
                    <CardDisplay
                      hide={false}
                      card={{ color: "green", number: 0, id: "green-0" }}
                    />
                  </div>
                </li>
                <li>
                  <strong>Player 2: </strong>
                  <br />
                  <div className="flex gap-3">
                    <CardDisplay
                      hide={false}
                      card={{ color: "red", number: 1, id: "red-1" }}
                    />
                    <CardDisplay
                      hide={false}
                      card={{ color: "yellow", number: 0, id: "yellow-0" }}
                    />
                  </div>
                </li>
                <li>
                  <strong>Player 3: </strong>
                  <br />
                  <div className="flex gap-3">
                    <CardDisplay
                      hide={false}
                      card={{ color: "green", number: 1, id: "green-1" }}
                    />
                    <CardDisplay
                      hide={false}
                      card={{ color: "yellow", number: 1, id: "yellow-1" }}
                    />
                  </div>
                </li>
              </ul>
            </div>
            As we can see above in the true state, Player 2 does not have the card Green 1. Because of this, there is certain common
            knowledge in the game, as follows:
            <br />
            <ul role="list" className="mt-8 max-w-xl space-y-2 text-gray-600">
              <li className="flex gap-x-3">
                <XCircleIcon
                  className="mt-1 h-5 w-5 flex-none text-indigo-600"
                  aria-hidden="true"
                />
                <span> Player 2 does not have Green 1 </span>
              </li>
              <li className="flex gap-x-3">
                <CheckCircleIcon
                  className="mt-1 h-5 w-5 flex-none text-indigo-600"
                  aria-hidden="true"
                />
                <span> Player 3 must have Green 1 </span>
              </li>
              <li className="flex gap-x-3">
                <CheckCircleIcon
                  className="mt-1 h-5 w-5 flex-none text-indigo-600"
                  aria-hidden="true"
                />
                <span> Player 1 must have Green 0 </span>
              </li>
            </ul>
            {/* - Player 2 does not have Green 1<br />
            - Player 3 must have Green 1<br />
            - Player 1 must have Green 0 <br /> */}
            <div>
              <ul className="flex justify-around mt-6 mb-12 rounded-md bg-slate-100 py-12">
                <li>
                  <strong>Player 1: </strong>
                  <br />
                  <div className="flex gap-3">
                    <CardDisplay
                      hide={true}
                      card={{ color: 'red', number: 0, id: 'red-0' }}
                    />
                    <CardDisplay
                      hide={false}
                      card={{ color: "green", number: 0, id: "green-0" }}
                    />
                  </div>
                </li>
                <li>
                  <strong>Player 2: </strong>
                  <br />
                  <div className="flex gap-3">
                    <div className="card-display-container" style={{ position: 'relative' }}>
                      <CardDisplay x={true} hide={false} card={{ color: 'green', number: 1, id: 'red-0' }} />
                    </div>
                    <CardDisplay
                      hide={true}
                      card={{ color: "yellow", number: 0, id: "yellow-0" }}
                    />
                  </div>
                </li>
                <li>
                  <strong>Player 3: </strong>
                  <br />
                  <div className="flex gap-3">
                    <CardDisplay
                      hide={false}
                      card={{ color: "green", number: 1, id: "yellow-1" }}
                    />
                    <CardDisplay
                      hide={true}
                      card={{ color: "yellow", number: 1, id: "yellow-1" }}
                    />
                  </div>
                </li>
              </ul>
            </div>

            <KripkeModelRound1 />
            <h2 className="mt-24 border-t border-gray-300 pt-24 text-2xl font-bold tracking-tight text-gray-900">
              Round 2
            </h2>
            As Player 1 did not get a card in Round 1, this round it is the turn of Player 2. Player 2 decides to ask
            Player 1 for Yellow 1.
            <br />
            <div>
              <ul className="flex justify-around mt-6 mb-12 rounded-md bg-slate-100 py-12">
                <b>True state</b>
                <li>
                  <strong>Player 1: </strong>
                  <br />
                  <div className="flex gap-3">
                    <CardDisplay
                      hide={false}
                      card={{ color: "red", number: 0, id: "red-0" }}
                    />
                    <CardDisplay
                      hide={false}
                      card={{ color: "green", number: 0, id: "green-0" }}
                    />
                  </div>
                </li>
                <li>
                  <strong>Player 2: </strong>
                  <br />
                  <div className="flex gap-3">
                    <CardDisplay
                      hide={false}
                      card={{ color: "red", number: 1, id: "red-1" }}
                    />
                    <CardDisplay
                      hide={false}
                      card={{ color: "yellow", number: 0, id: "yellow-0" }}
                    />
                  </div>
                </li>
                <li>
                  <strong>Player 3: </strong>
                  <br />
                  <div className="flex gap-3">
                    <CardDisplay
                      hide={false}
                      card={{ color: "green", number: 1, id: "green-1" }}
                    />
                    <CardDisplay
                      hide={false}
                      card={{ color: "yellow", number: 1, id: "yellow-1" }}
                    />
                  </div>
                </li>
              </ul>
            </div>
            As we can see above in the true state, Player 1 does not have the card Yelllow 1. Because of this, the common
            knowledge gets updated with the following:
            <br />
            <ul role="list" className="mt-8 max-w-xl space-y-2 text-gray-600">
              <li className="flex gap-x-3">
                <XCircleIcon
                  className="mt-1 h-5 w-5 flex-none text-indigo-600"
                  aria-hidden="true"
                />
                <span> Player 1 does not have Yellow 1 </span>
              </li>
              <li className="flex gap-x-3">
                <CheckCircleIcon
                  className="mt-1 h-5 w-5 flex-none text-indigo-600"
                  aria-hidden="true"
                />
                <span> Player 2 must have Yellow 0 </span>
              </li>
              <li className="flex gap-x-3">
                <CheckCircleIcon
                  className="mt-1 h-5 w-5 flex-none text-indigo-600"
                  aria-hidden="true"
                />
                <span> Player 3 must have Yellow 1 </span>
              </li>
              <li className="flex gap-x-3">
                <CheckCircleIcon
                  className="mt-1 h-5 w-5 flex-none text-indigo-600"
                  aria-hidden="true"
                />
                <span> Players 1 and 2 both have a red card </span>
              </li>
            </ul>
            <div>
              <ul className="flex justify-around mt-6 mb-12 rounded-md bg-slate-100 py-12">
                <li>
                  <strong>Player 1: </strong>
                  <br />
                  <div className="flex gap-3">
                    <div className="card-display-container" style={{ position: 'relative' }}>
                      <CardDisplay x={true} hide={false} card={{ color: 'yellow', number: 1, id: 'yellow-1' }} />
                    </div>
                    <CardDisplay
                      hide={false}
                      card={{ color: "green", number: 0, id: "green-0" }}
                    />
                    <EmptyCard key="red" suit="red" />
                  </div>
                </li>
                <li>
                  <strong>Player 2: </strong>
                  <br />
                  <div className="flex gap-3">
                    <div className="card-display-container" style={{ position: 'relative' }}>
                      <CardDisplay x={true} hide={false} card={{ color: 'green', number: 1, id: 'red-0' }} />
                    </div>
                    <CardDisplay
                      hide={false}
                      card={{ color: "yellow", number: 0, id: "yellow-0" }}
                    />
                    <EmptyCard key="red" suit="red" />
                  </div>
                </li>
                <li>
                  <strong>Player 3: </strong>
                  <br />
                  <div className="flex gap-3">
                    <CardDisplay
                      hide={false}
                      card={{ color: "green", number: 1, id: "yellow-1" }}
                    />
                    <CardDisplay
                      hide={false}
                      card={{ color: "yellow", number: 1, id: "yellow-1" }}
                    />
                  </div>
                </li>
              </ul>
            </div>
            {/* CK:
            <br />
            - Player 1 does not have Yellow 1<br />
            - Player 2 must have Yellow 0<br />
            - Player 3 must have Yellow 1<br /> */}
            <KripkeModelRound2 />
            <h2 className="mt-24 border-t border-gray-300 pt-24 text-2xl font-bold tracking-tight text-gray-900">
              Round 3
            </h2>
            Player 2 was not successful, so now the turn goes back to Player 1. Player 1 now asks Player 3 for
            Green 1. As Player 3 has Green 1 in its hand, Player 1 receives the card, resulting in Player 1
            having a Green Suite. This results in the true state: <br />
            <div>
              <ul className="flex justify-around mt-6 mb-12 rounded-md bg-slate-100 py-12">
                <b>True state</b>
                <li>
                  <strong>Player 1: </strong>
                  <br />
                  <div className="flex gap-3">
                    <CardDisplay
                      hide={false}
                      card={{ color: "red", number: 0, id: "red-0" }}
                    />
                    <CardDisplay
                      hide={false}
                      card={{ color: "green", number: 0, id: "green-0" }}
                    />
                    <CardDisplay
                      hide={false}
                      card={{ color: "green", number: 1, id: "green-1" }}
                    />
                  </div>
                </li>
                <li>
                  <strong>Player 2: </strong>
                  <br />
                  <div className="flex gap-3">
                    <CardDisplay
                      hide={false}
                      card={{ color: "red", number: 1, id: "red-1" }}
                    />
                    <CardDisplay
                      hide={false}
                      card={{ color: "yellow", number: 0, id: "yellow-0" }}
                    />
                  </div>
                </li>
                <li>
                  <strong>Player 3: </strong>
                  <br />
                  <div className="flex gap-3">
                    <CardDisplay
                      hide={false}
                      card={{ color: "yellow", number: 1, id: "yellow-1" }}
                    />
                  </div>
                </li>
              </ul>
            </div>
            Because of this move, the common knowledge is updated accordingly:
            <br />
            <ul role="list" className="mt-8 max-w-xl space-y-2 text-gray-600">
              <li className="flex gap-x-3">
                <CheckCircleIcon
                  className="mt-1 h-5 w-5 flex-none text-indigo-600"
                  aria-hidden="true"
                />
                <span> Player 1 has a Green suite </span>
              </li>
              <li className="flex gap-x-3">
                <XCircleIcon
                  className="mt-1 h-5 w-5 flex-none text-indigo-600"
                  aria-hidden="true"
                />
                <span> No player has a Green card in their hand anymore </span>
              </li>
            </ul>
            <div>
              <ul className="flex justify-around mt-6 mb-12 rounded-md bg-slate-100 py-12">
                <li>
                  <strong>Player 1: </strong>
                  <br />
                  <div className="flex gap-3">
                    <div className="card-display-container" style={{ position: 'relative' }}>
                      <CardDisplay x={true} hide={false} card={{ color: 'yellow', number: 1, id: 'yellow-1' }} />
                    </div>
                    <SuitDisplay key="green" suit="green" />
                    <EmptyCard key="red" suit="red" />
                  </div>
                </li>
                <li>
                  <strong>Player 2: </strong>
                  <br />
                  <div className="flex gap-3">
                    <CardDisplay
                      hide={false}
                      card={{ color: "yellow", number: 0, id: "yellow-0" }}
                    />
                    <EmptyCard key="red" suit="red" />
                  </div>
                </li>
                <li>
                  <strong>Player 3: </strong>
                  <br />
                  <div className="flex gap-3">
                    <CardDisplay
                      hide={false}
                      card={{ color: "yellow", number: 1, id: "yellow-1" }}
                    />
                  </div>
                </li>
              </ul>
            </div>
            {/* CK:
            <br />
            - Player 1 gets Green 1<br />
            - Player 1 gets a suite of Green cards
            <br />
            - No players have Green 0 or Green 1 in their hand anymore
            <br /> */}
            <KripkeModelRound3 />
            <h2 className="mt-24 border-t border-gray-300 pt-24 text-2xl font-bold tracking-tight text-gray-900">
              Round 4
            </h2>
            In the previous round, Player 1 was able to get the requested card, meaning that Player 1 can choose
            another card. Therefore, Player 1 asks Player 2 for Red 1. This results in Player 1 receiving the card
            Red 1, completing the Red suite. This results in the situation: <br />

            <div>
              <ul className="flex justify-around mt-6 mb-12 rounded-md bg-slate-100 py-12">
                <li>
                  <strong>Player 1: </strong>
                  <br />
                  <div className="flex gap-3">
                    <SuitDisplay key="green" suit="green" />
                    <SuitDisplay key="red" suit="red" />
                  </div>
                </li>
                <li>
                  <strong>Player 2: </strong>
                  <br />
                  <div className="flex gap-3">
                    <CardDisplay
                      hide={false}
                      card={{ color: "yellow", number: 0, id: "yellow-0" }}
                    />
                  </div>
                </li>
                <li>
                  <strong>Player 3: </strong>
                  <br />
                  <div className="flex gap-3">
                    <CardDisplay
                      hide={false}
                      card={{ color: "yellow", number: 1, id: "yellow-1" }}
                    />
                  </div>
                </li>
              </ul>
            </div>
            <br />
            As Player 1 already has 2 out of 3 suites, the game is finished, and Player 1 is the winner.
            <KripkeModelRound3 />
          </div>
        </div>
      </div>
    </main>
  );
}
