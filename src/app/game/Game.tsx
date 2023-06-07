import { useEffect, useRef, useState } from "react";
import CARD_LIST, { CARD_COLORS, NUM_COLORS, NUM_NUMBERS } from "./cards";
import { StrategyType } from "./types";
import OpponentDisplay from "./OpponentDisplay";
import PlayerDisplay from "./PlayerDisplay";
import ChoicePicker from "./ChoicePicker";

import GameEnvironment from "./GameEnvironment";

export default function Game() {
  const gameEnvironment = useRef(new GameEnvironment());

  const [gameState, setGameState] = useState(gameEnvironment.current.state);

  // Add a callback using gameEnvironment.current.setGameStateCallback(). This returns a new state, which has to be passed to setGameState().
  useEffect(() => {
    function updateGameState(newState: any) {
      setGameState((prevState) => ({ ...prevState, ...newState }));
    }

    gameEnvironment.current.setGameStateCallback(updateGameState);
  }, []);

  const [hideOpponentCards, setHideOpponentCards] = useState<boolean>(true);

  return (
    <div className="bg-white">
      {/* Toolbar with gray background */}
      <div className="bg-slate-100">
        <div className="flex flex-row items-center justify-between mx-auto max-w-7xl p-6 lg:px-8">
          <div>There are {NUM_COLORS} possible colors.</div>
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

      {/* 3 column layout */}
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-3 gap-4 p-6 lg:px-8">
          <div>
            <OpponentDisplay
              cards={gameState.opponent1.cards}
              suits={gameState.opponent1.suits}
              name="Opponent 1"
              hide={hideOpponentCards}
            />
          </div>
          <div>
            <OpponentDisplay
              cards={gameState.opponent2.cards}
              suits={gameState.opponent2.suits}
              name="Opponent 2"
              hide={hideOpponentCards}
            />
          </div>
          <div>
            <PlayerDisplay
              cards={gameState.player.cards}
              suits={gameState.player.suits}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 p-6 lg:px-8">
          <div>
            <div className="text-slate-600 font-bold mb-2">Opponent 1</div>
            <div className="mb-2">
              <div className="text-slate-600 mt-2">Strategy</div>
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
              🧠 <strong className="text-pink-700">Choice:</strong> Ask{" "}
              {gameState.opponent1.question.agent} for{" "}
              {gameState.opponent1.question.card?.id}
            </div>
            {gameState.turn === "opponent1" && (
              <div className="mt-4">
                <button
                  className="bg-pink-700 text-white px-4 py-2 rounded-md"
                  onClick={() =>
                    gameEnvironment.current.askForCard(
                      "opponent1",
                      gameState.opponent1.question.agent,
                      gameState.opponent1.question.card
                    )
                  }
                >
                  Ask
                </button>
              </div>
            )}
          </div>
          <div>
            <div className="text-slate-600 font-bold mb-2">Opponent 2</div>
            <div className="mb-2">
              <div className="text-slate-600 mt-2">Strategy</div>
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
              🧠 <strong className="text-pink-700">Choice:</strong> Ask{" "}
              {gameState.opponent2.question.agent} for{" "}
              {gameState.opponent2.question.card?.id}
            </div>
            {gameState.turn === "opponent2" && (
              <div className="mt-4">
                <button
                  className="bg-pink-700 text-white px-4 py-2 rounded-md"
                  onClick={() =>
                    gameEnvironment.current.askForCard(
                      "opponent2",
                      gameState.opponent2.question.agent,
                      gameState.opponent2.question.card
                    )
                  }
                >
                  Ask
                </button>
              </div>
            )}
          </div>
          <div>
            <div className="text-slate-600 font-bold mb-2">You</div>
            <div className="mb-2">
              <div className="text-slate-600 mt-2">Strategy</div>
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
              🧠 <strong className="text-pink-700">Choice:</strong> Ask{" "}
              {gameState.player.question.agent} for{" "}
              {gameState.player.question.card?.id}
            </div>
            {gameState.turn === "player" && (
              <div className="mt-4">
                <button
                  className="bg-pink-700 text-white px-4 py-2 rounded-md"
                  onClick={() =>
                    gameEnvironment.current.askForCard(
                      "player",
                      gameState.player.question.agent,
                      gameState.player.question.card
                    )
                  }
                >
                  Ask
                </button>
              </div>
            )}
            {gameState.turn === "player" && (
              <>
                <div className="text-slate-600 mt-4">Manual selection</div>
                <div className="bg-slate-100 flex flex-row items-center justify-between mx-auto max-w-7xl p-4 rounded-md mt-4">
                  <ChoicePicker
                    turn={gameState.turn}
                    agents={gameEnvironment.current.agents}
                    askForCard={(p, a, c) => {
                      gameEnvironment.current.askForCard(p, a, c);
                    }}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="bg-red-500 bg-yellow-500 bg-green-500 bg-blue-500 bg-indigo-500 bg-purple-500 bg-pink-500 bg-gray-500 hidden"></div>
    </div>
  );
}
