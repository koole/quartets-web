import CardDisplay from "./CardDisplay";
import SuitDisplay from "./SuitDisplay";
import { Card, GameState } from "./types";

const randomKey = (prefix: string) =>
  `${prefix}-${Math.random().toString(36).substr(2, 9)}`;

export default function CommonKnowledgeDisplay({
  knowledge: { cards, suits, not_cards, not_suits },
}: {
  knowledge: GameState["common"]["player"];
}) {
  console.log(suits);
  return (
    <div>
      <div className="text-slate-600 my-2">Has cards</div>
      <div className="flex flex-col items-center justify-center bg-slate-100 rounded-md">
        <div className="flex flex-row flex-wrap gap-2 h-32 p-2">
          {cards.map((card) => (
            <CardDisplay
              key={randomKey(card)}
              card={{
                id: card,
                color: card.split("-")[0],
                number: parseInt(card.split("-")[1]),
              }}
              hide={false}
            />
          ))}
        </div>
      </div>
      <div className="text-slate-600 my-2">
        Has colors{" "}
        <span className="text-slate-500 text-sm">(At least this many of)</span>
      </div>
      <div className="flex flex-col items-center justify-center bg-slate-100 rounded-md">
        <div className="flex flex-row flex-wrap gap-2 h-32 p-2">
          {suits.map((suit, i) => (
            <SuitDisplay key={randomKey(`${suit}-${i}`)} suit={suit} />
          ))}
        </div>
      </div>
      <div className="text-slate-600 my-2">Does not have cards</div>
      <div className="flex flex-col items-center justify-center bg-slate-100 rounded-md">
        <div className="flex flex-row flex-wrap gap-2 h-48 p-2">
          {not_cards.map((card) => (
            <CardDisplay
              key={randomKey(card)}
              card={{
                id: card,
                color: card.split("-")[0],
                number: parseInt(card.split("-")[1]),
              }}
              hide={false}
            />
          ))}
        </div>
      </div>
      <div className="text-slate-600 my-2">Does not have colors</div>
      <div className="flex flex-col items-center justify-center bg-slate-100 rounded-md">
        <div className="flex flex-row flex-wrap gap-2 h-16 p-2">
          {not_suits.map((suit) => (
            <SuitDisplay key={randomKey(suit)} suit={suit} />
          ))}
        </div>
      </div>
    </div>
  );
}
