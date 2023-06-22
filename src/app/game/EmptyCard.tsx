import { QuestionMarkCircleIcon } from "@heroicons/react/20/solid";

export default function CardDisplay({ suit }: { suit: string }) {
  return (
    <div
      className={`bg-${suit}-500 w-8 h-12 flex items-center justify-center text-white font-bold rounded-sm outline-2 outline-white hover:-translate-y-1 hover:rotate-2 transform transition ease-in-out`}
    >
      <QuestionMarkCircleIcon className="h-6 w-6" aria-hidden="true" />
    </div>
  );
}
