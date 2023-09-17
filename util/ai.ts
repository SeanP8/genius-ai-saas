
import { NextResponse } from "next/server";
import { OpenAI  } from "langchain/llms/openai";

import {StructuredOutputParser} from 'langchain/output_parsers'
import { PromptTemplate } from "langchain/prompts";
import z from 'zod';

const apiKey = process.env.OPENAI_API_KEY

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    conversation: z.string().describe('a response')
  })
)

const getPrompt = async (content: any) => {
  const format_instructions = parser.getFormatInstructions();
  
  const prompt = new PromptTemplate({
    template: 'Analyze the following entry. \n{format_instructions}\n{entry}',
    inputVariables: ['entry'],
    partialVariables: {format_instructions}
  })

  const input = await prompt.format({
    entry: content
  })
  
  return input
}

export const analyze = async(content: any) => {
  const input = await getPrompt(content);
  const model = new OpenAI({temperature: 0, modelName: 'gpt-3.5-turbo'})
  const result = await model.call(input)
  console.log('openai return ', result)
  console.log('parser -- ', parser.parse(result))
  
  try{
    return parser.parse(result)
  } catch (error) {
    console.log(error)
  }
}