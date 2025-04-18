import { useEffect, useState } from "react";

const useTimer = (isActive: boolean) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let timer: number = 0;
    if (isActive) {
      setSeconds(0);
      timer = window.setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isActive]);

  const formatTime = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(
      2,
      "0"
    )}`;

  return { seconds, formattedTime: formatTime(seconds) };
};

export default useTimer;
