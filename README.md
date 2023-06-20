# Quartets Web

This website is dedicated to describing Quartets in terms of modal epistemic logic using Kripke models and offers a playable version of the game.

To view this website without running it locally, visit [https://quartets.dekoolecentrale.nl](https://quartets.dekoolecentrale.nl).

## Project structure

All files regarding the content of the website are located in the `src` folder.

The `src/app/` folder contains a subfolder for each page of the website. The game specifically is located in `src/app/game`. The game logic, without interface, can be found in `src/app/game/GameEnvironment.tsx`, `src/app/game/strategies.tsx`, and `src/app/game/cards.tsx`.

## Getting Started

Running this project requires Node 18.0.0 or higher. You can install it from [here](https://nodejs.org/en/).

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
