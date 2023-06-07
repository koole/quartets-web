export type AgentType = "player" | "opponent1" | "opponent2";
export type StrategyType = "random" | "smart";

export interface Card {
  id: string;
  color: string;
  number: number;
}

export type CardStateInterface = {
  [key in AgentType]: {
    cards: Card[];
    suits: string[];
  };
};

export type Knowledge = {}
