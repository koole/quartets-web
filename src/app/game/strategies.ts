import CARD_LIST, { CARD_COLORS, NUM_NUMBERS } from "./cards";
import { GameState } from "./types";

import { AgentType, Card } from "./types";

function getRandomQuestion(
  currentAgent: AgentType,
  agents: AgentType[],
  cards: Card[]
): [AgentType, Card] {
  const otherAgents = agents.filter((agent) => agent !== currentAgent);
  const randomAgent =
    otherAgents[Math.floor(Math.random() * otherAgents.length)];

  const randomCard = CARD_LIST[Math.floor(Math.random() * cards.length)];

  return [randomAgent, randomCard];
}

function getMostCards(
  currentAgent: AgentType,
  agents: AgentType[],
  cards: Card[]
): [AgentType, Card] {
  const colorCounts: Map<string, number> = new Map();
  const numberSet: Set<number> = new Set();
  let randomCard: Card | undefined;

  if (cards.length === 0) {
    console.log(cards.length);
    // If the current player has no cards, select a random card from all available cards
    randomCard = CARD_LIST[Math.floor(Math.random() * CARD_LIST.length)];
  } else {
    // Count the occurrences of each color and collect numbers in the hand
    cards.forEach((card) => {
      const color = card.color;
      const number = card.number;

      colorCounts.set(color, (colorCounts.get(color) || 0) + 1);
      numberSet.add(number);
    });

    // Find the color with the highest count
    let mostCommonColor: string | undefined;
    let highestCount = 0;

    colorCounts.forEach((count, color) => {
      if (count > highestCount) {
        highestCount = count;
        mostCommonColor = color;
      }
    });

    // Collect numbers present in the most common color
    const numbersInMostCommonColor: Set<number> = new Set();
    cards.forEach((card) => {
      if (card.color === mostCommonColor) {
        numbersInMostCommonColor.add(card.number);
      }
    });

    // Filter cards by the most common color and exclude numbers present in that color
    const cardsWithMostCommonColor = CARD_LIST.filter(
      (card) =>
        card.color === mostCommonColor &&
        !numbersInMostCommonColor.has(card.number)
    );

    // Randomly select a card from the filtered cards
    if (cardsWithMostCommonColor.length > 0) {
      randomCard =
        cardsWithMostCommonColor[
          Math.floor(Math.random() * cardsWithMostCommonColor.length)
        ];
    }
  }

  // Randomly select an agent
  const otherAgents = agents.filter((agent) => agent !== currentAgent);
  const randomAgent =
    otherAgents[Math.floor(Math.random() * otherAgents.length)];

  return [randomAgent, randomCard!];
}

// the guarded strategy, the agent will attempt to hide the colours it holds by not making it common knowledge.
function guarded(
  currentAgent: AgentType,
  agents: AgentType[],
  cards: Card[],
  state: GameState
): [AgentType, Card] {
  console.log(currentAgent + " is guarding");

  // attempt to find a card from advertised suits
  let advertised_suits = state[currentAgent].common.suits;
  for (let i = 0; i < advertised_suits.length; i++) {
    for (let j = 0; j < cards.length; j++) {
      if (advertised_suits[i] === cards[j].color) {
        // Check if the card color matches the advertised suit
        const otherAgents = agents.filter((agent) => agent !== currentAgent);
        const randomAgent =
          otherAgents[Math.floor(Math.random() * otherAgents.length)];

        // Ask for a suit and number that isn't guarded or held
        const target_suit = CARD_LIST.filter(
          (card) => card.color === cards[j].color
        );
        let card = target_suit.find((card) => !cards.includes(card));

        if (card) {
          console.log("Selected card:", card);
          return [randomAgent, card];
        }
      }
    }
  }

  // defaults to random
  console.log("default to random");
  let [agent, card] = getRandomQuestion(currentAgent, agents, cards);
  return [agent, card];
}

export default function getQuestion(
  currentAgent: AgentType, // The agent that is asking the question
  agents: AgentType[], // The list of agents
  state: GameState // The state of the game
): [AgentType, Card] {
  const cards = state[currentAgent].cards;
  const strategy = state[currentAgent].strategy;

  switch (strategy) {
    case "smart":
      return guarded(currentAgent, agents, cards, state);
    case "mostCards":
      return getMostCards(currentAgent, agents, cards);
    case "random":
    default:
      return getRandomQuestion(currentAgent, agents, cards);
  }
}
