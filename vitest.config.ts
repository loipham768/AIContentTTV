import { defineConfig } from 'vitest/config'
import path from 'path'
import fs from 'fs'

function parseEnvFile(filePath: string): Record<string, string> {
  if (!fs.existsSync(filePath)) return {}
  const env: Record<string, string> = {}
  for (const line of fs.readFileSync(filePath, 'utf-8').split('\n')) {
    const match = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/)
    if (match) env[match[1]] = match[2].replace(/^['"]|['"]$/g, '')
  }
  return env
}

const localEnv = parseEnvFile(path.resolve(__dirname, '.env.local'))

export default defineConfig({
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts'],
    exclude: ['node_modules'],
    env: localEnv,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
      'next/server': require.resolve('next/server', { paths: [path.resolve(__dirname, '../../..')] }),
    },
  },
})
