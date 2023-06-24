import Navigation from "../../components/Nav";
import {
  CheckCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/20/solid";

export default function Home() {
  return (
    <main className="">
      <Navigation />
      <div className="bg-white px-6 py-32 lg:px-8 text-justify">
        <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Results
          </h1>
          <p className="mt-6">
            The table data validates our hypothesis that the random strategy would demonstrate the weakest performance. Across all scenarios, the random strategy consistently performed worse when compared to the firstOrder, secondOrder, and Combined strategies. The random strategy achieved its highest win percentages of only 25% when facing the random/secondOrder and random/Combined combinations.
          </p>
          <p>
            Contrary to our initial expectations, the firstOrder strategy consistently outperformed the secondOrder strategy in most cases. The lowest win percentage for firstOrder was only 36% when facing two secondOrder agents, while its highest win percentage reached 66% against two random strategies. On the other hand, secondOrder exhibited mixed results overall. It performed poorly against the random/firstOrder combination, achieving a win percentage of 30%, as well as against two firstOrder strategies with a win percentage of 25%. However, its best performance was observed against two random strategies, achieving a win percentage of 49%, and against a random/combined combination with a win percentage of 48%.
          </p>
          <p>
            The Combined strategy did not yield the most competitive results as initially anticipated. It achieved a 51% win percentage against two random strategies and a 38% win percentage against a random/Combined combination. However, when paired with other combinations, it failed to achieve win percentages higher than 33%.
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Discussion
          </h1>
          <p>
            placeholder
          </p>
        </div>
      </div>
    </main>
  );
}
