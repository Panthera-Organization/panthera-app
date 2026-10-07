# Data patterns

## Operations

Put operations in `<Screen>.operations.ts` and select only what the screen renders, with `id` on every object:

```ts
import { graphql } from '@/graphql/generated'

export const HomeworkDetailsQuery = graphql(`
  query HomeworkDetails($id: ID!) {
    homework(id: $id) {
      id
      title
      dueAt
      exercises { id description imagePath }
    }
  }
`)
```

## Fetch policies

| Screen type | `fetchPolicy` |
|---|---|
| Profile, company, rarely changing details | `cache-first` (default) |
| Calendar, frequently changing lists | `cache-and-network` |
| Must be fresh every time (invite preview) | `network-only` |

## Mutations

```tsx
import { useMutation } from '@apollo/client/react'

const [createHomework, { loading: saving }] = useMutation(CreateHomeworkMutation)

await createHomework({
  variables: { input },
  refetchQueries: [CalendarQuery],   // creates and deletes don't update lists by themselves
})
```

- **Editing an existing object:** nothing extra is needed if the mutation returns it with `id`.
- **Creating or deleting:** add `refetchQueries` for the affected lists. Use `cache.modify` / `cache.evict` only if the user asks or the refetch is noticeably slow.
- **Related changes:** request the related objects back too (for example `assignment { id status }` after submitting an answer).

## Forms

- Use `react-hook-form`.
- Disable submit while saving.
- Show mutation errors next to the form, and handle the server rejecting an action the UI allowed.
