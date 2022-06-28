import { CodeBlock, CopyBlock, dracula } from "react-code-blocks";
import { createPossibilitiesCodeBlock } from "../codeBlocks/createPossibilitiesCodeBlock";

import { minimaxCodeBlock } from "../codeBlocks/minimaxCodeBlock";
import { nodeCodeBlock } from "../codeBlocks/nodeCodeBlock";
import { tttBoardCodeBlock } from "../codeBlocks/tttBoardCodeBlock";
import { ClickToShow } from "./ClickToShow";
import { Icon } from "./Icon";
import { Link } from "./Link";

export const AboutModal = (props: { hideModalHandler: () => void }) => {
  return (
    <div className="fixed w-screen h-screen z-[9999] flex items-center justify-center ">
      <div
        onClick={props.hideModalHandler}
        className="fixed bg-gray-900 bg-opacity-20 backdrop-blur-sm w-full h-full"
      ></div>
      <div className="fixed w-4/5 md:w-2/5 h-3/5 bg-gray-50 px-14 py-10 rounded-lg overflow-scroll drop-shadow-2xl shadow-xl text-gray-500 ">
        <h1 className="text-2xl ">
          Alpha Beta Minimax Algorithm for{" "}
          <span className="text-blue-700">Typescript</span>
        </h1>
        <hr />
        <section className="py-4 space-y-8">
          <p>
            A basic implementation of the{" "}
            <Link
              link="https://en.wikipedia.org/wiki/Minimax"
              text="minimax algorithm"
            />{" "}
            with alpha beta pruning for optimization and (somewhat hastily)
            wrapped in a React app.
          </p>
          <p>
            The code generates a tree of all possible positions which are scored
            from 1 to -1. The minimax function then loops through the positions
            and returns the best value, adjusting the score in relation to the
            current depth.
          </p>
          <p>
            Check the code on{" "}
            <Link
              link="https://github.com/ABukSwienty/minimax-alpha-beta-typescript"
              text="GitHub"
            />
          </p>
        </section>
        <section className="py-4">
          <p>Some great resources I have used along the way:</p>
          <ul className="space-y-4 pt-4">
            <li className="flex items-center">
              <svg
                className="h-6 w-6 flex-none fill-gray-100 stroke-sky-700 stroke-2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="6" />
              </svg>
              <p className="ml-4">
                Daniel Shiffman's implementation:{" "}
                <Link
                  link="https://www.youtube.com/watch?v=trKjYdBASyQ"
                  text="challenge 154"
                />
              </p>
            </li>
            <li className="flex items-center">
              <svg
                className="h-6 w-6 flex-none fill-gray-100 stroke-sky-700 stroke-2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="6" />
              </svg>
              <p className="ml-4">
                Sebastian Lague's excellent and succint in-depth explanation:{" "}
                <Link
                  link="https://www.youtube.com/watch?v=l-hh51ncgDI"
                  text="algorithms explained"
                />
              </p>
            </li>
          </ul>
        </section>
        <section className="py-4">
          <p>
            I have tweeked the above to suit my needs. For example, I've added
            depth to the calculation of the board and other small adjustments.
            See the code below.
          </p>
        </section>
        <hr />
        <section className="py-4 space-y-4">
          <h2 className="text-3xl inline-flex items-center">
            <Icon icon="functions" className="text-blue-700 pr-4" /> Minimax
          </h2>
          <p>
            The function receives a node which is a position that contains a
            score and other possible positions as children. If the max depth is
            reached or the board is terminal or the current node has no
            children, then function returns the value +- the depth.
          </p>
          <ClickToShow btnText="code">
            <CodeBlock
              text="const val = minimax(node, maxDepth, -Infinity, Infinity, false);"
              language={"typescript"}
              showLineNumbers={false}
              theme={dracula}
              codeBlock
            />
            <CopyBlock
              text={minimaxCodeBlock}
              language={"typescript"}
              showLineNumbers={true}
              theme={dracula}
              codeBlock
            />
          </ClickToShow>
        </section>
        <section className="py-4 space-y-4">
          <h2 className="text-3xl inline-flex items-center">
            <Icon icon="functions" className="text-blue-700 pr-4" /> Position
            Tree
          </h2>
          <p>
            A simple position tree class that is called each time the ai needs
            to make a move which is obviously not very optimal.{" "}
            <code className="text-sm text-blue-700">Create Nodes()</code>{" "}
            creates all possible positions.
          </p>
          <ClickToShow btnText="code">
            <CopyBlock
              text={nodeCodeBlock}
              language={"typescript"}
              showLineNumbers={true}
              theme={dracula}
              codeBlock
            />
          </ClickToShow>
        </section>
        <section className="py-4 space-y-4">
          <h2 className="text-3xl inline-flex items-center">
            <Icon icon="functions" className="text-blue-700 pr-4" /> The Board
          </h2>
          <p>
            Tic Tac Toe Board class with methods to determine a winner and
            avaible tiles.{" "}
            <code className="text-sm text-blue-700">winningPossibilites</code>{" "}
            is an array of arrays of all possible wins generated by another
            function.
          </p>
          <ClickToShow btnText="code">
            <CopyBlock
              text={tttBoardCodeBlock}
              language={"typescript"}
              showLineNumbers={true}
              theme={dracula}
              codeBlock
            />
          </ClickToShow>
        </section>
        <section className="py-4 space-y-4">
          <h2 className="text-3xl inline-flex items-center">
            <Icon icon="functions" className="text-blue-700 pr-4" /> Winning
            possibilites
          </h2>
          <p>
            Generates all possibles wins as an array of arrays based on the grid
            size.
          </p>
          <ClickToShow btnText="code">
            <CopyBlock
              text={createPossibilitiesCodeBlock}
              language={"typescript"}
              showLineNumbers={true}
              theme={dracula}
              codeBlock
            />
          </ClickToShow>
        </section>
      </div>
    </div>
  );
};
