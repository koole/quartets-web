export type AgentType = "player" | "abelard" | "heloise";
export type StrategyType = "random" | "mostCards" | "smart" | "combined";
export type StrategyComboType =
  | "random-random"
  | "random-mostCards"
  | "random-smart"
  | "random-combined"
  | "mostCards-mostCards"
  | "mostCards-smart"
  | "mostCards-combined"
  | "smart-smart"
  | "smart-combined"
  | "combined-combined";


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
    abelard: number;
    heloise: number;
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
      cards: string[];
      suits: string[];
      not_cards: string[];
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
