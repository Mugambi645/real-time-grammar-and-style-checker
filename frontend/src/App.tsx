// src/App.tsx
import { useGrammarChecker } from './hooks/UseGrammarChecker';
import { Editor } from './components/Editor';
import { SuggestionsPanel } from './components/SuggestionsPanel';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { Zap } from 'lucide-react';

export default function App() {
  const {
    text,
    setText,
    suggestions,
    stats,
    isLoading,
    error,
    applyFix,
  } = useGrammarChecker('');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-3">
          <Zap className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">
            AI Grammar & Style Checker
          </h1>
        </div>
      </header>

      {/* Main Content – THIS IS THE ONLY IMPORTANT PART */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT SIDE */}
          <div className="flex flex-col gap-8">
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-lg font-semibold mb-4">Your Text</h2>
              <Editor text={text} onChange={setText} isLoading={isLoading} />
            </div>

            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-lg font-semibold mb-4">
                Suggestions ({suggestions.length})
              </h2>
              {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
              <SuggestionsPanel suggestions={suggestions} onApply={applyFix} />
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col gap-8">
          <AnalyticsDashboard stats={stats ?? { totalErrors: 0, totalSuggestions: 0, score: 0 }} />
          </div>
        </div>
      </div>
    </div>
  );
}