import {useState} from "react";
import heavyCount, {lightCount} from "../../libs/heavy";

const WebWorker = (): JSX.Element => {
  const [results, setResult] = useState<Array<number>>([]);

  const onClickLight = () => {
    const result = lightCount();
    setResult([...results, result]);
  }
  const onClickSame = () => {
    const result = heavyCount();
    setResult([...results, result]);
  }
  const onClickWebWorker = () => {
    const worker = new Worker(new URL('../../libs/heavyWebWorker', import.meta.url));
    worker.onmessage = ev => {
      setResult([...results, ev.data]);
      worker.terminate();
    }

    worker.postMessage([]);
  }

  return (
      <>
        <h2>連打してください</h2>
        <div>
          <button onClick={onClickSame}>same-process</button>
        </div>
        <div>
          <button onClick={onClickWebWorker}>web-worker</button>
        </div>
        <div>
          <button onClick={onClickLight}>light-process</button>
        </div>
        {results.map((result, idx) => (<p key={idx}>{result}</p>))}
      </>
  )
}

export default WebWorker;
