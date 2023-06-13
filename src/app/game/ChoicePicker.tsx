import { useEffect, useState } from "react";
import { AgentType, Card, CardStateInterface } from "./types";
import CARD_LIST from "./cards";

export default function ChoicePicker({
  turn,
  agents,
  askForCard,
  allowedColors
}: {
  turn: AgentType;
  agents: AgentType[];
  askForCard: (
    requestingAgent: AgentType,
    receivingAgent: AgentType,
    card: Card
    ) => void;
  allowedColors: string[];
}) {
  const [selectedAgent, setSelectedAgent] = useState<AgentType>(
    agents.filter((a) => a !== turn)[0]
  );
  const [selectedCard, setSelectedCard] = useState<Card>(CARD_LIST[0]);

  const submitChoice = () => {
    askForCard(turn, selectedAgent, selectedCard);
  };

  return (
    <div className="flex gap-4">
      <div>
        <label className="block text-sm font-medium leading-6 text-gray-900">
          Ask agent:
        </label>
        <select
          value={selectedAgent}
          onChange={(e) => setSelectedAgent(e.target.value as AgentType)}
          className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
          {agents
            .filter((a) => a !== turn)
            .map((a) => (
              <option key={a}>{a}</option>
            ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium leading-6 text-gray-900">
          For card:
        </label>

        <select
          value={selectedCard.id}
          onChange={(e) =>
            setSelectedCard(
              CARD_LIST.filter((c) => c.id === e.target.value)[0] as Card
            )
          }
          className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
          {CARD_LIST.sort(
            (a, b) => a.color.localeCompare(b.color) || a.number - b.number
          ).map((c) => (
            <option key={c.id} value={c.id} disabled={
              !allowedColors.includes(c.color) && allowedColors.length > 0
            } >
              {c.color} {c.number}
            </option>
          ))}
        </select>
      </div>
      <div className="pt-0.5">
        <button
          onClick={submitChoice}
          className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-8"
        >
          Ask
        </button>
      </div>
    </div>
  );
}
