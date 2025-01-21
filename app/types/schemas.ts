import { z } from "zod";

export const SectionSchema = z.object({
	title: z.string(),
	content: z.string(),
	type: z.enum(["text", "code", "list"]),
	backgroundColor: z.string(),
	textColor: z.string(),
	metadata: z
		.object({
			complexity: z.enum(["basic", "intermediate", "advanced"]),
			tags: z.array(z.string()),
		})
		.optional(),
});

export const ResponseSchema = z.object({
	topic: z.string(),
	sections: z.array(SectionSchema),
	summary: z.string(),
	references: z.array(z.string()).optional(),
});

export type Section = z.infer<typeof SectionSchema>;
export type StructuredResponse = z.infer<typeof ResponseSchema>;
