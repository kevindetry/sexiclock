import { useCallback, useEffect, useRef, useState } from "react";
import { timeFormatter } from "./services";

const useTimer = () => {
  const [lapsed, setLapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const animationFrame = useRef<number | null>(null);

  const start = useCallback(() => {
    let prevTimestamp = Date.now();
    const tick: FrameRequestCallback = () => {
      const time = Date.now();
      setLapsed((lapsed) => time - prevTimestamp + lapsed);
      prevTimestamp = time;
      animationFrame.current = requestAnimationFrame(tick);
    };
    animationFrame.current = requestAnimationFrame(tick);
    setRunning(true);
  }, []);

  const stop = useCallback(() => {
    if (animationFrame.current === null) return;
    cancelAnimationFrame(animationFrame.current);
    animationFrame.current = null;
    setRunning(false);
  }, []);

  const reset = useCallback(() => {
    stop();
    setLapsed(0);
  }, [stop]);

  useEffect(() => {
    return stop;
  }, [stop]);

  return { lapsed, running, start, stop, reset };
};

const Timer = (): JSX.Element => {
  const { lapsed, running, start, stop, reset } = useTimer();
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        fontFamily: "system-ui",
        fontSize: "2rem",
        fontVariantNumeric: "tabular-nums",
      }}
    >
      <div>{timeFormatter.seximal(lapsed)}</div>
      <div>
        {running ? (
          <button onClick={stop}>Stop</button>
        ) : (
          <button onClick={start}>Start</button>
        )}
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
};

export default Timer;
