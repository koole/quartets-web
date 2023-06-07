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
        className={`bg-slate-800 w-8 h-12 flex items-center justify-center text-white font-bold rounded-sm`}
      >
        ?
      </div>
    );
  }

  return (
    // Center number in cards
    <div
      className={`bg-${card.color}-500 w-8 h-12 flex items-center justify-center text-white font-bold rounded-sm`}
    >
      {card.number}
    </div>
  );
}
