import { HandThumbDownIcon } from "@heroicons/react/24/outline";
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
    // Shuffle cards and deal to players
    const shuffledCards = CARD_LIST.sort(() => 0.5 - Math.random());
    const third = Math.floor(shuffledCards.length / 3);

    // Create an initial starting state
    let newState = {
      autoPlaying: this.state?.autoPlaying || false,
      turn: this.agents[0], // Always give the first turn to the player
      turn_count: 0,
      player: {
        cards: shuffledCards.slice(0, third),
        suits: [],
        strategy: this.state?.player?.strategy || "random",
        question: {
          agent: this.agents[1],
          card: CARD_LIST[0],
        },
      },
      opponent1: {
        cards: shuffledCards.slice(third, 2 * third),
        suits: [],
        strategy: this.state?.opponent1?.strategy || "random",
        question: {
          agent: this.agents[0],
          card: CARD_LIST[0],
        },
      },
      opponent2: {
        cards: shuffledCards.slice(2 * third),
        suits: [],
        strategy: this.state?.opponent1?.strategy || "random",
        question: {
          agent: this.agents[0],
          card: CARD_LIST[0],
        },
      },
      common: {
        player: {
          cards: [],
          suits: [],
          not_cards: [],
          not_suits: []
        },
        opponent1: {
          cards: [],
          suits: [],
          not_cards: [],
          not_suits: []
        },
        opponent2: {
          cards: [],
          suits: [],
          not_cards: [],
          not_suits: []
        },
      },
    };

    // If any player has NUM_NUMBERS of the same color, remove all cards of that color
    // from the current players hands, and add the color to the players suits
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

    // TODO: Update knowledge for all agents about the suits of other agents

    return {
      ...newState,
      wins: wins,
    };
  }

  updateQuestion(currentAgent: AgentType) {
    const [agent, card] = getQuestion(currentAgent, this.agents, this.state);

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
    // Requesting agent asks receiving agent for card
    console.info(
      `${requestingAgent} asked ${receivingAgent} for ${card.number} ${card.color}`
    );

    if (this.state[receivingAgent].cards.includes(card)) {
      // Receiving agent has card
      console.info(`${receivingAgent} had ${card.number} ${card.color}`);

      // annoucement of cards and suits
      console.log(`ANNOUCEMENT: Suit ${card.color} and Card ${card.id}`)
      this.state.common[requestingAgent].suits.push(card.color)
      this.state.common[requestingAgent].cards.push(card)

      // Move card from receiving agent to requesting agent
      const newState = {
        ...this.state,
        [receivingAgent]: {
          ...this.state[receivingAgent],
          // Remove card from receiving agents hand
          cards: this.state[receivingAgent].cards.filter(
            (c) => c.id !== card.id
          ),
        },
        [requestingAgent]: {
          ...this.state[requestingAgent],
          // Add card to requesting agents hand
          cards: [...this.state[requestingAgent].cards, card],
        },

        // for updating the common knowledge
        common:{
          ...this.state.common,
          // remove the suit from target agent common knowledge
          [receivingAgent]: {
            suits: this.state.common[receivingAgent].suits.filter(color => {
              return this.state.common[receivingAgent].suits.findIndex(
                (suit) => suit !== color
              )
            }),
            // remove the card from target agent common knowledge
            cards: this.state.common[receivingAgent].cards.filter(
              (c) => c.id !== card.id
            ),
          },
        },
      };

      // Check for suits
      // If the receiving agent has NUM_NUMBERS of the same color, remove all cards of
      // that color from the requesting agents hand, and add the color to the receiving agents suits

      // Count number of cards of the color of the card that was just received
      const color = card.color;
      const cardsOfSameColor = newState[requestingAgent].cards.filter(
        (c) => c.color === color
      );

      // If the number of cards of the same color is NUM_NUMBERS...
      if (cardsOfSameColor.length === NUM_NUMBERS) {
        console.info(
          `${requestingAgent} has ${NUM_NUMBERS} ${color} cards, so ${color} is added to their suits`
        );

        // ...add the color to the suits of the receiving agent.
        newState[requestingAgent].suits.push(color);
        // Remove all cards of the this color from the requesting agents hand
        newState[requestingAgent].cards = newState[
          requestingAgent
        ].cards.filter((c) => c.color !== color);

        // remove the cards and suits from the common knowledge
        newState.common[requestingAgent].suits = newState[
          requestingAgent
        ].suits.filter((s) => s !== color);
        newState.common[requestingAgent].cards = newState[
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

        // Find agent with most suits and declare winner
        const winner = this.agents.reduce((a, b) =>
          newState[a].suits.length > newState[b].suits.length ? a : b
        );
        console.info(`${winner} wins!`);
        newState.wins[winner] += 1;

        // Reset game, keeping track of wins
        this.state = this.createEnvironment(newState.wins);
      } else {
        // If game is not over, update turn
        this.state = newState;
      }
    } else {
      // Receiving agent does not have card, so turn goes to receiving agent
      console.info(
        `${receivingAgent} did not have ${card.number} ${card.color}`
      );
      console.info(`Turn goes to ${receivingAgent}`);
      this.state.turn = receivingAgent;
    }

    this.state.turn_count += 1;

    // Update question for all agents, this shows in the pink box on the UI.
    // This is done here, as agents can now update their questions based on the new state
    // using their specific strategies.
    this.updateQuestionForAllAgents();

    // Update UI
    this.callback();

    if (this.state.turn !== "player" && this.state.autoPlaying === false) {
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

    if (this.state.turn !== "player") {
      setTimeout(() => {
        this.autoStep();
      }, 1000);
    }

    clearInterval(this.autoStepInterval);
  }
}
