import CARD_LIST, { CARD_COLORS, NUM_NUMBERS } from "./cards";
import { GameState } from "./types";

import { AgentType, Card } from "./types";

function getRandomQuestion(
  currentAgent: AgentType,
  agents: AgentType[],
  cards: Card[]
): [AgentType, Card] {
  const otherAgents = agents.filter((agent) => agent !== currentAgent);
  const randomAgent =
    otherAgents[Math.floor(Math.random() * otherAgents.length)];

  // Only ask about colors that are held, or all colors if no cards are held
  let allowed_to_ask = [];
  if (cards.length > 0) {
    const held_colors = cards.map((card) => card.color);
    allowed_to_ask = CARD_LIST.filter((card) => held_colors.includes(card.color));
  } else {
    allowed_to_ask = CARD_LIST;
    // TODO: Fix case where no cards are held, because agent will also ask about
    // cards that are in suits. It does not filter these out yet, but it should know
    // not to ask about them.
  }
  

  // Only ask about cards that are not already held
  const held_ids = cards.map((card) => card.id);
  const will_ask = allowed_to_ask.filter((card) => !held_ids.includes(card.id));

  // Randomly select a card from the remaining cards
  const randomCard = will_ask[Math.floor(Math.random() * will_ask.length)];

  return [randomAgent, randomCard];
}

function getMostCards(
  currentAgent: AgentType,
  agents: AgentType[],
  cards: Card[],
  state: GameState
): [AgentType, Card] {
  const colorCounts: Map<string, number> = new Map();
  const numberSet: Set<number> = new Set();
  let opponents = agents.filter((agent) => agent !== currentAgent);

  if (cards.length !== 0) {
    // Count the occurrences of each color and collect numbers in the hand
    cards.forEach((card) => {
      const color = card.color;
      const number = card.number;

      colorCounts.set(color, (colorCounts.get(color) || 0) + 1);
      numberSet.add(number);
    });

    // Convert colorCounts Map to an array of key-value pairs
    const colorCountsArray = Array.from(colorCounts);

    // Sort the array based on the occurrence count in descending order
    colorCountsArray.sort((a, b) => b[1] - a[1]);

    // colorCountsArray now contains colors ordered from highest occurrence to lowest
    console.log("Cards of " + currentAgent + " are " + colorCountsArray);

    let matchFound = false;
    let opponentWithColor = null;
    let colorMatch: string | null = null;
    let matchedElement: string | null = null;
    opponents = opponents.sort(() => Math.random() - 0.5);

    // Loop through the colors in the hand of the current player
    for (const [color, count] of colorCountsArray) {
      // Loop through each opponent
      for (const opponent of opponents) {
        // Look into the CK of one opponent
        const opponentColors = state.common[opponent].suits;
        // If one of the colors from the hand is present in the CK about the other players then remember this
        if (opponentColors && opponentColors.includes(color)) {
          matchFound = true;
          opponentWithColor = opponent;
          colorMatch = color;

          console.log("From CK, the common color " + colorMatch + " was found at " + opponentWithColor)
          break;
        }
      }
      
      if (matchFound) {
        break;
      }
    }
    console.log("From CK, the common color " + colorMatch + " was found at " + opponentWithColor)
    //Look if number is present in CK
    if (opponentWithColor && colorMatch !== null) {
      const opponentCards = state.common[opponentWithColor].cards;

      for (const element of opponentCards) {
        if (element.includes(colorMatch)) {
          matchedElement = element;

          const foundCard = CARD_LIST.find((card) => card.id === matchedElement);
          if (foundCard){
            console.log("From CK we ask " + opponentWithColor + " for " + foundCard)
            return [opponentWithColor, foundCard]
          }
        }
        //Otherwise select a random number to ask
        else {
          const card = getRandomNumberOfColor(cards, colorMatch)
          if (card){
            console.log("From CK, but random nr we ask " + opponentWithColor + " for " + card)
            return [opponentWithColor, card]
          }
        }
      }
    }

    // Means that no CK matches the cards that we have in hand
    else {
      // Get color with highest number of cards and randomly ask an agent
      const [firstColor, firstCount] = colorCountsArray[0]; 
      const randomCard = getRandomNumberOfColor(cards, firstColor)

      // Randomly select an agent
      const otherAgents = agents.filter((agent) => agent !== currentAgent);
      const randomAgent =
        otherAgents[Math.floor(Math.random() * otherAgents.length)];

        console.log(
          currentAgent +
            " takes " +
            (randomCard ? randomCard.color : "no card") +
            " from " +
            randomAgent
        );
        if (randomCard) 
          return [randomAgent, randomCard]
    }
  }
  console.log(cards.length);
  // If the current player has no cards, select a random card from all available cards
  let [agent, card] = getRandomQuestion(currentAgent, agents, cards);
  return [agent, card]
}

function getRandomNumberOfColor(cards: Card[], colorMatch: string | null): Card | null {
  // Collect numbers present in the most common color
  const numbersInMostCommonColor: Set<number> = new Set();
  cards.forEach((card) => {
    if (card.color === colorMatch) {
      numbersInMostCommonColor.add(card.number);
    }
  });

  // Filter cards by the most common color and exclude numbers present in that color
  const cardsWithMostCommonColor = CARD_LIST.filter(
    (card) =>
      card.color === colorMatch &&
      !numbersInMostCommonColor.has(card.number)
  );

  // Randomly select a card from the filtered cards
  if (cardsWithMostCommonColor.length > 0) {
    let randomCard =
      cardsWithMostCommonColor[
        Math.floor(Math.random() * cardsWithMostCommonColor.length)
      ];
    return randomCard
  }
  else return null
}

// the guarded strategy, the agent will attempt to hide the colours it holds by not making it common knowledge.
function guarded(
  active_agent: AgentType,
  agents: AgentType[],
  cards: Card[],
  state: GameState
): [AgentType, Card] {
  console.log(active_agent + " is guarding");

  // attempt to find a card from advertised suits
  let advertised_suits = state.common[active_agent].suits;
  for (let i = 0; i < advertised_suits.length; i++) {
    for (let j = 0; j < cards.length; j++) {
      if (advertised_suits[i] === cards[j].color) {
        // Check if the card color matches the advertised suit
        const otherAgents = agents.filter((agent) => agent !== active_agent);
        let index = Math.floor(Math.random() * otherAgents.length)
        const randomAgent = otherAgents[index];

        // Ask for a suit and number that isn't guarded or held, or is known not to be in the hand of the target
        let target_suit = CARD_LIST.filter(
          (card) => card.color === cards[j].color && !state.common[randomAgent].not_cards.includes(card.id)
        );
        let card = target_suit.find((card) => !cards.includes(card));

        // check the other agent
        if(!card){
          index = index === 0 ? 1 : 0;
          let target = otherAgents[index];

          target_suit = CARD_LIST.filter(
            (card) => card.color === cards[j].color && !state.common[target].not_cards.includes(card.id)
          );
          card = target_suit.find((card) => !cards.includes(card));
        }

        if (card) {
          console.log("Selected card:", card);
          console.log(`${active_agent} advertises ${state.common[active_agent].suits}`)
          console.log(`${active_agent} advertises neg ${state.common[active_agent].not_suits}`)
          return [randomAgent, card];
        }
      }
    }
  }

  // defaults to random
  console.log("default to first order");
  let [agent, card] = getMostCards(active_agent, agents, cards, state);
  return [agent, card];
}

function combined(
  active_agent: AgentType,
  agents: AgentType[],
  cards: Card[],
  state: GameState
): [AgentType, Card] {
  console.log(active_agent + " is guarding, falling back to mostCards");

  // attempt to find a card from advertised suits
  let advertised_suits = state.common[active_agent].suits;
  for (let i = 0; i < advertised_suits.length; i++) {
    for (let j = 0; j < cards.length; j++) {
      if (advertised_suits[i] === cards[j].color) {
        // Check if the card color matches the advertised suit
        const otherAgents = agents.filter((agent) => agent !== active_agent);
        let index = Math.floor(Math.random() * otherAgents.length)
        const randomAgent = otherAgents[index];

        // Ask for a suit and number that isn't guarded or held, or is known not to be in the hand of the target
        let target_suit = CARD_LIST.filter(
          (card) => card.color === cards[j].color && !state.common[randomAgent].not_cards.includes(card.id)
        );
        let card = target_suit.find((card) => !cards.includes(card));

        // check the other agent
        if(!card){
          index = index === 0 ? 1 : 0;
          let target = otherAgents[index];

          target_suit = CARD_LIST.filter(
            (card) => card.color === cards[j].color && !state.common[target].not_cards.includes(card.id)
          );
          card = target_suit.find((card) => !cards.includes(card));
        }

        if (card) {
          console.log("Selected card:", card);
          console.log(`${active_agent} advertises ${state.common[active_agent].suits}`)
          console.log(`${active_agent} advertises neg ${state.common[active_agent].not_suits}`)
          return [randomAgent, card];
        }
      }
    }
  }

  // defaults to random
  console.log("default to random");
  let [agent, card] = getRandomQuestion(active_agent, agents, cards);
  return [agent, card];
}

export default function getQuestion(
  currentAgent: AgentType, // The agent that is asking the question
  agents: AgentType[], // The list of agents
  state: GameState // The state of the game
): [AgentType, Card] {
  const cards = state[currentAgent].cards;
  const strategy = state[currentAgent].strategy;

  switch (strategy) {
    case "smart":
      return guarded(currentAgent, agents, cards, state);
    case "mostCards":
      // return getMostCards(currentAgent, agents, cards, state);
      return getMostCards(currentAgent, agents, cards, state);
    case "combined":
      return combined(currentAgent, agents, cards, state);
    case "random":
    default:
      return getRandomQuestion(currentAgent, agents, cards);
  }
}
