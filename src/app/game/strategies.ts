import CARD_LIST from "./cards";
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
      console.log("Not implemented yet");
    case "random":
    default:
      return getRandomQuestion(currentAgent, agents, cards);
  }
}
