import Footer from "@/components/Footer";
import Navigation from "../../components/Nav";
import { tailwind_heatmap } from "@/heatmap";
import { StrategyType } from "../game/types";

const results = {
  random: {
    "random-random": { wins: 1418, losses: 2836 },
    "random-firstOrder": { wins: 343, losses: 1687 },
    "random-secondOrder": { wins: 507, losses: 1499 },
    "random-combined": { wins: 497, losses: 1527 },
    "firstOrder-firstOrder": { wins: 131, losses: 888 },
    "firstOrder-secondOrder": { wins: 189, losses: 838 },
    "firstOrder-combined": { wins: 204, losses: 919 },
    "secondOrder-secondOrder": { wins: 250, losses: 854 },
    "secondOrder-combined": { wins: 212, losses: 804 },
    "combined-combined": { wins: 244, losses: 787 },
  },
  firstOrder: {
    "random-random": { wins: 672, losses: 343 },
    "random-firstOrder": { wins: 888, losses: 1150 },
    "random-secondOrder": { wins: 528, losses: 499 },
    "random-combined": { wins: 572, losses: 551 },
    "firstOrder-firstOrder": { wins: 6, losses: 12 },
    "firstOrder-secondOrder": { wins: 756, losses: 1256 },
    "firstOrder-combined": { wins: 744, losses: 1280 },
    "secondOrder-secondOrder": { wins: 361, losses: 641 },
    "secondOrder-combined": { wins: 418, losses: 849 },
    "combined-combined": { wins: 421, losses: 639 },
  },
  secondOrder: {
    "random-random": { wins: 496, losses: 507 },
    "random-firstOrder": { wins: 310, losses: 717 },
    "random-secondOrder": { wins: 854, losses: 1354 },
    "random-combined": { wins: 483, losses: 533 },
    "firstOrder-firstOrder": { wins: 250, losses: 756 },
    "firstOrder-secondOrder": { wins: 641, losses: 1363 },
    "firstOrder-combined": { wins: 505, losses: 762 },
    "secondOrder-secondOrder": { wins: 5, losses: 10 },
    "secondOrder-combined": { wins: 733, losses: 1305 },
    "combined-combined": { wins: 394, losses: 615 },
  },
  combined: {
    "random-random": { wins: 515, losses: 497 },
    "random-firstOrder": { wins: 347, losses: 776 },
    "random-secondOrder": { wins: 321, losses: 695 },
    "random-combined": { wins: 787, losses: 1275 },
    "firstOrder-firstOrder": { wins: 268, losses: 744 },
    "firstOrder-secondOrder": { wins: 344, losses: 923 },
    "firstOrder-combined": { wins: 639, losses: 1481 },
    "secondOrder-secondOrder": { wins: 286, losses: 733 },
    "secondOrder-combined": { wins: 615, losses: 1403 },
    "combined-combined": { wins: 14, losses: 28 },
  },
};

export default function Home() {
  return (
    <main className="">
      <Navigation />
      <div className="bg-white px-6 py-32 lg:px-8 text-justify pb-16">
        <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Results
          </h1>
          <p className="mt-6">
            The table data validates our hypothesis that the random strategy
            would demonstrate the weakest performance. Across all scenarios, the
            random strategy consistently performed worse when compared to the
            firstOrder, secondOrder, and Combined strategies. The random
            strategy achieved its highest win percentages of only 25% when
            facing the random/secondOrder and random/Combined combinations. On
            average, the random strategy achieved a win percentage of 24% across
            all combinations.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
              >
                Strategy
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-xs font-semibold text-gray-900"
              >
                Random & Random
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-xs font-semibold text-gray-900"
              >
                Random & 1st Order
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-xs font-semibold text-gray-900"
              >
                Random & 2nd Order
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-xs font-semibold text-gray-900"
              >
                Random & Combined
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-xs font-semibold text-gray-900"
              >
                1st Order & 1st Order
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-xs font-semibold text-gray-900"
              >
                1st Order & 2nd Order
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-xs font-semibold text-gray-900"
              >
                1st Order & Combined
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-xs font-semibold text-gray-900"
              >
                2nd Order & 2nd Order
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-xs font-semibold text-gray-900"
              >
                2nd Order & Combined
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-xs font-semibold text-gray-900"
              >
                Combined & Combined
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-xs font-semibold text-gray-900 sm:pr-0"
              >
                Average
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {["random", "firstOrder", "secondOrder", "combined"].map(
              (strategy) => {
                let totalWins = 0;
                let totalLosses = 0;

                return (
                  <tr key={strategy}>
                    <td className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                      {strategy}
                    </td>
                    {/* Loop over object keys of strategy */}
                    {Object.entries(results[strategy as StrategyType]).map(
                      ([key, value]) => {
                        let percentage: number | null =
                          Math.round(
                            (value.wins / (value.wins + value.losses)) * 100
                          ) || 0;
                        if (value.wins === 0 && value.losses === 0) {
                          percentage = null;
                        }
                        // Get the color for the bar based on the percentage from tailwind_heatmap array
                        // Calculate index based on percentage
                        let color = "gray-100";
                        if (percentage !== null) {
                          const index = Math.round(
                            (percentage / 100) * (tailwind_heatmap.length - 1)
                          );
                          // Get the color from the array
                          color = tailwind_heatmap[index];
                        }
                        // Add to total wins and losses
                        totalWins += value.wins;
                        totalLosses += value.losses;

                        return (
                          <td
                            className={`px-3 py-3.5 text-left text-sm font-semibold text-gray-900 ${color}`}
                            key={`${strategy}-${key}`}
                          >
                            {percentage === null ? "-" : `${percentage}%`}
                            {/* <div className="text-xs opacity-75 font-normal">
                            {value.wins + value.losses} games
                          </div> */}
                          </td>
                        );
                      }
                    )}
                    <td className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pr-0">
                      {Math.round(
                        (totalWins / (totalWins + totalLosses)) * 100
                      ) || 0}
                      %
                      {/* <div className="text-xs opacity-75 font-normal whitespace-nowrap">
                        {totalWins + totalLosses} games
                      </div> */}
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>

      <div className="bg-white px-6 py-32 lg:px-8 pt-16">
        <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
          <p className="mt-6">
            The firstOrder strategy consistently outperformed the secondOrder
            strategy in most cases. The lowest win percentage for firstOrder was
            only 36% when facing two secondOrder agents, while its highest win
            percentage reached 66% against two random strategies. On average the
            firstOrder strategy achieved a 43% win percentage across all
            combinations.
          </p>
          <p className="mt-6">
            On the other hand, secondOrder exhibited mixed results overall. It
            performed poorly against the random/firstOrder combination,
            achieving a win percentage of 30%, as well as against two firstOrder
            strategies with a win percentage of 25%. However, its best
            performance was observed against two random strategies, achieving a
            win percentage of 49%, and against a random/combined combination
            with a win percentage of 48%. On average the secondOrder strategy
            achieved an average win percentage of 37% across all combinations.
          </p>
          <p className="mt-6">
            The Combined strategy did not yield the most competitive results as
            initially anticipated. It achieved a 51% win percentage against two
            random strategies and a 38% win percentage against a random/Combined
            combination. However, when paired with other combinations, it failed
            to achieve win percentages higher than 33%. On average, the Combined
            strategy had an average win percentage of 33% across all
            combinations.
          </p>
        </div>
      </div>
      <div className="bg-white px-6 pb-32 lg:px-8 text-justify">
        <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
          <h1 className="mt-5 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Discussion
          </h1>
          <p className="mt-6">
            This project sought to simulate the game of Quartets using a Kripke
            model as a foundation for agent strategies. The objective was to
            evaluate the performance of four agent strategies: random,
            firstOrder, secondOrder, and Combined. The experiment involved
            running all possible combinations of these strategies against each
            other. The findings revealed that leveraging first or second-order
            knowledge generally enhanced an agent&apos;s performance, with
            first-order knowledge yielding the highest performance. However, the
            Combined strategy, which incorporated both first and second-order
            knowledge, did not demonstrate an equivalent level of success.
          </p>
          <p className="mt-6">
            Some discussion points can be taken from these results. Firstly, the
            experiment demonstrated the effectiveness of utilizing first and
            second-order knowledge in improving agent performance. Both the
            firstOrder and secondOrder strategies consistently outperformed the
            random strategy, indicating that incorporating knowledge about the
            game and opponents&apos; behaviour can lead to more successful
            outcomes. This highlights the importance of strategic
            decision-making based on observed patterns and information. The
            effectiveness should however not be overstated, as the firstOrder
            strategy only achieved a maximum 66% win percentage against two
            random strategies, as the game is still largely based on chance.
          </p>
          <p className="mt-6">
            Secondly, the finding that the firstOrder strategy generally
            outperformed the secondOrder strategy suggests that focusing on
            immediate, first-order knowledge and greedily attempting to complete
            their own quartets may be more impactful in Quartets gameplay than
            reasoning about what the others might know. The success that it did
            find, was against combinations that didn&apos;t include the
            firstOrder strategy, indicating that the use of first-order
            knowledge may be disruptive against an agent that uses second-order
            knowledge.
          </p>
          <p className="mt-6">
            However, it is notable that the Combined strategy, which combined
            both first and second-order knowledge, did not demonstrate a
            corresponding improvement in performance as expected. Despite
            achieving moderate success against random strategies and the
            random/Combined combination, the Combined strategy&apos;s overall
            performance remained relatively modest compared to the individual
            strategies.
          </p>
          <p className="mt-6">
            It is also worth noting that the secondOrder strategy performed
            worse than firstOrder against the random strategy. This was to be
            expected, as the secondOrder strategy might not choose a cards that
            would more quickly complete a quartet, just to hide this information
            from the other strategies. However, the random strategy never
            considers this knowledge as it will always choose a random card.
            Therefore there is no benefit to the knowledge used in the
            secondOrder strategy in this case.
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
