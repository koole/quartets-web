import { Card } from "./types";

export const NUM_COLORS = 6;
export const NUM_NUMBERS = 4;
export const CARD_COLORS = [
  "red",
  "yellow",
  "green",
  "blue",
  "purple",
  "pink",
  "slate",
  "indigo",
];

let CARD_LIST: Card[] = [];

// Create 8 sets of 4 cards, each with a color and a number and an id

for (let i = 0; i < NUM_COLORS; i++) {
  for (let j = 0; j < NUM_NUMBERS; j++) {
    CARD_LIST.push({
      id: `${CARD_COLORS[i]}-${j}`,
      color: CARD_COLORS[i],
      number: j,
    });
  }
}

export default CARD_LIST;
