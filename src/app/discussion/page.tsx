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
            The table data validates our hypothesis that the random strategy would demonstrate the weakest performance. Across all scenarios, the random strategy consistently performed worse when compared to the firstOrder, secondOrder, and Combined strategies. The random strategy achieved its highest win percentages of only 25% when facing the random/secondOrder and random/Combined combinations. On average, the random strategy achieved a win percentage of 24% across all combinations.
          </p>
          
          <p className="mt-6">
            Contrary to our initial expectations, the firstOrder strategy consistently outperformed the secondOrder strategy in most cases. The lowest win percentage for firstOrder was only 36% when facing two secondOrder agents, while its highest win percentage reached 66% against two random strategies. On average the firstOrder strategy achieved a 43% win percentage across all combinations.
          </p>
          <p className="mt-6">
            On the other hand, secondOrder exhibited mixed results overall. It performed poorly against the random/firstOrder combination, achieving a win percentage of 30%, as well as against two firstOrder strategies with a win percentage of 25%. However, its best performance was observed against two random strategies, achieving a win percentage of 49%, and against a random/combined combination with a win percentage of 48%. On average the secondOrder strategy achieved an average win percentage of 37% across all combinations.
          </p>
          <p className="mt-6">
            The Combined strategy did not yield the most competitive results as initially anticipated. It achieved a 51% win percentage against two random strategies and a 38% win percentage against a random/Combined combination. However, when paired with other combinations, it failed to achieve win percentages higher than 33%. On average, the Combined strategy had an average win percentage of 33% across all combinations.
          </p>
          <h1 className="mt-5 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Discussion
          </h1>
          <p className="mt-6">
            This project sought to simulate the game of Quartets using a Kripke model as a foundation for agent strategies. The objective was to evaluate the performance of four agent strategies: random, firstOrder, secondOrder, and Combined. The experiment involved running all possible combinations of these strategies against each other. The findings revealed that leveraging first or second-order knowledge generally enhanced an agent's performance, with first-order knowledge yielding the highest performance. However, the Combined strategy, which incorporated both first and second-order knowledge, did not demonstrate an equivalent level of success.
          </p>
          <p className="mt-6">
            Some discussion points can be taken from these results. Firstly, the experiment demonstrated the effectiveness of utilizing first and second-order knowledge in improving agent performance. Both the firstOrder and secondOrder strategies consistently outperformed the random strategy, indicating that incorporating knowledge about the game and opponents' behaviour can lead to more successful outcomes. This highlights the importance of strategic decision-making based on observed patterns and information.
          </p>
          <p className="mt-6">
            Secondly, the finding that the firstOrder strategy generally outperformed the secondOrder strategy suggests that focusing on immediate, first-order knowledge may be more impactful in Quartets gameplay. The success that it did find, was against combinations that didn't include the firstOrder strategy, indicating that the use of first-order knowledge may be disruptive against an agent that uses second-order knowledge.
          </p>
          <p className="mt-6">
            However, it is notable that the Combined strategy, which combined both first and second-order knowledge, did not demonstrate a corresponding improvement in performance as expected. Despite achieving moderate success against random strategies and the random/Combined combination, the Combined strategy's overall performance remained relatively modest compared to the individual strategies.
          </p>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Limitations
          </h2>
          <p>
            place holder
          </p>

        </div>
      </div>
    </main>
  );
}
