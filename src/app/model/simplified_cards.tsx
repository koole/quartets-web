import { CARD_COLORS } from "../game/cards";
import { Card } from "../game/types";

const SIMPLIFIED_NUM_COLORS = 3;
const SIMPLIFIED_NUM_NUMBERS = 2;

let CARD_LIST: Card[] = [];

// Create 8 sets of 4 cards, each with a color and a number and an id

for (let i = 0; i < SIMPLIFIED_NUM_COLORS; i++) {
  for (let j = 0; j < SIMPLIFIED_NUM_NUMBERS; j++) {
    CARD_LIST.push({
      id: `${CARD_COLORS[i]}-${j}`,
      color: CARD_COLORS[i],
      number: j,
    });
  }
}

// Calculate all possible combinations where the cards are divided into three hands.
type Hand = Card["id"][];
const PLAYERS: ("abelard" | "heloise" | "player")[] = [
  "abelard",
  "heloise",
  "player",
];
type Combination = {
  [key in (typeof PLAYERS)[number]]: Hand;
};
let COMBINATIONS: Combination[] = [];

function getPlayerHands(hand_size: number, deck: Card[]): Hand[] {
  // For each player, create a list of all possible hands
  let player_hands: Hand[] = [];
  for (let i = 0; i < deck.length; i++) {
    for (let j = i + 1; j < deck.length; j++) {
      player_hands.push([deck[i].id, deck[j].id]);
    }
  }
  return player_hands;
}

for (let player_i = 0; player_i < PLAYERS.length; player_i++) {
  // For each player, create a list of all possible hands
  let player_1_hands: Hand[] = getPlayerHands(3, CARD_LIST);
  for (const player_1_hand of player_1_hands) {
    const NEXT_CARD_LIST = CARD_LIST.filter(
      (card) => !player_1_hand.includes(card.id)
    );
    let player_2_hands: Hand[] = getPlayerHands(3, NEXT_CARD_LIST);
    for (const player_2_hand of player_2_hands) {
      const NEXT_NEXT_CARD_LIST = NEXT_CARD_LIST.filter(
        (card) => !player_2_hand.includes(card.id)
      );
      let player_3_hands: Hand[] = getPlayerHands(3, NEXT_NEXT_CARD_LIST);
      for (const player_3_hand of player_3_hands) {
        let combination: Partial<Combination> = {};
        combination[PLAYERS[(player_i + 1) % 3]] = player_1_hand;
        combination[PLAYERS[(player_i + 2) % 3]] = player_2_hand;
        combination[PLAYERS[(player_i + 3) % 3]] = player_3_hand;
        COMBINATIONS.push(combination as Combination);
      }
    }
  }
}

// Randomize order
COMBINATIONS = COMBINATIONS.sort(() => Math.random() - 0.5);

// Filter combinations where the contents of the hands are the same, but the order is different
COMBINATIONS = COMBINATIONS.filter((combination, i) => {
  for (let j = i + 1; j < COMBINATIONS.length; j++) {
    let same = true;
    for (const player of PLAYERS) {
      if (
        combination[player].sort().join(",") !==
        COMBINATIONS[j][player].sort().join(",")
      ) {
        same = false;
        break;
      } else {
      }
    }
    if (same) {
      return false;
    }
  }
  return true;
});

export { PLAYERS, COMBINATIONS };
