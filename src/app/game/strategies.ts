import CARD_LIST, { CARD_COLORS, NUM_NUMBERS } from "./cards";
import {
  AgentType,
  Card,
  Knowledge,
  CardStateInterface,
} from "./types";

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
    (card) => card.color === mostCommonColor && !numbersInMostCommonColor.has(card.number)
  );

  // Randomly select a card from the filtered cards
  let randomCard: Card | undefined;
  if (cardsWithMostCommonColor.length > 0) {
    randomCard =
      cardsWithMostCommonColor[
        Math.floor(Math.random() * cardsWithMostCommonColor.length)
      ];
  }

  // Randomly select an agent
  const otherAgents = agents.filter((agent) => agent !== currentAgent);
  const randomAgent =
    otherAgents[Math.floor(Math.random() * otherAgents.length)];

  return [randomAgent, randomCard!];
}

export default function getQuestion(
  currentAgent: AgentType,
  agents: AgentType[],
  strategy: string,
  cardState: CardStateInterface,
  cards: Card[],
  knowledge: Knowledge
): [AgentType, Card] {
  switch (strategy) {
    case "smart":
      console.log("Not implemented yet")
    case "mostCards":
      return getMostCards(currentAgent, agents, cards);
    case "random":
    default:
      return getRandomQuestion(currentAgent, agents, cards);
  }
}
