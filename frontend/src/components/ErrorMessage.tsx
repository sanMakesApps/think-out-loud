interface ErrorMessageProps {
    error: string;
  }
  
  const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => (
    <div className="flex-1 h-auto overflow-y-auto max-h-[600px] bg-zinc-50 border border-zinc-200 rounded-xl p-4  text-sm whitespace-pre-wrap font-mono">
      {error}
    </div>
  );
  
  export default ErrorMessage;