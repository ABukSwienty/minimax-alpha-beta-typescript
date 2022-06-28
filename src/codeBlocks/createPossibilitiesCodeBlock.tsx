export const createPossibilitiesCodeBlock = `const createPossibilities = (gridSize: number) => {
  const possibilites: number[][] = [];
  let placeHolder: number[] = [];

  const horizontal = () => {
    placeHolder = [];

    let counter = 0;
    for (let i = 0; i < gridSize * gridSize; i++) {
      if (counter < gridSize) {
        placeHolder.push(i);
      } else {
        possibilites.push(placeHolder);
        placeHolder = [];
        placeHolder.push(i);
        counter = 0;
      }

      counter++;
    }
    possibilites.push(placeHolder);
  };

  const vertical = () => {
    placeHolder = [];
    for (let i = 0; i < gridSize; i++) {
      for (let k = 0; k < gridSize * gridSize; k += gridSize) {
        placeHolder.push(i + k);
      }
      possibilites.push(placeHolder);
      placeHolder = [];
    }
  };

  const diagonal = () => {
    placeHolder = [];
    let counter = 0;

    // left
    for (let i = 0; i < gridSize * gridSize; i++) {
      if (i === 0) placeHolder.push(i);
      if (counter === gridSize + 1) {
        placeHolder.push(i);
        counter = 0;
      }
      counter++;
    }
    possibilites.push(placeHolder);
    placeHolder = [];
    counter = 0;
    // right
    for (let i = 0; i < gridSize * gridSize; i++) {
      if (counter === gridSize - 1 && placeHolder.length < gridSize) {
        placeHolder.push(i);
        counter = 0;
      }
      counter++;
    }
    possibilites.push(placeHolder);
  };

  horizontal();
  vertical();
  diagonal();

  return {
    possibilites,
  };
};`;
