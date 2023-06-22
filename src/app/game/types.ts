export type AgentType = "player" | "opponent1" | "opponent2";
export type StrategyType = "random" | "mostCards" | "smart";
export type StrategyComboType =
  | "random-random"
  | "random-mostCards"
  | "random-smart"
  | "mostCards-mostCards"
  | "mostCards-smart"
  | "smart-smart";

export type GameState = {
  [key in AgentType]: {
    cards: Card[];
    suits: string[];
    strategy: string;
    question: { agent: AgentType; card: Card };
  };
} & {
  autoPlaying: boolean;
  turn_count: number;
  turn: AgentType;
  wins: {
    player: number;
    opponent1: number;
    opponent2: number;
  };
  results: {
    [key in StrategyType]: {
      [key in StrategyComboType]: {
        wins: number;
        losses: number;
      };
    };
  };
  common: {
    [key in AgentType]: {
      cards: Card[];
      suits: string[];
      not_cards: Card[];
      not_suits: string[];
    };
  };
};
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
