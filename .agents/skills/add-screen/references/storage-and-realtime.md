# Storage and Realtime

## Image uploads

Upload directly to Supabase Storage, then send only the path through GraphQL. Paths start with the company id, so Storage policies can check membership.

```ts
const path = `${companyId}/answers/${assignmentId}/${exerciseId}-${Date.now()}.jpg`

// body: an ArrayBuffer of the picked image (React Native can't upload a File/Blob directly)
const { error } = await supabase.storage
  .from('answers')
  .upload(path, body, { contentType: 'image/jpeg' })
if (error) throw error

await submitAnswer({ variables: { input: { assignmentId, exerciseId, text, imagePath: path } } })
```

Display images with `expo-image`, using a signed URL or a public URL as the bucket requires.

## Realtime

Only for screens that must update live. Subscribe with the Supabase client, refetch the Apollo query on events, and always clean up:

```tsx
useEffect(() => {
  const channel = supabase
    .channel(`assignment-${assignmentId}`)
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'answers', filter: `assignment_id=eq.${assignmentId}` },
      () => { refetch() },
    )
    .subscribe()

  return () => { supabase.removeChannel(channel) }
}, [assignmentId, refetch])
```

Don't store Realtime payloads in local state. The refetch brings the new data into Apollo, and every screen updates from there.
