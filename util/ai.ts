
import { NextResponse } from "next/server";
import { OpenAI  } from "langchain/llms/openai";

import {StructuredOutputParser, OutputFixingParser} from 'langchain/output_parsers'
import { PromptTemplate } from "langchain/prompts";
import z from 'zod';

const apiKey = process.env.OPENAI_API_KEY

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    user: z.string().default('bot'),
    content: z.string().describe('respond like a know it all 8th grader')
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
  const model = new OpenAI({
    openAIApiKey: apiKey,
    temperature: 0, modelName: 'gpt-3.5-turbo'})
  const res = await model.call(content)
  const result = {user: 'bot', content: res}
  console.log('openai return ', result)
 
  
  try{
    return parser.parse(JSON.stringify(result))
  } catch (error) {
    console.log(error)
  }
}