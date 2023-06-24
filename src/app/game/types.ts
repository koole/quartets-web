export type AgentType = "player" | "abelard" | "heloise";
export type StrategyType = "random" | "firstOrder" | "secondOrder" | "combined";
export type StrategyComboType =
  | "random-random"
  | "random-firstOrder"
  | "random-secondOrder"
  | "random-combined"
  | "firstOrder-firstOrder"
  | "firstOrder-secondOrder"
  | "firstOrder-combined"
  | "secondOrder-secondOrder"
  | "secondOrder-combined"
  | "combined-combined";

export type LogEntry = {
  type: "turn" | "question" | "answer-pos" | "answer-neg" | "suit" | "game-over" | "knowledge";
  text: string;
};

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
  speed: number;
  log: LogEntry[];
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
