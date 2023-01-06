const HEAVY_COUNT = 10 ** 5;
const heavyCount = () => {
  let count = 0;
  for (let i = 0; i < HEAVY_COUNT; i++) {
    for (let j = 0; j < HEAVY_COUNT; j++) {
      count += 1;
    }
  }
  return count;
}

export const lightCount = () => {
  let count = 0;
  for (let i = 0; i < HEAVY_COUNT; i++) {
    count += 1;
  }
  return count;
}

export default heavyCount;
