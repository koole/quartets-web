export type AgentType = "player" | "opponent1" | "opponent2";
export type StrategyType = "random" | "mostCards" | "smart";

export interface GameState {
  autoPlaying: boolean;
  turn_count: number;
  turn: AgentType;
  wins: {
    player: number;
    opponent1: number;
    opponent2: number;
  };
  player: {
    cards: Card[];
    suits: string[];
    strategy: string;
    common: {
      cards: Card[];
      suits: string[];
    }
    question: { agent: AgentType; card: Card };
  };
  opponent1: {
    cards: Card[];
    suits: string[];
    strategy: string;
    common: {
      cards: Card[];
      suits: string[];
    }
    question: { agent: AgentType; card: Card };
  };
  opponent2: {
    cards: Card[];
    suits: string[];
    strategy: string;
    common: {
      cards: Card[];
      suits: string[];
    }
    question: { agent: AgentType; card: Card };
  };
}
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