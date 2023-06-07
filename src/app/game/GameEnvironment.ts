import CARD_LIST, { CARD_COLORS, NUM_NUMBERS } from "./cards";
import getQuestion from "./strategies";
import { AgentType, Card, Knowledge, StrategyType } from "./types";

export default class GameEnvironment {
  agents: AgentType[] = ["player", "opponent1", "opponent2"];
  strategies: StrategyType[] = ["random", "smart"];
  state: {
    turn_count: number;
    turn: AgentType;
    player: {
      cards: Card[];
      suits: string[];
      knowledge: Knowledge;
      strategy: string;
      question: { agent: AgentType; card: Card };
    };
    opponent1: {
      cards: Card[];
      suits: string[];
      knowledge: Knowledge;
      strategy: string;
      question: { agent: AgentType; card: Card };
    };
    opponent2: {
      cards: Card[];
      suits: string[];
      knowledge: Knowledge;
      strategy: string;
      question: { agent: AgentType; card: Card };
    };
  };

  stateCallback: (state: any) => void = (state) => console.log("Placeholder");

  constructor() {
    this.state = this.createEnvironment({
      wins: {
        player: 0,
        opponent1: 0,
        opponent2: 0,
      },
    });
  }

  createEnvironment(prevState = {}) {
    const shuffledCards = CARD_LIST.sort(() => 0.5 - Math.random());
    const third = Math.floor(shuffledCards.length / 3);

    let newState = {
      turn_count: 0,
      player: {
        cards: shuffledCards.slice(0, third),
        suits: [],
        knowledge: {},
        strategy: "random",
        question: {
          agent: this.agents[1],
          card: CARD_LIST[0],
        },
      },
      opponent1: {
        cards: shuffledCards.slice(third, 2 * third),
        suits: [],
        knowledge: {},
        strategy: "random",
        question: {
          agent: this.agents[0],
          card: CARD_LIST[0],
        },
      },
      opponent2: {
        cards: shuffledCards.slice(2 * third),
        suits: [],
        knowledge: {},
        strategy: "random",
        question: {
          agent: this.agents[0],
          card: CARD_LIST[0],
        },
      },
    };

    // If any player has NUM_NUMBERS of the same color, remove all cards of that color from the current players hands, and add the color to the players suits
    this.agents.forEach((agent) => {
      CARD_COLORS.forEach((color) => {
        const cardsOfSameColor = newState[agent].cards.filter(
          (c) => c.color === color
        );

        if (cardsOfSameColor.length === NUM_NUMBERS) {
          newState[agent].suits.push(color);
          newState[agent].cards = newState[agent].cards.filter(
            (c) => c.color !== color
          );
        }
      });
    });

    return {
      ...prevState,
      turn: this.agents[0],
      ...newState,
    };

    // Update question for each agent
    this.updateQuestionForAllAgents();
  }

  updateQuestion(currentAgent: AgentType) {
    const [agent, card] = getQuestion(
      currentAgent,
      this.agents,
      this.state[currentAgent].strategy,
      this.state,
      this.state[currentAgent].cards,
      this.state[currentAgent].knowledge
    );

    this.state[currentAgent].question = { agent, card };
  }

  callback() {
    this.stateCallback(this.state);
  }

  setGameStateCallback(callback: (state: any) => void) {
    this.stateCallback = callback;
  }

  updateQuestionForAllAgents() {
    this.agents.forEach((agent) => {
      this.updateQuestion(agent);
    });
  }

  askForCard(
    requestingAgent: AgentType,
    receivingAgent: AgentType,
    card: Card
  ) {
    console.info(
      `${requestingAgent} asked ${receivingAgent} for ${card.number} ${card.color}`
    );
    if (this.state[receivingAgent].cards.includes(card)) {
      console.info(`${receivingAgent} had ${card.number} ${card.color}`);
      const newState = {
        ...this.state,
        [receivingAgent]: {
          ...this.state[receivingAgent],
          cards: this.state[receivingAgent].cards.filter(
            (c) => c.id !== card.id
          ),
          suits: this.state[receivingAgent].suits,
        },
        [requestingAgent]: {
          ...this.state[receivingAgent],
          cards: [...this.state[requestingAgent].cards, card],
          suits: this.state[requestingAgent].suits,
        },
      };

      // If the receiving agent has NUM_NUMBERS of the same color, remove all cards of that color from the requesting agents hand, and add the color to the receiving agents suits
      const color = card.color;
      const cardsOfSameColor = newState[requestingAgent].cards.filter(
        (c) => c.color === color
      );

      if (cardsOfSameColor.length === NUM_NUMBERS) {
        newState[requestingAgent].suits.push(color);
        newState[requestingAgent].cards = newState[
          requestingAgent
        ].cards.filter((c) => c.color !== color);
      }

      this.state = newState;
    } else {
      console.info(
        `${receivingAgent} did not have ${card.number} ${card.color}`
      );
      console.info(`Turn goes to ${receivingAgent}`);
      this.state.turn = receivingAgent;
    }
    this.state.turn_count += 1;
    this.updateQuestionForAllAgents();

    this.callback();
  }

  changeStrategy(agent: AgentType, strategy: StrategyType) {
    this.state[agent].strategy = strategy;
    this.updateQuestion(agent);

    this.callback();
  }

  autoStep() {
    // Auto step through the game
    this.askForCard(
      this.state[this.state.turn].question.agent,
      this.state.turn,
      this.state[this.state.turn].question.card
    );
  }
}
