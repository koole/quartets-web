export default function CardDisplay({ suit }: { suit: string }) {
  return (
    <div
      className={`bg-${suit}-500 w-8 h-12 flex items-center justify-center text-white font-bold rounded-sm outline-2 outline-white`}
    >
      ☺️
    </div>
  );
}
