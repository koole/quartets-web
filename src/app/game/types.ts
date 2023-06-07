export type AgentType = "player" | "opponent1" | "opponent2";

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

export type SuitsStateInterface = {
  [key in AgentType]: {
    suits: string[];
  };
};

export type KnowledgeStateInterface = {
  [key in AgentType]: {
    knowledge: string[];
  };
};
