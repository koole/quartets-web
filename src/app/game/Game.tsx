import { useEffect, useRef, useState } from "react";
import CARD_LIST, { CARD_COLORS, NUM_COLORS, NUM_NUMBERS } from "./cards";
import { StrategyComboType, StrategyType } from "./types";
import OpponentDisplay from "./OpponentDisplay";
import PlayerDisplay from "./PlayerDisplay";
import ChoicePicker from "./ChoicePicker";

import GameEnvironment from "./GameEnvironment";

const agentSentences = [
  "Agent is making a strategic move",
  "Agent is thinking hard",
  "Agent looks to be deliberating his moves well",
  "Agent is calculating the best approach",
  "Agent is analyzing the situation",
  "Agent is considering all possible options",
  "Agent is evaluating the next move",
  "Agent is formulating a plan",
  "Agent is strategizing its next move",
  "Agent is pondering its options",
  "Agent is weighing the pros and cons",
  "Agent is deep in thought",
  "Agent is assessing the risks",
  "Agent is plotting its strategy",
  "Agent is anticipating the opponent's moves",
  "Agent is surveying the game board",
  "Agent is contemplating its next step",
  "Agent is mulling over the possibilities",
  "Agent is examining different scenarios",
  "Agent is devising a tactical maneuver",
  "Agent is analyzing the battlefield",
  "Agent is strategizing its approach",
  "Agent is carefully considering its options",
  "Agent is calculating the optimal move",
  "Agent is weighing the consequences",
  "Agent is contemplating its next move",
  "Agent is studying the opponent's strategy",
  "Agent is formulating a master plan",
  "Agent is searching for weaknesses",
  "Agent is brainstorming tactics",
  "Agent is envisioning different outcomes",
  "Agent is adjusting its strategy",
  "Agent is evaluating the potential risks",
  "Agent is simulating possible moves",
  "Agent is anticipating the opponent's reactions",
  "Agent is fine-tuning its plan",
  "Agent is focusing on long-term strategy",
  "Agent is exploring alternative approaches",
  "Agent is considering unconventional tactics",
  "Agent is analyzing the game from multiple angles",
];

const env = new GameEnvironment();

export default function Game() {
  const gameEnvironment = useRef(env);

  const [gameState, setGameState] = useState(gameEnvironment.current.state);
  const [agentSentence, setAgentSentence] = useState<string>(
    agentSentences[Math.floor(Math.random() * agentSentences.length)]
  );

  // Add a callback using gameEnvironment.current.setGameStateCallback(). This returns a new state, which has to be passed to setGameState().
  useEffect(() => {
    function updateGameState(newState: any) {
      setAgentSentence(
        agentSentences[Math.floor(Math.random() * agentSentences.length)]
      );
      setGameState((prevState) => ({ ...prevState, ...newState }));
    }

    gameEnvironment.current.setGameStateCallback(updateGameState);
  }, []);

  const [hideOpponentCards, setHideOpponentCards] = useState<boolean>(true);

  // Create array with colors for heatmap, ordered by color, from red to gray to green

  const tailwind_heatmap = [
    "bg-red-500",
    "bg-red-500",
    "bg-red-400",
    "bg-red-400",
    "bg-red-300",
    "bg-red-300",
    "bg-red-200",
    "bg-red-200",
    "bg-red-100",
    "bg-red-100",
    "bg-green-100",
    "bg-green-100",
    "bg-green-100",
    "bg-green-100",
    "bg-green-200",
    "bg-green-200",
    "bg-green-200",
    "bg-green-300",
    "bg-green-300",
    "bg-green-400",
    "bg-green-400",
    "bg-green-400",
    "bg-green-500",
    "bg-green-500",
    "bg-green-500",
    "bg-green-500",
    "bg-green-500",
    "bg-green-500",
  ];

  return (
    <div className="bg-white">
      {/* Toolbar with gray background */}
      <div className="bg-slate-300">
        <div className="flex flex-row items-center justify-between mx-auto max-w-7xl p-6 lg:px-8">
          <div className="text-slate-700 font-bold">
            There are {NUM_COLORS} possible colors. Each color has {NUM_NUMBERS}{" "}
            numbers to collect.
          </div>
          <div className="flex flex-row items-center justify-center">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-gray-600"
              checked={hideOpponentCards}
              onChange={() => setHideOpponentCards(!hideOpponentCards)}
            />
            <div className="ml-2 text-gray-700">Hide opponent cards</div>
          </div>
        </div>
      </div>

      <div className="bg-slate-100">
        <div className="flex flex-row items-center justify-between mx-auto max-w-7xl p-6 lg:px-8">
          <div className="flex flex-row">
            <div className="mr-2 text-slate-700 font-bold">Turn:</div>
            <div className="mr-6 text-black">{gameState.turn_count}</div>
            <div className="mr-2 text-slate-700 font-bold">Wins:</div>
            <div className="flex flex-row items-center justify-center">
              <div className="mr-2 text-black">
                You: {gameState.wins.player}
              </div>
              <div className="mr-2 text-black">
                Abélard: {gameState.wins.opponent1}
              </div>
              <div className="mr-2 text-black">
                Héloïse: {gameState.wins.opponent2}
              </div>
            </div>
          </div>
          <div>
            {!gameState.autoPlaying ? (
              <button
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded border border-indigo-500"
                onClick={() => gameEnvironment.current.startAutoStep()}
              >
                Start autoplay
              </button>
            ) : (
              <button
                className="bg-white hover:bg-white text-indigo-700 font-bold py-2 px-4 rounded border border-indigo-500"
                onClick={() => gameEnvironment.current.stopAutoStep()}
              >
                Stop autoplay
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 3 column layout */}
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-3 gap-4 p-6 lg:px-8">
          <div>
            <div className="flex items-center mb-2">
              <img
                className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"
                src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=80&h=80&q=80"
                alt=""
              />
              <div className="ml-2 mb-2">
                <p className="text-slate-600 font-medium">Abélard</p>
                <p className="text-sm text-gray-500">Agent</p>
              </div>
            </div>
            <OpponentDisplay
              cards={gameState.opponent1.cards}
              suits={gameState.opponent1.suits}
              name="Abélard"
              hide={hideOpponentCards}
            />
          </div>
          <div>
            <div className="flex items-center mb-2">
              <img
                className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"
                src="https://images.unsplash.com/photo-1601266248790-e5764feb7652?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=80&h=80&q=80"
                alt=""
              />
              <div className="ml-2 mb-2">
                <p className="text-slate-600 font-medium">Héloïse</p>
                <p className="text-sm text-gray-500">Agent</p>
              </div>
            </div>
            <OpponentDisplay
              cards={gameState.opponent2.cards}
              suits={gameState.opponent2.suits}
              name="Héloïse"
              hide={hideOpponentCards}
            />
          </div>
          <div>
            <div className="flex items-center mb-2">
              <img
                className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"
                src="https://images.unsplash.com/photo-1516171376399-369bb30c382c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=80&h=80&q=80"
                alt=""
              />
              <div className="ml-2 mb-2">
                <p className="text-slate-600 font-medium">You</p>
                <p className="text-sm text-gray-500">Human</p>
              </div>
            </div>
            <PlayerDisplay
              cards={gameState.player.cards}
              suits={gameState.player.suits}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 p-6 lg:px-8">
          <div>
            <div className="mb-2">
              <div className="text-slate-600 mt-2">Strategy: {gameState.opponent1.strategy}</div>
              <select
                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={gameState.opponent1.strategy}
                onChange={(e) =>
                  gameEnvironment.current.changeStrategy(
                    "opponent1",
                    e.target.value as StrategyType
                  )
                }
              >
                {gameEnvironment.current.strategies.map((strategy) => (
                  <option key={strategy} value={strategy}>
                    {strategy}
                  </option>
                ))}
              </select>
            </div>
            <div className="bg-pink-100 p-4 rounded-md text-sm text-pink-800">
              🧠 <strong className="text-pink-700">Strategy pick:</strong> Ask{" "}
              {gameState.opponent1.question.agent} for{" "}
              {gameState.opponent1.question.card?.id}
            </div>
            {gameState.turn === "opponent1" && (
              <div className="flex items-center">
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-pink-600 mt-2"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                </div>

                <div className="mt-2 font-bold text-pink-700">
                  {agentSentence}
                </div>
              </div>
            )}
          </div>
          <div>
            <div className="mb-2">
              <div className="text-slate-600 mt-2">Strategy: {gameState.opponent2.strategy}</div>
              <select
                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={gameState.opponent2.strategy}
                onChange={(e) =>
                  gameEnvironment.current.changeStrategy(
                    "opponent2",
                    e.target.value as StrategyType
                  )
                }
              >
                {gameEnvironment.current.strategies.map((strategy) => (
                  <option key={strategy} value={strategy}>
                    {strategy}
                  </option>
                ))}
              </select>
            </div>
            <div className="bg-pink-100 p-4 rounded-md text-sm text-pink-800">
              🧠 <strong className="text-pink-700">Strategy pick:</strong> Ask{" "}
              {gameState.opponent2.question.agent} for{" "}
              {gameState.opponent2.question.card?.id}
            </div>
            {gameState.turn === "opponent2" && (
              <div className="flex items-center">
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-pink-600 mt-2"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                </div>

                <div className="mt-2 font-bold text-pink-700">
                  {agentSentence}
                </div>
              </div>
            )}
          </div>
          <div>
            <div className="mb-2">
              <div className="text-slate-600 mt-2">Strategy: {gameState.player.strategy}</div>
              <select
                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={gameState.player.strategy}
                onChange={(e) =>
                  gameEnvironment.current.changeStrategy(
                    "player",
                    e.target.value as StrategyType
                  )
                }
              >
                {gameEnvironment.current.strategies.map((strategy) => (
                  <option key={strategy} value={strategy}>
                    {strategy}
                  </option>
                ))}
              </select>
            </div>
            <div className="bg-pink-100 p-4 rounded-md text-sm text-pink-800">
              🧠 <strong className="text-pink-700">Strategy pick:</strong> Ask{" "}
              {gameState.player.question.agent} for{" "}
              {gameState.player.question.card?.id}
            </div>
            <div
              className={`bg-slate-100 flex flex-row items-center justify-between mx-auto max-w-7xl p-4 rounded-md mt-2 ${
                gameState.turn !== "player"
                  ? "opacity-20 pointer-events-none"
                  : ""
              }`}
            >
              <ChoicePicker
                turn={gameState.turn}
                agents={gameEnvironment.current.agents}
                heldCards={gameState.player.cards}
                askForCard={(p, a, c) => {
                  gameEnvironment.current.askForCard(p, a, c);
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 mx-auto max-w-7xl p-6">
        <div className="text-slate-600 mt-2">Results</div>
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
              >
                Strategy
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Random & Random
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Random & Most Cards
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Random & Smart
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Most Cards & Most Cards
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Most Cards & Smart
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Smart & Smart
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {gameEnvironment.current.strategies.map((strategy) => (
              <tr key={strategy}>
                <td className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                  {strategy}
                </td>
                {/* Loop over object keys of strategy */}
                {Object.entries(gameState.results[strategy]).map(
                  ([key, value]) => {
                    let percentage: number | null =
                      Math.round(
                        (value.wins / (value.wins + value.losses)) * 100
                      ) || 0;
                    if (value.wins === 0 && value.losses === 0) {
                      percentage = null;
                    }
                    // Get the color for the bar based on the percentage from tailwind_heatmap array
                    // Calculate index based on percentage
                    let color = "gray-100";
                    if (percentage !== null) {
                      const index = Math.round(
                        (percentage / 100) * (tailwind_heatmap.length - 1)
                      );
                      // Get the color from the array
                      color = tailwind_heatmap[index];
                    }
                    return (
                      <td
                        className={`px-3 py-3.5 text-left text-sm font-semibold text-gray-900 ${color}`}
                        key={`${strategy}-${key}`}
                      >
                        {percentage === null ? "-" : `${percentage}%`}
                      </td>
                    );
                  }
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
