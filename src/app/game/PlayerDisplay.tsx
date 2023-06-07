import CardDisplay from "./CardDisplay";
import SuitDisplay from "./SuitDisplay";
import { Card } from "./types";

export default function PlayerDisplay({
  cards,
  suits,
}: {
  cards: Card[];
  suits: string[];
}) {
  return (
    <div>
      <div className="text-slate-600 my-2">Hand <span className="text-slate-400">({cards.length})</span></div>
      <div className="flex flex-col items-center justify-center bg-slate-100 rounded-md">
        <div className="flex flex-row flex-wrap gap-2 h-32 p-2">
          {cards.map((card) => (
            <CardDisplay key={card.id} card={card} hide={false} />
          ))}
        </div>
      </div>
      <div className="text-slate-600 my-2">Quartets <span className="text-slate-400">({suits.length})</span></div>
      <div className="flex flex-col items-center justify-center bg-slate-100 rounded-md">
        <div className="flex flex-row flex-wrap gap-2 h-16 p-2">
          {suits.map((suit) => (
            <SuitDisplay key={suit} suit={suit} />
          ))}
        </div>
      </div>
    </div>
  );
}
