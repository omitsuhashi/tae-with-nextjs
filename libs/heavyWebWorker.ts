import heavy from "./heavy";

self.onmessage = () => {
  const result = heavy();
  self.postMessage([result]);
}
