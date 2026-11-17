console.assert(
    process.env.OPENROUTER_API_KEY,
    'OPENROUTER_API_KEY environment variable is not set. Please set it in your .env file.'
)

export type ModelConfig = {
    apiKey: string;
    httpReferer: string;
    xTitle: string;
    port: number;
    models: string[];
    temperature: number;
    maxTokens: number;
    systemPrompt: string;
    provider: {
        sort: {
            by: string;
            partition: string;
        }
    }
}

export const config: ModelConfig = {
    apiKey: process.env.OPENROUTER_API_KEY!,
    httpReferer: 'http://pos-ia.com',
    xTitle: 'SmartModelRouterGateway',
    port: 3000,
    models: [
        'nvidia/nemotron-3-ultra-550b-a55b:free',
        'baidu/ernie-5.5-flash-preview:free',
        'thinkingmachines/inkling-2-small:free'
    ],
    temperature: 0.2,
    maxTokens: 50,
    systemPrompt: 'You are a helpful assistant.',
    provider: {
        sort: {
            by: 'latency',
            partition: 'none'
        }
    }
}