import { Card } from "./types";
import { XMarkIcon } from "@heroicons/react/20/solid";

export default function CardDisplay({
  card,
  hide,
  x = false,
}: {
  card: Card;
  hide: boolean;
  x?: boolean;
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
      {x && (
        <span
          className="text-red-500"
          style={{
            position: "absolute",
            top: 2,
            right: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "bold",
          }}
        >
          <XMarkIcon className="h-5 w-5" />
        </span>
      )}
      {card.number}
    </div>
  );
}
