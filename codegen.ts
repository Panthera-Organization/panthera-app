import type { CodegenConfig } from "@graphql-codegen/cli";

const schemaPath = process.env.GRAPHQL_SCHEMA_PATH ?? "./schema.graphql";

const sharedSchemaConfig = {
  nonOptionalTypename: true,
  skipTypeNameForRoot: true,
  useTypeImports: true,
};

const config: CodegenConfig = {
  overwrite: true,
  schema: schemaPath,
  documents: ["src/**/*.graphql"],
  ignoreNoDocuments: true,
  generates: {
    "src/graphql/__generated__/types.ts": {
      plugins: ["typescript"],
      config: sharedSchemaConfig,
    },
    "src/": {
      preset: "near-operation-file",
      presetConfig: {
        baseTypesPath: "~@/graphql/__generated__/types",
        extension: ".generated.ts",
      },
      plugins: ["typescript-operations", "typed-document-node"],
      config: sharedSchemaConfig,
    },
  },
};

export default config;
