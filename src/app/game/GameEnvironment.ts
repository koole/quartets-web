import CARD_LIST, { CARD_COLORS, NUM_NUMBERS } from "./cards";
import getQuestion from "./strategies";
import { AgentType, Card, GameState, StrategyType } from "./types";

export default class GameEnvironment {
  agents: AgentType[] = ["player", "opponent1", "opponent2"];
  strategies: StrategyType[] = ["random", "mostCards", "smart"];
  state: GameState;

  stateCallback: (state: any) => void = (state) => console.log("Placeholder");

  constructor() {
    this.state = this.createEnvironment({
      player: 0,
      opponent1: 0,
      opponent2: 0,
    });
    this.updateQuestionForAllAgents();
  }

  createEnvironment(wins: {
    player: number;
    opponent1: number;
    opponent2: number;
  }) {
    const shuffledCards = CARD_LIST.sort(() => 0.5 - Math.random());
    const third = Math.floor(shuffledCards.length / 3);

    let newState = {
      autoPlaying: false,
      turn_count: 0,
      player: {
        cards: shuffledCards.slice(0, third),
        suits: [],
        knowledge: {},
        strategy: "random",
        common: {
          cards: [],
          suits: ["red"],
        },
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
        common: {
          cards: [],
          suits: ["green"],
        },
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
        common: {
          cards: [],
          suits: ["blue"],
        },
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
          //@ts-ignore
          newState[agent].suits.push(color);
          newState[agent].cards = newState[agent].cards.filter(
            (c) => c.color !== color
          );
        }
      });
    });

    return {
      wins: wins,
      turn: this.agents[0],
      ...newState,
    };
  }

  updateQuestion(currentAgent: AgentType) {
    const [agent, card] = getQuestion(
      currentAgent,
      this.agents,
      this.state[currentAgent].strategy,
      this.state,
      this.state[currentAgent].cards
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
    card: Card,
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

      // If no cards left in all players hands, game is over
      if (
        newState.player.cards.length === 0 &&
        newState.opponent1.cards.length === 0 &&
        newState.opponent2.cards.length === 0
      ) {
        console.info("Game over");
        // Find agent with most suits
        const winner = this.agents.reduce((a, b) =>
          newState[a].suits.length > newState[b].suits.length ? a : b
        );
        console.info(`${winner} wins!`);
        newState.wins[winner] += 1;
        this.state = this.createEnvironment(newState.wins);
      } else {
        this.state = newState;
      }
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

    if(this.state.turn !== "player" && this.state.autoPlaying === false) {
      setTimeout(() => {
        this.autoStep();
      }, 1000);
    }
  }

  changeStrategy(agent: AgentType, strategy: StrategyType) {
    this.state[agent].strategy = strategy;
    this.updateQuestion(agent);

    this.callback();
  }

  autoStep() {
    // Auto step through the game
    this.askForCard(
      this.state.turn,
      this.state[this.state.turn].question.agent,
      this.state[this.state.turn].question.card
    );
  }

  // Functions to start and stop auto loop with a delay
  autoStepInterval: any = null;
  autoStepDelay = 10;

  startAutoStep() {
    this.state.autoPlaying = true;
    this.callback();
    this.autoStepInterval = setInterval(() => {
      this.autoStep();
    }, this.autoStepDelay);
  }

  stopAutoStep() {
    this.state.autoPlaying = false;
    this.callback();

    if(this.state.turn !== "player") {
      setTimeout(() => {
        this.autoStep();
      }, 1000);
    }

    clearInterval(this.autoStepInterval);
  }
}
