import type { Suggestion } from "../api/checker";

type Props = {
  suggestions: Suggestion[];
  onApply: (s: Suggestion) => void;
};

export const SuggestionsPanel = ({ suggestions, onApply }: Props) => {
  if (suggestions.length === 0) {
    return <p className="text-green-600 font-medium">No issues found!</p>;
  }

  return (
    <div className="space-y-3">
      {suggestions.map((s) => (
        <div
          key={s.id}
          className="suggestion border-l-4 border-primary-500 bg-primary-50 p-3 rounded"
        >
          <p className="font-medium text-sm">{s.message}</p>

          {s.replacement && (
            <button
              onClick={() => onApply(s)}
              className="fix-btn mt-2 text-primary-700 underline"
            >
              Apply → "{s.replacement}"
            </button>
          )}
        </div>
      ))}
    </div>
  );
};
