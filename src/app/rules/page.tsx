import Navigation from "../../components/Nav";
import {
  CheckCircleIcon,
} from "@heroicons/react/20/solid";

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
            Quartets is a dedicated deck card game consisting of 32 cards,
            divided into eight suites of four cards each. In the case of our
            implementation, we chose to use a simplified version of the game,
            with 6 different colours for the cards, namely:
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
            The game is played with three or more players, and the objective is
            to collect as many full suites of four cards as possible. In the
            current game, there are 3 players out of which two of them are the
            automated agents following a certain strategy. These strategies are
            further discussed on the Experiment page.
          </p>
          <p className="mt-6 text-justify">
            At the beginning of the game, the deck of cards is shuffled, and
            each player is dealt an equal number of cards. Players should keep
            their cards hidden from other players. To start the game, a player
            is randomly chosen to make the first move.
          </p>
          <ol className="list-decimal pl-8">
            <li className="mt-6 text-justify">
              Players can ask another player for a specific card from a suite,
              provided that they already have a card from that suite in their
              hand.
            </li>
            <li className="my-2">
              Players can not ask for a card that they already have in their
              hand.
            </li>
            <li className="my-2">
              If a player has no more cards, they can ask for any card they
              want.
            </li>
            <li className="my-2">
              If the player being asked has the requested card, they must give
              it to the asking player, who then gets another turn to ask for a
              card.
            </li>
            <li className="my-2">
              If the player being asked does not have the requested card, it
              becomes their turn to ask for a card.
            </li>
            <li className="my-2">
              Whenever a player collects a full suite of four cards, known as a
              &quot;Quartet,&quot; they must place the suite face-up in front of
              them.
            </li>
            <li className="my-2">
              The game continues until all the quartets have been formed. Once
              all the quartets have been created, the game ends, and the player
              with the most quartets is declared the winner.
            </li>
          </ol>
          <p className="mt-6 text-justify">
            For example, if a player has a blue card in their hand with the
            number 1, then they can ask another player for the card blue 2. If
            the player being asked has the requested card, they must give it to
            the asking player, who then gets another turn to ask for a card. If
            the player being asked does not have the requested card, it becomes
            their turn to ask for a card. Whenever a player collects a full
            suite of four cards, known as a &quot;Quartet,&quot; they must place
            the suite face-up in front of them. The game continues until all the
            quartets have been formed. Once all the quartets have been created,
            the game ends, and the player with the most quartets is declared the
            winner. It&apos;s important to note that Quartets has many
            variations to its rules, so the aforementioned rules are our
            interpretation of the game.
          </p>
          <div className="mt-6 max-w-2xl">
            <p>
              All agents start out with a number of prerequisite knowledge about
              the game:
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
                common knowledge that when a card is not present in the
                player&apos;s own hand, then it means that one of the other
                players must have this card.
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
        </div>
      </div>
    </main>
  );
}
