import { useEffect, useState } from "react";
import CARD_LIST, { CARD_COLORS, NUM_COLORS, NUM_NUMBERS } from "./cards";
import {
  AgentType,
  Card,
  CardStateInterface,
  KnowledgeStateInterface,
} from "./types";
import OpponentDisplay from "./OpponentDisplay";
import PlayerDisplay from "./PlayerDisplay";
import ChoicePicker from "./ChoicePicker";

const AGENTS: AgentType[] = ["player", "opponent1", "opponent2"];

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

  const [knowledge, setKnowledge] = useState<KnowledgeStateInterface>();

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

  return (
    <div className="bg-white">
      {/* Toolbar with gray background */}
      <div className="bg-gray-200 flex flex-row items-center justify-between mx-auto max-w-7xl p-6 lg:px-8 rounded-md">
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

      {/* 3 column layout */}
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-3 gap-4 p-6 lg:px-8">
          <OpponentDisplay
            cards={cards.opponent1.cards}
            suits={cards.opponent1.suits}
            name="Opponent 1"
            hide={hideOpponentCards}
          />
          <OpponentDisplay
            cards={cards.opponent2.cards}
            suits={cards.opponent2.suits}
            name="Opponent 2"
            hide={hideOpponentCards}
          />
          <PlayerDisplay
            cards={cards.player.cards}
            suits={cards.player.suits}
          />
        </div>

        <div>
          <div className="bg-gray-200 flex flex-row items-center justify-between mx-auto max-w-7xl p-6 lg:px-8 rounded-md">
            <ChoicePicker
              turn={turn}
              agents={AGENTS}
              cards={cards}
              askForCard={askForCard}
            />
          </div>
        </div>
      </div>

      <div className="bg-red-500 bg-yellow-500 bg-green-500 bg-blue-500 bg-indigo-500 bg-purple-500 bg-pink-500 bg-gray-500 hidden"></div>
    </div>
  );
}
