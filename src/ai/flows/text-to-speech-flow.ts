'use server';
/**
 * @fileOverview Fluxo de Text-to-Speech para a assistente Sofia.
 *
 * - textToSpeech - Converte texto em áudio.
 */
import {ai} from '@/ai/genkit';
import {z} from 'zod';
import wav from 'wav';

async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    const bufs: Buffer[] = [];
    writer.on('error', reject);
    writer.on('data', d => bufs.push(d));
    writer.on('end', () =>
      resolve(Buffer.concat(bufs).toString('base64'))
    );

    writer.write(pcmData);
    writer.end();
  });
}

const textToSpeechFlow = ai.defineFlow(
  {
    name: 'textToSpeechFlow',
    inputSchema: z.string(),
    outputSchema: z.object({
      audio: z.string().describe('O áudio gerado como uma data URI WAV.'),
    }),
  },
  async text => {
    const {media} = await ai.generate({
      model: 'googleai/gemini-2.5-flash-preview-tts',
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: {voiceName: 'Erinome'},
          },
        },
      },
      prompt: text,
    });
    if (!media) {
      throw new Error('Nenhuma mídia retornada do serviço TTS.');
    }
    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );
    const wavBase64 = await toWav(audioBuffer);
    return {
      audio: `data:audio/wav;base64,${wavBase64}`,
    };
  }
);

export async function textToSpeech(text: string) {
  return textToSpeechFlow(text);
}
