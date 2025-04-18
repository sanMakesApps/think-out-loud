import { useEffect, useState, useRef } from "react";

let recognition: any = null;
if ("webkitSpeechRecognition" in window) {
  recognition = new webkitSpeechRecognition();
  recognition.continuous = true; // allow interim silence
  recognition.interimResults = false;
  recognition.lang = "en-US";
}

const useSpeechRecognition = () => {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const isManuallyListening = useRef(false); // track if user has started listening

  useEffect(() => {
    if (!recognition) return;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("");
      setText((prev) => {
        if (prev) return transcript;
        return prev + transcript;
      });
    };

    recognition.onend = () => {
      if (isManuallyListening.current) {
        try {
          recognition.start(); // restart automatically
        } catch (err) {
          console.error("Recognition restart error:", err);
        }
      }
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event);
    };

    return () => {
      recognition.onend = null;
      recognition.onresult = null;
    };
  }, []);

  const startListening = () => {
    if (!recognition) return;
    // setText("");
    isManuallyListening.current = true;
    setIsListening(true);
    recognition.start();
  };

  const stopListening = () => {
    if (!recognition) return;
    isManuallyListening.current = false;
    setIsListening(false);
    recognition.stop();
  };

  return {
    text,
    setText,
    isListening,
    startListening,
    stopListening,
    hasRecognitionSupport: !!recognition,
  };
};

export default useSpeechRecognition;
