
import { useState, useEffect, useCallback } from 'react';
import { checkText, type CheckResponse, type Suggestion } from '../api/checker';

export const useGrammarChecker = (initialText = '') => {
  const [text, setText] = useState(initialText);
  const [result, setResult] = useState<CheckResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyze = useCallback(async (newText: string) => {
    if (!newText.trim()) {
      setResult(null);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const data = await checkText(newText);
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Check failed');
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Real-time checking with debounce
  useEffect(() => {
    const handler = setTimeout(() => analyze(text), 500);
    return () => clearTimeout(handler);
  }, [text, analyze]);

  const applyFix = (suggestion: Suggestion) => {
    setText(prev => 
      prev.slice(0, suggestion.start) +
      suggestion.replacement +
      prev.slice(suggestion.end)
    );
  };

  return {
    text,
    setText,
    suggestions: result?.suggestions ?? [],
    stats: result?.stats,
    isLoading,
    error,
    applyFix,
  };
};