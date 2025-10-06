import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';
import {googleCloud} from '@genkit-ai/google-cloud';

export const ai = genkit({
  plugins: [googleAI(), googleCloud],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});
