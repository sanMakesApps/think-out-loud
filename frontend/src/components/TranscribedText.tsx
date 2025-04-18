import React from "react";
import {
  saveImage,
  clearImage,
  fileTransferImage,
  downloadFile,
} from "../utils";

interface TranscribedTextProps {
  text: string;
  onDownload: () => void;
  onClear: () => void;
  onGenerateReport: () => void;
  report: string;
}

const TranscribedText: React.FC<TranscribedTextProps> = ({
  text,
  onDownload,
  onClear,
  onGenerateReport,
  report,
}) => {
  return (
    <>
      <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 h-60 overflow-y-auto text-sm whitespace-pre-wrap font-mono">
        {text}
      </div>

      <div className="flex flex-wrap justify-center gap-6 sm:gap-6">
        <button
          onClick={() => navigator.clipboard.writeText(text)}
          className="text-zinc-700 border border-zinc-300 flex items-center gap-x-2 px-4 py-2 rounded-full cursor-pointer hover:bg-zinc-200 transition"
        >
          <img src={saveImage} alt="save" width={18} height={22} />
          <span className="hidden sm:inline">Copy Transcript</span>
        </button>

        <button
          onClick={onClear}
          className="text-zinc-700 border border-zinc-300 flex items-center gap-x-2 px-4 py-2 rounded-full cursor-pointer hover:bg-zinc-200 transition"
        >
          <img src={clearImage} alt="clear" width={18} height={22} />
          <span className="hidden sm:inline">Clear Transcript</span>
        </button>

        {report ? (
          <button
            onClick={onDownload}
            className="bg-black text-white border border-zinc-300 flex items-center gap-x-2 px-4 py-2 rounded-full cursor-pointer hover:bg-zinc-700 transition"
          >
            <img src={downloadFile} alt="save" width={18} height={22} />
            <span className="hidden sm:inline">Download Report</span>
          </button>
        ) : (
          <button
            onClick={onGenerateReport}
            className="bg-indigo-600 text-white border border-transparent flex items-center gap-x-2 px-4 py-2 rounded-full cursor-pointer hover:bg-indigo-700 transition"
          >
            <img src={fileTransferImage} alt="report" width={18} height={22} />
            <span className="hidden sm:inline">Generate Report</span>
          </button>
        )}
      </div>
    </>
  );
};

export default TranscribedText;
