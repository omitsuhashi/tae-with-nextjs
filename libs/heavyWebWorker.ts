import heavy from "./heavy";

export type HeavyReturnType = {
  result: number;
}

self.onmessage = () => {
  const result = heavy();
  self.postMessage({result} as HeavyReturnType);
}
