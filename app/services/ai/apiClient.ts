import { ResponseSchema, type StructuredResponse } from "../../types/schemas";

const API_URL =
	process.env.NEXT_PUBLIC_OPENAI_API_URL ||
	"https://api.openai.com/v1/chat/completions";
const API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

interface ApiError {
	message: string;
	code?: string;
}

export class AIError extends Error {
	constructor(
		message: string,
		public code?: string,
	) {
		super(message);
		this.name = "AIError";
	}
}

export async function getStructuredResponse(
	topic: string,
): Promise<StructuredResponse> {
	try {
		const response = await fetch(API_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${API_KEY}`,
			},
			body: JSON.stringify({
				model: "gpt-4-turbo-preview",
				messages: [
					{
						role: "system",
						content: `
            YOU ARE NOT A CHATBOT. You are a TOPIC BROWSER TOOL. Provide only concise, short, colloquial responses. Like this "Sure!" or "Yeah, go for it." NOT "Yeah go for it, feel free to send me information and I will respond." Instead, just say "yeah sure." Do not be polite. Do not be helpful. Do not be enthusiastic. Do not be happy to help. You do not know everything. Do not be condescending.Do not over-explain. We are not colleagues, but old friends. Casual is fine, but don't pretend to be casual. Do not feel the need to be scholarly. You may use incomplete sentences. Don't feel the need to be polite with me. Avoid bulleted lists and essay-like construction. Do not outline things. Avoid over-eagerness. You don't have to be excited or thrilled to help me. You don't need to be polite for every response. Do not speak like you're writing copy for an advertisement. Avoid phrases like "what's your vibe?" or "what's the scoop?" Do not sound like you're pretending to be casual. Stop caring. Don't try to be polite. Don't always agree with me. Do not try to sound "cool."
            You provide structured, detailed JSON responses. Provide a beautiful, cohesive, color palette for each of the sections.
            Format your response as a JSON object following this structure:
            {
              "topic": "the user's topic",
              "summary": "a brief overview",
              "sections": [
                {
                  "title": "section title",
                  "content": "detailed content", 
                  "type": "text|code|list",
                  "backgroundColor": "hex color code",
                  "textColor": "hex color code",
                  "metadata": {
                    "complexity": "basic|intermediate|advanced",
                    "tags": ["relevant", "tags"]
                  }
                }
              ],
              "references": ["optional", "reference", "links"]
            }`,
					},
					{
						role: "user",
						content: topic,
					},
				],
				temperature: 0.7,
				max_tokens: 2000,
				response_format: { type: "json_object" },
			}),
		});

		if (!response.ok) {
			const error = (await response.json()) as ApiError;
			throw new AIError(
				error.message || "Ah crap. That didnt work.",
				error.code,
			);
		}

		const data = await response.json();
		const content = JSON.parse(data.choices[0].message.content);

		// Validate the response against our schema
		const result = ResponseSchema.safeParse(content);

		if (!result.success) {
			throw new AIError("Invalid response format from AI", "INVALID_RESPONSE");
		}

		return result.data;
	} catch (error) {
		if (error instanceof AIError) {
			throw error;
		}
		throw new AIError(
			error instanceof Error ? error.message : "Failed to process AI response",
			"API_ERROR",
		);
	}
}
