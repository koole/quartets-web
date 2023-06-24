const navigation = {
  team: [
    { name: "Ioana Cojocaru​" },
    { name: "Leon Koole​" },
    { name: "Yorick Juffer​" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-900" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <img className="h-7" src="/logo.svg" alt="Quartets" />
            <p className="text-sm leading-6 text-gray-300">
              Quartets Agents, built using Logic.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div></div>
            <div className="md:grid md:grid-cols-2 md:gap-8 ml">
              <div />
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">
                  Group 7
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.team.map((item) => (
                    <li key={item.name}>
                      <span className="text-sm leading-6 text-gray-300">
                        {item.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-gray-400">&copy; 2023</p>
        </div>
      </div>
      {/* These are here for the results tables */}
      <div className="hidden bg-red-500 bg-red-400 bg-red-300 bg-red-200 bg-red-100 bg-yellow-100 bg-green-100 bg-green-200 bg-green-300 bg-green-400 bg-green-500"></div>
    </footer>
  );
}
