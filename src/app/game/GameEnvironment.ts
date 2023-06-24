"use client";

import CARD_LIST, { CARD_COLORS, NUM_NUMBERS } from "./cards";
import emptyResults from "./emptyResults";
import getQuestion from "./strategies";
import {
  AgentType,
  Card,
  GameState,
  StrategyComboType,
  StrategyType,
} from "./types";

export function shuffleArray(arr: any[]) {
  let array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default class GameEnvironment {
  agents: AgentType[] = shuffleArray(["player", "abelard", "heloise"]);
  strategies: StrategyType[] = [
    "random",
    "firstOrder",
    "secondOrder",
    "combined",
  ];
  state: GameState;

  stateCallback: (state: any) => void = (state) => console.log("Placeholder");

  constructor() {
    this.agents = shuffleArray(["player", "abelard", "heloise"]);
    this.state = this.createEnvironment({
      player: 0,
      abelard: 0,
      heloise: 0,
    });

    if (this.state.turn !== "player") {
      setTimeout(() => {
        this.autoStep();
      }, 5000);
    }

    this.updateQuestionForAllAgents();
  }

  createEnvironment(wins: {
    player: number;
    abelard: number;
    heloise: number;
  }) {
    // Shuffle cards and deal to players
    const shuffledCards = shuffleArray(CARD_LIST);
    const third = Math.floor(shuffledCards.length / 3);
    let hands = shuffleArray([
      shuffledCards.slice(0, third),
      shuffledCards.slice(third, 2 * third),
      shuffledCards.slice(2 * third),
    ]);

    // Load results from local storage
    let results = JSON.parse(localStorage.getItem("results") || "null");
    // If there are no results, create an empty object
    if (!results) {
      results = emptyResults;
    }

    // Create an initial starting state
    let newState = {
      autoPlaying: this.state?.autoPlaying || false,
      turn: this.agents[Math.floor(Math.random() * 3)],
      turn_count: 0,
      results: this.state?.results || results,
      speed: this.state?.speed || 1000,
      player: {
        cards: hands[0],
        suits: [],
        strategy: this.state?.player.strategy || "random",
        question: {
          agent: this.agents[1],
          card: CARD_LIST[0],
        },
      },
      abelard: {
        cards: hands[1],
        suits: [],
        strategy: this.state?.abelard.strategy || "random",
        question: {
          agent: this.agents[2],
          card: CARD_LIST[0],
        },
      },
      heloise: {
        cards: hands[2],
        suits: [],
        strategy: this.state?.heloise.strategy || "random",
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
          not_suits: [],
        },
        abelard: {
          cards: [],
          suits: [],
          not_cards: [],
          not_suits: [],
        },
        heloise: {
          cards: [],
          suits: [],
          not_cards: [],
          not_suits: [],
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

  setGameSpeed(speed: number) {
    this.state.speed = speed;
    this.callback();
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

  askForCard(active_agent: AgentType, target_agent: AgentType, card: Card) {
    // Requesting agent asks receiving agent for card
    console.info(
      `${active_agent} asked ${target_agent} for ${card.number} ${card.color}`
    );

    if (this.state[target_agent].cards.includes(card)) {
      // Receiving agent has card
      console.info(`${target_agent} had ${card.number} ${card.color}`);

      // Makes a positive annoucement of a card into common knowledge.
      this.positive_annoucement(card, active_agent, target_agent);

      // Move card from receiving agent to requesting agent
      const newState = {
        ...this.state,
        [target_agent]: {
          ...this.state[target_agent],
          // Remove card from receiving agents hand
          cards: this.state[target_agent].cards.filter((c) => c.id !== card.id),
        },
        [active_agent]: {
          ...this.state[active_agent],
          // Add card to requesting agents hand
          cards: [...this.state[active_agent].cards, card],
        },
      };

      // Check for suits
      // If the receiving agent has NUM_NUMBERS of the same color, remove all cards of
      // that color from the requesting agents hand, and add the color to the receiving agents suits

      // Count number of cards of the color of the card that was just received
      const color = card.color;
      const cardsOfSameColor = newState[active_agent].cards.filter(
        (c) => c.color === color
      );

      // If the number of cards of the same color is NUM_NUMBERS...
      if (cardsOfSameColor.length === NUM_NUMBERS) {
        console.info(
          `${active_agent} has ${NUM_NUMBERS} ${color} cards, so ${color} is added to their suits`
        );

        // ...add the color to the suits of the target agent.
        newState[active_agent].suits.push(color);
        // Remove all cards of the this color from the active agents hand
        newState[active_agent].cards = newState[active_agent].cards.filter(
          (c) => c.color !== color
        );

        // remove the cards and suits from the common knowledge
        newState.common[active_agent].suits = newState.common[
          active_agent
        ].suits.filter((suit) => suit !== card.color);
        newState.common[active_agent].cards = newState.common[
          active_agent
        ].cards.filter((id) => id !== card.id);

        // no one has this suit in their hand anymore
        newState.common.player.not_suits.push(color);
        newState.common.abelard.not_suits.push(color);
        newState.common.heloise.not_suits.push(color);
      }

      // If no cards left in all players hands, game is over
      if (
        newState.player.cards.length === 0 &&
        newState.abelard.cards.length === 0 &&
        newState.heloise.cards.length === 0
      ) {
        console.info("Game over");

        // Find agent with most suits and declare winner
        const winner = this.agents.reduce((a, b) =>
          newState[a].suits.length > newState[b].suits.length ? a : b
        );

        console.info(`${winner} wins!`);
        newState.wins[winner] += 1;

        // Update results for all agents
        this.agents.forEach((agent) => {
          const resultsObject =
            newState.results[newState[agent].strategy as StrategyType];
          // Get the strategies of the other two agents
          const otherAgents = this.agents.filter((a) => a !== agent);
          // Get the strategy of the agent that won
          const strategy1 = newState[otherAgents[0]].strategy as StrategyType;
          const strategy2 = newState[otherAgents[1]].strategy as StrategyType;
          const strategyCombo =
            `${strategy1}-${strategy2}` as StrategyComboType;
          const strategyCombo2 =
            `${strategy2}-${strategy1}` as StrategyComboType;

          // If strategyCombo key exists
          if (resultsObject[strategyCombo]) {
            if (agent === winner) {
              resultsObject[strategyCombo].wins += 1;
            } else {
              resultsObject[strategyCombo].losses += 1;
            }
          }
          if (
            strategyCombo !== strategyCombo2 &&
            resultsObject[strategyCombo2]
          ) {
            if (agent === winner) {
              resultsObject[strategyCombo2].wins += 1;
            } else {
              resultsObject[strategyCombo2].losses += 1;
            }
          }
        });

        // Store results in local storage
        localStorage.setItem("results", JSON.stringify(newState.results));

        // Reset game, keeping track of wins
        this.agents = shuffleArray(["player", "abelard", "heloise"]);
        this.state = this.createEnvironment(newState.wins);
      } else {
        // If game is not over, update turn
        this.state = newState;
      }
    } else {
      // Receiving agent does not have card, so turn goes to receiving agent
      console.info(`${target_agent} did not have ${card.number} ${card.color}`);

      // add the card to negation common knowledge
      this.negative_annoucement(card, active_agent, target_agent);

      console.info(`Turn goes to ${target_agent}`);
      this.state.turn = target_agent;
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
      }, 5000);
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

  startAutoStep() {
    this.state.autoPlaying = true;
    this.callback();
    this.autoStepInterval = setInterval(() => {
      this.autoStep();
    }, this.state.speed);
  }

  stopAutoStep() {
    this.state.autoPlaying = false;
    this.callback();

    if (this.state.turn !== "player") {
      setTimeout(() => {
        this.autoStep();
      }, 5000);
    }

    clearInterval(this.autoStepInterval);
  }

  // adds the card suit and id to the common knowledge
  positive_annoucement(card: Card, active: AgentType, target: AgentType) {
    console.log(`POSITIVE ANNOUCEMENT: ${card.id}`);

    // add the color and id to the active agent
    this.state.common[active].suits.push(card.color);
    this.state.common[active].cards.push(card.id);

    // remove the suit colour from the target agent
    const suitsArray = this.state.common[target].suits;
    const suitsIndex = suitsArray.indexOf(card.color);
    if (suitsIndex !== -1) {
      suitsArray.splice(suitsIndex, 1);
    }

    // remove the card id from the target agent
    const cardsArray = this.state.common[target].cards;
    const cardsIndex = cardsArray.indexOf(card.id);
    if (cardsIndex !== -1) {
      cardsArray.splice(cardsIndex, 1);
    }

    // remove all the negation suit knowledge of the active agent
    this.state.common[active].not_cards = this.state.common[
      active
    ].not_cards.filter((color) => color !== card.color);

    // remove the negation of card knowledge of the active agent
    const not_cardsArray = this.state.common[active].not_cards;
    const not_cardsIndex = not_cardsArray.indexOf(card.id);
    if (not_cardsIndex !== -1) {
      cardsArray.splice(not_cardsIndex, 1);
    }
  }

  // adds the card suit and id to negation common knowledge
  negative_annoucement(card: Card, active: AgentType, target: AgentType) {
    console.log(`NEGATIVE ANNOUCEMENT: ${card.id}`);

    // the active agent is asking for a card, so they hold atleast one of a suit if they hold cards at all
    if (this.state[active].cards.length) {
      const suitsArray = this.state.common[active].suits;
      const colorToAdd = card.color;

      if (!suitsArray.includes(colorToAdd)) {
        suitsArray.push(colorToAdd);
      }
    }

    // the target agent doesn't hold the card, so its added to the negation common knowledge
    this.state.common[target].not_cards.push(card.id);
  }
}
