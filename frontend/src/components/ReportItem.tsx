import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ReportItemProps {
  report: string;
}

const ReportItem: React.FC<ReportItemProps> = ({ report }) => (
  <div className="prose prose-zinc bg-zinc-50 border border-zinc-200 rounded-xl p-6 max-w-none overflow-y-auto min-h-[400px] max-h-[500px]">
    <ReactMarkdown remarkPlugins={[remarkGfm]}>{report}</ReactMarkdown>
  </div>
);

export default ReportItem;
