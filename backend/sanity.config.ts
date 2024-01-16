import {defineConfig} from '@sanity-typed/types'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
// import type {InferSchemaValues} from '@sanity-typed/types'

export default defineConfig({
  name: 'default',
  title: 'portfolio',

  projectId: '2t6nt2k3',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})

// client side type validation
// export type SanityValues = InferSchemaValues<typeof config>
