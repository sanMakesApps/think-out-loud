import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { downloadFile } from "../utils";

interface ReportItemProps {
  report: string;
  text: string;
  onDownload: () => void;
}

const ReportItem: React.FC<ReportItemProps> = ({
  report,
  text,
  onDownload,
}) => (

  <div className="relative prose prose-zinc bg-zinc-50 border border-zinc-200 rounded-xl p-6 max-w-none overflow-y-auto min-h-[400px] max-h-[500px]">
    {!text && (
      <button
        onClick={onDownload}
        className="absolute right-2 top-2 bg-emerald-600 text-white flex items-center px-3 py-3 rounded-full cursor-pointer hover:bg-emerald-800 transition"
      >
        <img src={downloadFile} alt="save" width={18} height={22} />
      </button>
    )}
    <ReactMarkdown remarkPlugins={[remarkGfm]}>{report}</ReactMarkdown>
  </div>
);

export default ReportItem;
