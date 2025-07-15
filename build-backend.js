import * as esbuild from 'esbuild'

const isWatch = process.argv.includes('--watch')

const buildOptions = {
  entryPoints: ['api/code.ts'],
  bundle: true,
  outfile: 'dist/code.js',
  format: 'cjs',
  platform: 'node',
  target: 'esnext',
  loader: { '.ts': 'ts' },
  plugins: [
    {
      name: 'log-rebuild',
      setup(build) {
        build.onEnd(result => {
          if (result.errors.length === 0) {
            console.log(`✅ [${new Date().toLocaleTimeString()}] api rebuilt successfully.`)
          } else {
            console.error('❌ Rebuild had errors')
          }
        })
      }
    }
  ]
}

async function run() {
  if (isWatch) {
    const ctx = await esbuild.context(buildOptions)
    await ctx.watch()
    console.log('👀 Watching api for changes...')
  } else {
    await esbuild.build(buildOptions)
    console.log('✅ api build complete')
  }
}

run().catch(err => {
  console.error('Build failed:', err)
  process.exit(1)
})
