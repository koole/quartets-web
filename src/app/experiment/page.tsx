import Footer from "@/components/Footer";
import Navigation from "../../components/Nav";
import {
  CheckCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/20/solid";

export default function Home() {
  return (
    <main className="">
      <Navigation />
      <div className="bg-white px-6 py-32 pb-6 lg:px-8 text-justify">
        <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Experiment
          </h1>
        </div>
      </div>
      <div className="bg-white px-6 pb-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
          <p className="mt-6 text-xl leading-8">
            In this experiment, all the agent strategies are compared to each
            other, in order to answer the following research question:
          </p>
          <p>
            <span
              className="special-text"
              style={{
                display: "block",
                textAlign: "center",
                fontSize: "1.2rem",
                fontWeight: "bold",
                marginTop: "1.5rem",
              }}
            >
              Which of the Kripke model based strategies performs best in the
              game of Quartets?
            </span>
            <br />
            In our hypothesis, we propose that the random strategy will exhibit
            the poorest performance and achieve the lowest win percentage among
            all the strategies under examination. Additionally, we anticipate
            that Combined strategy will outperform firstOrder and secondOrder in
            terms of overall effectiveness and win rates.
          </p>

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
            Method
          </h2>
          <p className="mt-6">
            For this experiment, instead of including the player, three agents
            are used. Each agent is assigned a strategy such that all
            combinations of strategies are pitted against each other. This
            experiment is run for 1.000 episodes per strategy combination, and
            the total win rate is tallied up.
          </p>

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
            Strategies
          </h2>
          <div className="mt-6 max-w-2xl">
            <p>
              In order to find the best strategy for the game of Quartets, we
              implemented the following ones:
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
                  The player can ask for a random card depending on the cards
                  that are in its own hand. The random card that is selected
                  still needs follows the rules of the game. This means that the
                  colour needs to already be in the player&apos;s hand. It will
                  also not ask for a card that it already has, but uses no
                  knowledge about the other agents.
                </span>
              </li>
              <li className="flex gap-x-3">
                <CheckCircleIcon
                  className="mt-1 h-5 w-5 flex-none text-indigo-600"
                  aria-hidden="true"
                />
                <span>
                  <strong className="font-semibold text-gray-900">
                    First Order
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
                    Second Order
                  </strong>{" "}
                  The agent attempts to keep knowledge about their cards secret
                  from other agents. It does this by only asking for cards
                  colors it knows the other agents already know it has. This
                  way, the other agents gain no new knowledge about the
                  agent&apos;s card colors.
                </span>
              </li>
              <li className="flex gap-x-3">
                <CheckCircleIcon
                  className="mt-1 h-5 w-5 flex-none text-indigo-600"
                  aria-hidden="true"
                />
                <span>
                  <strong className="font-semibold text-gray-900">
                    Combined
                  </strong>{" "}
                  The agent combines the first and second order strategies. This
                  means that the agent will ask for a card that it knows the
                  other agents know it has, and if it does not have any of those
                  cards, it will fall back to the first order strategy and ask
                  for a card that it knows the other agents have the most of.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
