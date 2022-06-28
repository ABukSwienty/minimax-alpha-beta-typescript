# Minimax Alpha Beta Typescript (tic tac toe)

A basic implementation of the [minimax algorithm](https://en.wikipedia.org/wiki/Minimax) with alpha beta pruning for optimization and (somewhat hastily) wrapped in a React app.

The code generates a tree of all possible tic tac toe positions which are scored from 1 to -1. The minimax function then loops through the positions and returns the best value, adjusting the score in relation to the current depth.

Some great resources I have used along the way:

- Daniel Shiffman's [implementation](https://www.youtube.com/watch?v=trKjYdBASyQ).
- Sebastian Lague's excellent and succint in-depth [explanation](https://www.youtube.com/watch?v=l-hh51ncgDI).

## Install and run locally

```
npm install
npm run start
```
