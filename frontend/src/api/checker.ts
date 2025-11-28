export interface Suggestion {
    id: number;
    start: number;
    end: number;
    message: string;
    replacement: string;
    type: "grammar" | "style" | "punctuation" | "spelling";


}

export interface CheckResponse {
    suggestions: Suggestion[];
    stats: {
        totalErrors: number;
        totalSuggestions: number;
        score: number; // 0-100 clarity/grammar score
    }
}

// Toggle this boolean when you're ready for production
const USE_MOCK = import.meta.env.DEV; // OR TRUE/FALSE MANUALLY

const mockDelay = () => new Promise(res => setTimeout(res, 600));

const mockResponse: CheckResponse = {
    suggestions: [
        {
            id: 1,
            start: 10,
            end: 14,
            message: "Use contraction",
            replacement: "don't",
            type: "grammar"
        }
    ],
    stats: { totalErrors: 5, totalSuggestions: 12, score: 88}

};

export const checkText = async (text: string): Promise<CheckResponse> =>  {
    if (USE_MOCK || text.trim() === "") {
        await mockDelay();
        return mockResponse;
    }

    const response = await fetch("http://localhost:8000/check", {
        method: "POST",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ text})
    });
    if (!response.ok) throw new Error("API error");
    return response.json();
}