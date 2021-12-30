const shuffleList = (pokemonList) => {
  // modern Fisher-Yates algorithm
  let arr = [...pokemonList];
  let right = arr.length - 1;

  while (right > 0) {
    let index = Math.floor(Math.random() * right);
    let temp = arr[index];
    arr[index] = arr[right];
    arr[right] = temp;
    right--;
  }

  return arr;
};

export default shuffleList;