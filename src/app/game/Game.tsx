import { useEffect, useState } from "react";
import CARD_LIST, { CARD_COLORS, NUM_COLORS, NUM_NUMBERS } from "./cards";
import {
  AgentType,
  Card,
  CardStateInterface,
  KnowledgeStateInterface,
  QuestionStateInterface,
  StrategyType,
} from "./types";
import OpponentDisplay from "./OpponentDisplay";
import PlayerDisplay from "./PlayerDisplay";
import ChoicePicker from "./ChoicePicker";
import getQuestion from "./strategies";

const AGENTS: AgentType[] = ["player", "opponent1", "opponent2"];
const STRATEGIES: StrategyType[] = ["random", "smart"];

export default function Game() {
  const [turn, setTurn] = useState<AgentType>("player");
  const [cards, setCards] = useState<CardStateInterface>({
    player: {
      cards: [],
      suits: [],
    },
    opponent1: {
      cards: [],
      suits: [],
    },
    opponent2: {
      cards: [],
      suits: [],
    },
  });
  const [hideOpponentCards, setHideOpponentCards] = useState<boolean>(true);

  const [knowledge, setKnowledge] = useState<KnowledgeStateInterface>({
    player: {},
    opponent1: {},
    opponent2: {},
  });

  const [questions, setQuestions] = useState<QuestionStateInterface>();

  const [agentStrategies, setAgentStrategies] = useState<{
    player: StrategyType;
    opponent1: StrategyType;
    opponent2: StrategyType;
  }>({
    player: "smart",
    opponent1: "random",
    opponent2: "random",
  });

  useEffect(() => {
    // Randomly distribute cards to 3 players
    const shuffledCards = CARD_LIST.sort(() => 0.5 - Math.random());
    const third = Math.floor(shuffledCards.length / 3);

    let newCards: CardStateInterface = {
      player: {
        cards: shuffledCards.slice(0, third),
        suits: [],
      },
      opponent1: {
        cards: shuffledCards.slice(third, 2 * third),
        suits: [],
      },
      opponent2: {
        cards: shuffledCards.slice(2 * third),
        suits: [],
      },
    };

    // If any player has NUM_NUMBERS of the same color, remove all cards of that color from the current players hands, and add the color to the players suits
    AGENTS.forEach((agent) => {
      CARD_COLORS.forEach((color) => {
        const cardsOfSameColor = newCards[agent].cards.filter(
          (c) => c.color === color
        );

        if (cardsOfSameColor.length === NUM_NUMBERS) {
          console.log(`${agent} has ${NUM_NUMBERS} ${color}s`);
          newCards[agent].suits.push(color);
          newCards[agent].cards = newCards[agent].cards.filter(
            (c) => c.color !== color
          );
        }
      });
    });

    setCards(newCards);
  }, []);

  const askForCard = (
    requestingAgent: AgentType,
    receivingAgent: AgentType,
    card: Card
  ) => {
    if (cards[receivingAgent].cards.includes(card)) {
      const newCards = {
        ...cards,
        [receivingAgent]: {
          cards: cards[receivingAgent].cards.filter((c) => c.id !== card.id),
          suits: cards[receivingAgent].suits,
        },
        [requestingAgent]: {
          cards: [...cards[requestingAgent].cards, card],
          suits: cards[requestingAgent].suits,
        },
      };

      // If the receiving agent has NUM_NUMBERS of the same color, remove all cards of that color from the requesting agents hand, and add the color to the receiving agents suits
      const color = card.color;
      const cardsOfSameColor = newCards[requestingAgent].cards.filter(
        (c) => c.color === color
      );

      if (cardsOfSameColor.length === NUM_NUMBERS) {
        newCards[requestingAgent].suits.push(color);
        newCards[requestingAgent].cards = newCards[
          requestingAgent
        ].cards.filter((c) => c.color !== color);
      }

      setCards(newCards);
    } else {
      setTurn(receivingAgent);
    }
  };

  useEffect(() => {
    // For each agent, execute their strategy calculations
    const newQuestions = {
      player: getQuestion(
        "player",
        AGENTS,
        agentStrategies.player,
        cards,
        CARD_LIST,
        knowledge
      ),
      opponent1: getQuestion(
        "opponent1",
        AGENTS,
        agentStrategies.opponent1,
        cards,
        CARD_LIST,
        knowledge
      ),
      opponent2: getQuestion(
        "opponent2",
        AGENTS,
        agentStrategies.opponent2,
        cards,
        CARD_LIST,
        knowledge
      ),
    };
    setQuestions(newQuestions);
  }, [cards, knowledge, turn, agentStrategies]);

  const updateSingleStrategy = (
    agent: AgentType,
    strategy: StrategyType
  ): void => {
    setAgentStrategies({
      ...agentStrategies,
      [agent]: strategy,
    });
  };

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
              cards={cards.opponent1.cards}
              suits={cards.opponent1.suits}
              name="Opponent 1"
              hide={hideOpponentCards}
            />
          </div>
          <div>
            <OpponentDisplay
              cards={cards.opponent2.cards}
              suits={cards.opponent2.suits}
              name="Opponent 2"
              hide={hideOpponentCards}
            />
          </div>
          <div>
            <PlayerDisplay
              cards={cards.player.cards}
              suits={cards.player.suits}
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
                value={agentStrategies.opponent1}
                onChange={(e) =>
                  updateSingleStrategy(
                    "opponent1",
                    e.target.value as StrategyType
                  )
                }
              >
                {STRATEGIES.map((strategy) => (
                  <option key={strategy} value={strategy}>
                    {strategy}
                  </option>
                ))}
              </select>
            </div>
            <div className="bg-pink-100 p-4 rounded-md text-sm text-pink-800">
              🧠 <strong className="text-pink-700">Choice:</strong> Ask{" "}
              {questions?.["opponent1"][0]} for {questions?.["opponent1"][1].id}
            </div>
            {turn === "opponent1" && (
              <div className="mt-4">
                <button
                  className="bg-pink-700 text-white px-4 py-2 rounded-md"
                  onClick={() =>
                    askForCard(
                      "opponent1",
                      questions?.["opponent1"][0],
                      questions?.["opponent1"][1]
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
                value={agentStrategies.opponent2}
                onChange={(e) =>
                  updateSingleStrategy(
                    "opponent2",
                    e.target.value as StrategyType
                  )
                }
              >
                {STRATEGIES.map((strategy) => (
                  <option key={strategy} value={strategy}>
                    {strategy}
                  </option>
                ))}
              </select>
            </div>
            <div className="bg-pink-100 p-4 rounded-md text-sm text-pink-800">
              🧠 <strong className="text-pink-700">Choice:</strong> Ask{" "}
              {questions?.["opponent2"][0]} for {questions?.["opponent2"][1].id}
            </div>
            {turn === "opponent2" && (
              <div className="mt-4">
                <button
                  className="bg-pink-700 text-white px-4 py-2 rounded-md"
                  onClick={() =>
                    askForCard(
                      "opponent2",
                      questions?.["opponent2"][0],
                      questions?.["opponent2"][1]
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
                value={agentStrategies.player}
                onChange={(e) =>
                  updateSingleStrategy(
                    "player",
                    e.target.value as StrategyType
                  )
                }
              >
                {STRATEGIES.map((strategy) => (
                  <option key={strategy} value={strategy}>
                    {strategy}
                  </option>
                ))}
              </select>
            </div>
            <div className="bg-pink-100 p-4 rounded-md text-sm text-pink-800">
              🧠 <strong className="text-pink-700">Choice:</strong> Ask{" "}
              {questions?.["player"][0]} for {questions?.["player"][1].id}
            </div>
            {turn === "player" && (
              <div className="mt-4">
                <button
                  className="bg-pink-700 text-white px-4 py-2 rounded-md"
                  onClick={() =>
                    askForCard(
                      "player",
                      questions?.["player"][0],
                      questions?.["player"][1]
                    )
                  }
                >
                  Ask
                </button>
              </div>
            )}
            {turn === "player" && (
              <>
                <div className="text-slate-600 mt-4">Manual selection</div>
                <div className="bg-slate-100 flex flex-row items-center justify-between mx-auto max-w-7xl p-4 rounded-md mt-4">
                  <ChoicePicker
                    turn={turn}
                    agents={AGENTS}
                    cards={cards}
                    askForCard={askForCard}
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
