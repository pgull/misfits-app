import { useState } from "react";
import { AIError, getStructuredResponse } from "../services/ai/apiClient";
import type { StructuredResponse } from "../types/schemas";

interface AIResponseState {
	data: StructuredResponse | null;
	error: string | null;
	isLoading: boolean;
}

export function useAIResponse() {
	const [state, setState] = useState<AIResponseState>({
		data: null,
		error: null,
		isLoading: false,
	});

	const fetchResponse = async (topic: string) => {
		setState({ data: null, error: null, isLoading: true });

		try {
			const response = await getStructuredResponse(topic);
			setState({ data: response, error: null, isLoading: false });
		} catch (error) {
			setState({
				data: null,
				error:
					error instanceof AIError
						? error.message
						: "An unexpected error occurred",
				isLoading: false,
			});
		}
	};

	return {
		...state,
		fetchResponse,
	};
}

export type UseAIResponse = ReturnType<typeof useAIResponse>;
