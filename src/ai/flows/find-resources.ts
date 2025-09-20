'use server';
/**
 * @fileOverview Flow for finding resources based on a specific topic.
 *
 * - findResources - A function that finds learning resources, competitions, news/journals, and jobs.
 * - FindResourcesInput - The input type for the findResources function.
 * - FindResourcesOutput - The return type for the findResources function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FindResourcesInputSchema = z.object({
  topic: z.string().describe('The topic to find resources for (e.g., the roadmap goal).'),
});
export type FindResourcesInput = z.infer<typeof FindResourcesInputSchema>;

const ResourceSchema = z.object({
    title: z.string().describe('The title of the resource.'),
    description: z.string().describe('A short description of the resource.'),
    url: z.string().url().describe('The URL of the resource.'),
});

const FindResourcesOutputSchema = z.object({
  learningResources: z.array(ResourceSchema).describe('A list of learning resources like articles, videos, or courses.'),
  competitions: z.array(ResourceSchema).describe('A list of relevant competitions, hackathons, or challenges.'),
  news: z.array(ResourceSchema).describe('A list of recent news articles, journals, or blog posts related to the topic.'),
  jobs: z.array(ResourceSchema).describe('A list of relevant job postings or career opportunities.'),
});
export type FindResourcesOutput = z.infer<typeof FindResourcesOutputSchema>;

export async function findResources(
  input: FindResourcesInput
): Promise<FindResourcesOutput> {
  return findResourcesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'findResourcesPrompt',
  input: {schema: FindResourcesInputSchema},
  output: {schema: FindResourcesOutputSchema},
  prompt: `You are a helpful assistant that curates resources for students and professionals.
  
  Based on the user's topic of interest, find a variety of resources. For each category (learning resources, competitions, news/journals, jobs), please find 2-4 items. Ensure all URLs are valid and working.

  Topic: {{{topic}}}

  Generate the response in the specified JSON format.
  `,
});

const findResourcesFlow = ai.defineFlow(
  {
    name: 'findResourcesFlow',
    inputSchema: FindResourcesInputSchema,
    outputSchema: FindResourcesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
