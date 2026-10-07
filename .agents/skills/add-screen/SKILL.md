---
name: add-screen
description: Build or change a screen in panthera-app (Expo + React Native) — React Navigation registration with typed params, Apollo operations via codegen, loading/error/empty states, refresh, Storage uploads and Realtime, without duplicating server data in local state. Use whenever a task adds or changes a screen, list, form, detail view or navigation flow, or wires a screen to GraphQL data.
---

# Add or change a screen

The app uses React Navigation native stacks (`Unauthenticated`, `Teacher`, `Student`), Apollo Client 4 (hooks from `@apollo/client/react`), and GraphQL Code Generator (client preset). `schema.graphql` is a read-only snapshot maintained by a bot PR. Auth, Storage and Realtime use the Supabase client directly.

## Before you start

- Settle the stack, the route params (ids only, never whole objects), the roles that see the screen, its data and its actions. If the UX is unclear, ask; that's the human's call.
- Search `schema.graphql` for the fields and mutations you need. If something is missing, the change belongs in `panthera-backend` (`add-graphql-field`). **Never edit `schema.graphql`.** To build before that change merges, run codegen with `GRAPHQL_SCHEMA_PATH=../panthera-backend/supabase/functions/_shared/graphql/schema.graphql`, and tell the user about the dependency.

## Steps

1. Write the operations in `<Screen>.operations.ts` with `graphql()`, following `references/data-patterns.md`. Then run `npx graphql-codegen`.
2. Build the screen from `references/screen-template.tsx`, with all five states.
3. Register it in its stack and add its params to `src/navigation/types.ts`.
4. Add mutations, forms, uploads or Realtime as needed, using `references/data-patterns.md` and `references/storage-and-realtime.md`.
5. Run `npx graphql-codegen && npx tsc --noEmit && npx eslint .`, then run the screen on a device or simulator.

## Rules

- **Select `id` on every object.** Mutations return the changed objects with `id`.
- **Creates and deletes need `refetchQueries`.** Edits update automatically.
- **Server data lives only in Apollo.** Never copy query results into `useState`, Context or a store; filter and sort at render time.
- Client-only state uses component state, react-hook-form, navigation params, the existing contexts, or Apollo reactive vars. **No Zustand** unless the user has decided to add it.
- Files go straight to Storage, and only the path goes through GraphQL.
- The backend enforces business rules. The UI may hide impossible actions, but must handle rejections.

## Done when

- [ ] Loading, error (with retry), not found, empty and data states all render
- [ ] Lists refresh on focus and on pull-to-refresh
- [ ] Codegen, type-check and lint pass
- [ ] Checked on a device or simulator

## Report

Give the user: the new or changed screens and routes, the operations used, any dependency on an unmerged backend change, and anything not verified on a device.

## References

- `references/screen-template.tsx`: screen structure with states and refresh. Step 2.
- `references/data-patterns.md`: operations, fetch policies, mutations and forms. Steps 1 and 4.
- `references/storage-and-realtime.md`: image uploads and live updates. Step 4.
