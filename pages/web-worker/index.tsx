import {useState} from "react";
import heavyCount, {lightCount} from "../../libs/heavy";
import {HeavyReturnType} from "../../libs/heavyWebWorker";

const WebWorker = (): JSX.Element => {
  const [results, setResult] = useState<Array<number | string>>([]);
  const [isWorkerWip, setWorkerWip] = useState<boolean>(false);

  const pushCalculatingMessage = (): number => {
    const idx = results.push('集計中');
    setResult([...results]);
    return idx - 1;
  }

  const onClickLight = () => {
    const idx = pushCalculatingMessage();
    const result = lightCount();
    setResult(results.map((value, index) => index === idx ? result : value));
  }

  const onClickSame = () => {
    const idx = pushCalculatingMessage();
    const result  = heavyCount();
    setResult(results.map((value, index) => index === idx ? result : value));
  }

  const onClickWebWorker = () => {
    setWorkerWip(true);
    const idx = pushCalculatingMessage();
    const worker = new Worker(new URL('../../libs/heavyWebWorker', import.meta.url));
    worker.onmessage = (ev: MessageEvent<HeavyReturnType>) => {
      setResult(results.map((value, index) => index === idx ? ev.data.result : value));
      setWorkerWip(false);
    }
    worker?.postMessage({});
  }

  return (
      <>
        <h2>選択してください</h2>
        <div>
          <button onClick={onClickSame}>same-process</button>
        </div>
        <div>
          <button onClick={onClickWebWorker} disabled={isWorkerWip}>web-worker</button>
        </div>
        <div>
          <button onClick={onClickLight}>light-process</button>
        </div>
        {results.map((result, idx) => (<p key={idx}>{result}</p>))}
      </>
  )
}

export default WebWorker;
