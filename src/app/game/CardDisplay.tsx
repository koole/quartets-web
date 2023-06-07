import { Card } from "./types";

export default function CardDisplay({
  card,
  hide,
}: {
  card: Card;
  hide: boolean;
}) {
  if (hide) {
    return (
      <div
        className={`bg-slate-800 w-8 h-12 flex items-center justify-center text-white font-bold rounded-sm hover:-translate-y-1 hover:rotate-2 transform transition ease-in-out`}
      >
        ?
      </div>
    );
  }

  return (
    // Center number in cards
    <div
      className={`bg-${card.color}-500 w-8 h-12 flex items-center justify-center text-white font-bold rounded-sm hover:-translate-y-1 hover:rotate-2 transform transition ease-in-out`}
    >
      {card.number}
    </div>
  );
}
