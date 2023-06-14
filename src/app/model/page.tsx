"use client";

import Image from "next/image";
import Navigation from "../../components/Nav";
import {
  CheckCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/20/solid";

export default function Home() {
  return (
    <main className="">
      <Navigation />
      <div className="bg-white px-6 py-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
          <p className="text-base font-semibold leading-7 text-indigo-600">
            Model
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Model
          </h1>
          <p className="mt-6 text-xl leading-8">
            Aliquet nec orci mattis amet quisque ullamcorper neque, nibh sem. At
            arcu, sit dui mi, nibh dui, diam eget aliquam. Quisque id at vitae
            feugiat egestas ac. Diam nulla orci at in viverra scelerisque eget.
            Eleifend egestas fringilla sapien.
          </p>
          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
            Common knowledge
          </h2>
          <div className="mt-6 max-w-2xl">
            <p>
              All agents start out with the following common knowledge about the
              game:
            </p>
          </div>
          <ul role="list" className="mt-8 max-w-xl space-y-8 text-gray-600">
            <li className="flex gap-x-3">
              <CheckCircleIcon
                className="mt-1 h-5 w-5 flex-none text-indigo-600"
                aria-hidden="true"
              />
              <span>
                <strong className="font-semibold text-gray-900">Rule 1.</strong>{" "}
                Explain it here
              </span>
            </li>
            <li className="flex gap-x-3">
              <CheckCircleIcon
                className="mt-1 h-5 w-5 flex-none text-indigo-600"
                aria-hidden="true"
              />
              <span>
                <strong className="font-semibold text-gray-900">
                  More stuff
                </strong>{" "}
                Explain it here
              </span>
            </li>
          </ul>
          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
            Strategies
          </h2>
          <div className="mt-6 max-w-2xl">
            <p>
              Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus
              enim. Mattis mauris semper sed amet vitae sed turpis id. Id dolor
              praesent donec est. Odio penatibus risus viverra tellus varius sit
              neque erat velit. Faucibus commodo massa rhoncus, volutpat.
              Dignissim sed eget risus enim. Mattis mauris semper sed amet vitae
              sed turpis id.
            </p>
            <ul role="list" className="mt-8 max-w-xl space-y-8 text-gray-600">
              <li className="flex gap-x-3">
                <CheckCircleIcon
                  className="mt-1 h-5 w-5 flex-none text-indigo-600"
                  aria-hidden="true"
                />
                <span>
                  <strong className="font-semibold text-gray-900">
                    Random.
                  </strong>{" "}
                  Just random
                </span>
              </li>
              <li className="flex gap-x-3">
                <CheckCircleIcon
                  className="mt-1 h-5 w-5 flex-none text-indigo-600"
                  aria-hidden="true"
                />
                <span>
                  <strong className="font-semibold text-gray-900">
                    Most Cards.
                  </strong>{" "}
                  Asks another player for a card they currently have most cards
                  of. If we have knowledge about another agent having a card of
                  this color, ask that agent for that card. Otherwise, ask a
                  random agent for that card.
                </span>
              </li>
              <li className="flex gap-x-3">
                <CheckCircleIcon
                  className="mt-1 h-5 w-5 flex-none text-indigo-600"
                  aria-hidden="true"
                />
                <span>
                  <strong className="font-semibold text-gray-900">
                    Stealth mode
                  </strong>{" "}
                  The agent attempts to keep knowledge about their cards secret
                  from other agents. It does this by only asking for cards
                  colors it knows the other agents already know it has. This
                  way, the other agents gain no new knowledge about the agent's
                  card colors.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
