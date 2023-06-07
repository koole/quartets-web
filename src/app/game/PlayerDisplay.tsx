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
      <div className="text-center text-slate-600 font-bold mb-2">You</div>
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-row flex-wrap gap-2 h-16 bg-gray-200 rounded-md p-2">
          {cards.map((card) => (
            <CardDisplay key={card.id} card={card} hide={false} />
          ))}
        </div>
      </div>
      <div className="text-center text-slate-600 my-2">Suits</div>
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-row flex-wrap gap-2 h-16 bg-gray-200 rounded-md p-2 items-center justify-center">
          {suits.map((suit) => (
            <SuitDisplay key={suit} suit={suit} />
          ))}
          {suits.length === 0 && (
            <div className="text-gray-600 font-bold">None</div>
          )}
        </div>
      </div>
    </div>
  );
}
