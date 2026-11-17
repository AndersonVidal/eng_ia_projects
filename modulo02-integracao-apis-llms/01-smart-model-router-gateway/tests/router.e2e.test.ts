import test from 'node:test'
import assert from 'node:assert/strict'
import { createServer } from '../src/server.ts'
import { config, type ModelConfig } from '../src/config.ts'
import { type LLMResponse, OpenRouterService } from '../src/openrouterService.ts'

console.assert(
    process.env.OPENROUTER_API_KEY,
    'OPENROUTER_API_KEY environment variable is not set. Please set it in your .env file.'
)

test('routes to cheapest model by default', async () => {
    const customConfig: ModelConfig = {
        ...config,
        provider: {
            ...config.provider,
            sort: {
                ...config.provider.sort,
                by: 'price'
            }
        }
    }
    const routerService = new OpenRouterService(customConfig)
    const app = createServer(routerService)

    const response = await app.inject({
        method: 'POST',
        url: '/chat',
        body: { question: 'hello world?' }
    })
    assert.equal(response.statusCode, 200)
    const body = response.json() as LLMResponse

    assert.equal(body.model, 'nvidia/nemotron-3-ultra-550b-a55b:free')
})

test('routes to highest throughput model by default', async () => {
    const customConfig: ModelConfig = {
        ...config,
        provider: {
            ...config.provider,
            sort: {
                ...config.provider.sort,
                by: 'throughput'
            }
        }
    }
    const routerService = new OpenRouterService(customConfig)
    const app = createServer(routerService)

    const response = await app.inject({
        method: 'POST',
        url: '/chat',
        body: { question: 'hello world?' }
    })
    assert.equal(response.statusCode, 200)
    const body = response.json() as LLMResponse

    assert.equal(body.model, 'nvidia/nemotron-3-ultra-550b-a55b:free')
})