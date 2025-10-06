'use server';
/**
 * @fileOverview A simple AI flow for generating a story.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

export const StoryInputSchema = z.object({
  topic: z.string().describe('The topic for the story'),
});

export const StoryOutputSchema = z.object({
  story: z.string().describe('The generated story'),
});

export type StoryInput = z.infer<typeof StoryInputSchema>;
export type StoryOutput = z.infer<typeof StoryOutputSchema>;

export async function generateStory(input: StoryInput): Promise<StoryOutput> {
  const prompt = `Write a very short, one-paragraph story about the following topic: ${input.topic}.`;

  const {output} = await ai.generate({
    prompt,
    model: 'googleai/gemini-1.5-flash',
    output: {
      schema: StoryOutputSchema,
    },
    config: {
      temperature: 0.7,
    },
  });

  return output!;
}
