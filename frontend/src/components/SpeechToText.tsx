import useSpeechRecognition from "../hooks/useSpeechRecognition";
import useTimer from "../hooks/useTimer";
import {
  logoImage,
  micWhiteImage,
  recordWhiteImage,
  timerImage,
} from "../utils";

import Loading from "./Loading";
import TranscribedText from "./TranscribedText";
import ErrorMessage from "./ErrorMessage";
import ReportItem from "./ReportItem";
import { getTranscriptActions } from "../utils/getTranscriptActions";
import useAxios from "../hooks/useAxios";

function SpeechToText() {
  const {
    text,
    setText,
    startListening,
    stopListening,
    isListening,
    hasRecognitionSupport,
  } = useSpeechRecognition();

  const { formattedTime } = useTimer(isListening);
  const { data: report, error, loading, post } = useAxios<string>();
  const { download, clear } = getTranscriptActions(report, setText);

  const generateReport = () => {
    if (!text.trim()) return;
    post(
      "http://localhost:8080/api/report/generate",
      { reportContent: text },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  };

  if (!hasRecognitionSupport)
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-100 text-zinc-600 text-lg font-medium">
        Your browser does not support speech recognition.
      </div>
    );

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-800 flex justify-center md:py-5 px-0 sm:px-4 xs:py-0 overflow-hidden">
      <div className="bg-white lg:h-full shadow-xl rounded-none sm:rounded-2xl p-4 sm:p-8 w-full max-w-[900px] xs:min-h-screen space-y-6">
        {" "}
        <div className="flex-1 space-y-4">
          <header className="flex items-center">
            <img src={logoImage} alt="logo" width={20} height={24} />
            <h4 className="font-semibold text-zinc-800 px-5 text-sm hover:text-zinc-600 transition-all">
              Think out loud
            </h4>
          </header>

          <div className="flex justify-center space-x-4">
            {!isListening ? (
              <button
                onClick={startListening}
                className="flex items-center gap-x-2 bg-slate-700 text-white px-4 py-2 rounded-full shadow cursor-pointer hover:bg-slate-800 transition"
                aria-label="Start listening"
              >
                <span className="relative bg-red-500 w-8 h-8 rounded-full flex items-center justify-center">
                  {!text && (
                    <span className="absolute left-0 inline-flex h-full w-full rounded-full bg-red-400 opacity-75 animate-ping"></span>
                  )}
                  <img
                    src={micWhiteImage}
                    alt="mic"
                    width={18}
                    height={22}
                    className="z-10"
                  />
                </span>
                {/* <img src={micWhiteImage} alt="mic" width={18} height={22}  className="bg-red-400 rounded-full " /> */}
                <span className="hidden sm:inline">Start Streaming</span>
              </button>
            ) : (
              <button
                onClick={stopListening}
                className="flex items-center gap-x-2 bg-red-500 text-white px-6 py-3 rounded-full shadow hover:bg-red-600 transition"
                aria-label="Stop listening"
              >
                <img
                  src={recordWhiteImage}
                  alt="record"
                  width={18}
                  height={22}
                />
                <span className="hidden sm:inline">Stop Listening</span>
              </button>
            )}
          </div>

          {isListening && (
            <div className="flex items-center justify-center gap-x-4">
              <div className="text-center text-green-600 text-sm font-medium">
                Listening...
              </div>
              <div className="flex text-green-600 text-center text-sm font-medium gap-x-2">
                <img src={timerImage} alt="timer" width={18} height={22} />
                {formattedTime}
              </div>
            </div>
          )}

          {text && (
            <TranscribedText
              text={text}
              onDownload={download}
              onClear={clear}
              onGenerateReport={generateReport}
              report={report}
            />
          )}
        </div>
        <div
          className={`overflow-hidden transition-all duration-500 space-y-4 ${
            loading || error || report ? "h-full" : "max-h-0"
          }
          `}
        >
          {loading && <Loading />}
          {error && <ErrorMessage error={error} />}
          {!error && report && (
            <ReportItem report={report} text={text} onDownload={download} />
          )}
        </div>
      </div>
    </div>
  );
}

export default SpeechToText;
