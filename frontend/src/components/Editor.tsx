import { Loader2 } from 'lucide-react';

type Props = {
  text: string;
  onChange: (t: string) => void;
  isLoading: boolean;
};

export const Editor = ({ text, onChange, isLoading }: Props) => (
  <div className="relative">
    <textarea
      className="editor font-mono text-gray-800"
      value={text}
      onChange={e => onChange(e.target.value)}
      placeholder="Start typing or paste your text here..."
    />
    {isLoading && (
      <div className="absolute bottom-3 right-3 flex items-center text-primary-600">
        <Loader2 className="h-4 w-4 animate-spin mr-1" />
        <span className="text-sm">Checking...</span>
      </div>
    )}
  </div>
);