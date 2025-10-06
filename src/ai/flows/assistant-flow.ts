'use server';
/**
 * @fileOverview Fluxo da assistente Sofia para interpretar comandos e aplicar filtros.
 *
 * - interpretCommand - Interpreta o texto do usuário e retorna os filtros e uma resposta.
 * - InterpretCommandInput - O tipo de entrada para a função interpretCommand.
 * - InterpretCommandOutput - O tipo de retorno para a função interpretCommand.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {fairs, styles} from '@/lib/media';

export const InterpretCommandInputSchema = z.object({
  command: z.string().describe('O comando de texto falado pelo usuário.'),
  currentFilters: z.object({
    fair: z.string().optional(),
    style: z.string().optional(),
  }),
});
export type InterpretCommandInput = z.infer<typeof InterpretCommandInputSchema>;

const FilterSchema = z.object({
  fair: z.string().optional().describe('O filtro de feira a ser aplicado. Se nenhum for detectado, deixe em branco.'),
  style: z.string().optional().describe('O filtro de estilo a ser aplicado. Se nenhum for detectado, deixe em branco.'),
  clear: z.boolean().optional().describe('Define como true se o usuário pedir para limpar, remover ou resetar os filtros.'),
});

export const InterpretCommandOutputSchema = z.object({
  appliedFilters: FilterSchema,
  responseText: z.string().describe('A resposta falada para o usuário, confirmando a ação ou pedindo esclarecimentos.'),
});
export type InterpretCommandOutput = z.infer<
  typeof InterpretCommandOutputSchema
>;

export async function interpretCommand(
  input: InterpretCommandInput
): Promise<InterpretCommandOutput> {
  return interpretCommandFlow(input);
}

const interpretCommandPrompt = ai.definePrompt({
  name: 'interpretCommandPrompt',
  input: {schema: InterpretCommandInputSchema},
  output: {schema: InterpretCommandOutputSchema},
  prompt: `Você é a Sofia, uma assistente de IA para a galeria de arte do Circuito Carioca de Feiras Orgânicas.

Sua tarefa é interpretar os comandos do usuário para filtrar a galeria.

Opções de filtro disponíveis:
- Feiras: ${fairs.join(', ')}
- Estilos: ${styles.join(', ')}

Contexto do Filtro Atual:
- Feira atual: {{{currentFilters.fair}}}
- Estilo atual: {{{currentFilters.style}}}

Instruções:
1.  Analise o comando do usuário: "{{{command}}}"
2.  Determine quais filtros de 'feira' ou 'estilo' devem ser aplicados.
3.  Se o usuário pedir para limpar, remover, resetar ou mostrar tudo, defina 'clear' como true em 'appliedFilters'.
4.  Se nenhum filtro claro for mencionado, não adivinhe. Deixe os campos em branco.
5.  Gere uma 'responseText' clara e concisa para confirmar a ação. A resposta deve ser em português do Brasil.

Exemplos:
- Comando: "Mostrar fotografias da Tijuca" -> responseText: "Filtrando por fotografias na feira da Tijuca.", appliedFilters: { fair: "Tijuca", style: "Fotografia" }
- Comando: "Quero ver os cartoons" -> responseText: "Mostrando todos os cartoons.", appliedFilters: { style: "Cartoon" }
- Comando: "Limpar filtros" -> responseText: "Ok, removendo todos os filtros.", appliedFilters: { clear: true }
- Comando: "Remover filtro de feira" -> responseText: "Removendo o filtro de feira.", appliedFilters: { fair: "" }
- Comando: "Olá" -> responseText: "Olá! Como posso ajudar a filtrar a galeria?", appliedFilters: {}`,
});

const interpretCommandFlow = ai.defineFlow(
  {
    name: 'interpretCommandFlow',
    inputSchema: InterpretCommandInputSchema,
    outputSchema: InterpretCommandOutputSchema,
  },
  async input => {
    const {output} = await interpretCommandPrompt(input);
    return output!;
  }
);
