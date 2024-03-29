"use client";

import { useEffect, useRef, useState } from "react";
import CARD_LIST, { CARD_COLORS, NUM_COLORS, NUM_NUMBERS } from "./cards";
import { StrategyComboType, StrategyType } from "./types";
import OpponentDisplay from "./OpponentDisplay";
import PlayerDisplay from "./PlayerDisplay";
import ChoicePicker from "./ChoicePicker";
import { FixedSizeList, FixedSizeList as List } from "react-window";

import GameEnvironment from "./GameEnvironment";

import { tailwind_heatmap } from "@/heatmap";
import { agentSentences } from "@/sentences";
import CardDisplay from "./CardDisplay";
import CommonKnowledgeDisplay from "./CommonKnowledgeDisplay";

const cleanName = {
  player: "you",
  abelard: "Abélard",
  heloise: "Héloïse",
};

const logColors = {
  turn: "text-blue-600 bg-blue-100",
  question: "text-slate-600 bg-slate-100",
  "answer-pos": "text-green-600 bg-green-100",
  "answer-neg": "text-red-600 bg-red-100",
  suit: "text-green-600 bg-green-100",
  "game-over": "text-gold-600 bg-gold-100 font-bold",
  knowledge: "text-pink-600 bg-pink-100",
};

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

  const updateGameSpeed = (speed: number) => {
    gameEnvironment.current.setGameSpeed(speed);
  };

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
                Abélard: {gameState.wins.abelard}
              </div>
              <div className="mr-2 text-black">
                Héloïse: {gameState.wins.heloise}
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center">
              <div className="flex items-center mr-3">
                {/* Select box to change speed */}
                <div className="flex-0 mr-2 text-slate-700 font-bold">
                  Autospeed:
                </div>
                <select
                  className="block w-full rounded-md border-0 py-2.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={gameState.speed}
                  onChange={(e) => updateGameSpeed(parseInt(e.target.value))}
                  disabled={gameState.autoPlaying}
                >
                  <option value={10000}>Extra Slow (10s)</option>
                  <option value={5000}>Slow (5s)</option>
                  <option value={1000}>Medium (1s)</option>
                  <option value={3}>Fast (3ms)</option>
                </select>
              </div>
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
              cards={gameState.abelard.cards}
              suits={gameState.abelard.suits}
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
              cards={gameState.heloise.cards}
              suits={gameState.heloise.suits}
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
              <div className="text-slate-600 mt-2">Strategy</div>
              <select
                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={gameState.abelard.strategy}
                onChange={(e) =>
                  gameEnvironment.current.changeStrategy(
                    "abelard",
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
              {gameState.abelard.question.agent} for{" "}
              {gameState.abelard.question.card?.id}
            </div>
            {gameState.turn === "abelard" && (
              <div className="flex items-center h-32 overflow-hidden">
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="inline w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-pink-600 mt-2"
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

                <div className="mt-2 text-pink-700">
                  Abélard {agentSentence}. He is going to ask{" "}
                  <strong>{cleanName[gameState.abelard.question.agent]}</strong>{" "}
                  for the{" "}
                  <strong>{gameState.abelard.question.card.color} card</strong>{" "}
                  with number{" "}
                  <strong>{gameState.abelard.question.card.number}</strong>.
                </div>
              </div>
            )}
          </div>
          <div>
            <div className="mb-2">
              <div className="text-slate-600 mt-2">Strategy</div>
              <select
                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={gameState.heloise.strategy}
                onChange={(e) =>
                  gameEnvironment.current.changeStrategy(
                    "heloise",
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
              {gameState.heloise.question.agent} for{" "}
              {gameState.heloise.question.card?.id}
            </div>
            {gameState.turn === "heloise" && (
              <div className="flex items-center h-32 overflow-hidden">
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="inline w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-pink-600 mt-2"
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

                <div className="mt-2 text-pink-700">
                  Héloïse {agentSentence}. She is going to ask{" "}
                  <strong>{cleanName[gameState.heloise.question.agent]}</strong>{" "}
                  for the{" "}
                  <strong>{gameState.heloise.question.card.color} card</strong>{" "}
                  with number{" "}
                  <strong>{gameState.heloise.question.card.number}</strong>.
                </div>
              </div>
            )}
          </div>
          <div>
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
              🧠 <strong className="text-pink-700">Strategy pick:</strong> Ask{" "}
              {gameState.player.question.agent} for{" "}
              {gameState.player.question.card?.id}
            </div>
            {!gameState.autoPlaying ? (
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
            ) : (
              <>
                {gameState.turn === "player" && (
                  <div className="flex items-center h-32">
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        className="inline w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-pink-600 mt-2"
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

                    <div className="mt-2 text-pink-700">
                      Your agent {agentSentence}. You are going to ask{" "}
                      <strong>
                        {cleanName[gameState.player.question.agent]}
                      </strong>{" "}
                      for the{" "}
                      <strong>
                        {gameState.player.question.card.color} card
                      </strong>{" "}
                      with number{" "}
                      <strong>{gameState.player.question.card.number}</strong>.
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <div>
        <div className="my-8 mx-auto max-w-7xl p-6">
          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
            Common Knowledge
          </h2>
          <p className="text-gray-700 py-4">
            The following information is common knowledge to all players.
          </p>
          {/* 3 Columns */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div>
              <h3 className="text-slate-600 font-medium">Abélard</h3>
              <CommonKnowledgeDisplay knowledge={gameState.common.abelard} />
            </div>
            <div>
              <h3 className="text-slate-600 font-medium">Héloïse</h3>
              <CommonKnowledgeDisplay knowledge={gameState.common.heloise} />
            </div>
            <div>
              <h3 className="text-slate-600 font-medium">You</h3>
              <CommonKnowledgeDisplay knowledge={gameState.common.player} />
            </div>
          </div>
        </div>
      </div>

      <div className="my-8 mx-auto max-w-7xl p-6">
        <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
          Logbook (last 1000 items)
        </h2>
        <div className="bg-slate-100 rounded-md overflow-hidden mt-6">
          <FixedSizeList
            height={400}
            width="100%"
            itemSize={40}
            itemCount={gameState.log.length}
          >
            {({ index, style }) => {
              const item = gameState.log[gameState.log.length - 1 - index];
              return (
                <div
                  style={style}
                  className={`px-4 flex items-center ${logColors[item.type]}`}
                >
                  <div>
                    {item.type === "knowledge" ? (
                      <strong>🧠 Knowledge: </strong>
                    ) : (
                      ""
                    )}
                    {item.text}
                  </div>
                </div>
              );
            }}
          </FixedSizeList>
        </div>
      </div>

      <div className="my-8 mx-auto max-w-7xl p-6 mb-32">
        <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
          Your results
        </h2>
        <p className="text-gray-700 py-4">
          Results show how a strategy performs when playing against each
          combination of opponent strategies. Results are stored in your
          browser.
        </p>
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
                className="px-3 py-3.5 text-left text-xs font-semibold text-gray-900"
              >
                Random & Random
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-xs font-semibold text-gray-900"
              >
                Random & 1st Order
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-xs font-semibold text-gray-900"
              >
                Random & 2nd Order
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-xs font-semibold text-gray-900"
              >
                Random & Combined
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-xs font-semibold text-gray-900"
              >
                1st Order & 1st Order
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-xs font-semibold text-gray-900"
              >
                1st Order & 2nd Order
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-xs font-semibold text-gray-900"
              >
                1st Order & Combined
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-xs font-semibold text-gray-900"
              >
                2nd Order & 2nd Order
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-xs font-semibold text-gray-900"
              >
                2nd Order & Combined
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-xs font-semibold text-gray-900"
              >
                Combined & Combined
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-xs font-semibold text-gray-900 sm:pr-0"
              >
                Average
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {gameEnvironment.current.strategies.map((strategy) => {
              let totalWins = 0;
              let totalLosses = 0;

              return (
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
                      // Add to total wins and losses
                      totalWins += value.wins;
                      totalLosses += value.losses;

                      return (
                        <td
                          className={`px-3 py-3.5 text-left text-sm font-semibold text-gray-900 ${color}`}
                          key={`${strategy}-${key}`}
                        >
                          {percentage === null ? "-" : `${percentage}%`}
                          <div className="text-xs opacity-75 font-normal">
                            {value.wins + value.losses} games
                          </div>
                        </td>
                      );
                    }
                  )}
                  <td className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pr-0">
                    {Math.round(
                      (totalWins / (totalWins + totalLosses)) * 100
                    ) || 0}
                    %
                    <div className="text-xs opacity-75 font-normal whitespace-nowrap">
                      {totalWins + totalLosses} games
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
