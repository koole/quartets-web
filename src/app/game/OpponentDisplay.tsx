import CardDisplay from "./CardDisplay";
import SuitDisplay from "./SuitDisplay";
import { Card } from "./types";

export default function OpponentDisplay({
  cards,
  name,
  hide,
  suits,
}: {
  cards: Card[];
  name: string;
  hide: boolean;
  suits: string[];
}) {
  return (
    <div>
      
      <div className="text-slate-600 font-bold mb-2">{name}</div>
      <div className="flex flex-col items-center justify-center bg-slate-100 rounded-md">
        <div className="flex flex-row flex-wrap gap-2 min-h-16 p-2">
          {cards.map((card) => (
            <CardDisplay key={card.id} card={card} hide={hide} />
          ))}
        </div>
      </div>
      <div className="text-slate-600 my-2">Suits</div>
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
