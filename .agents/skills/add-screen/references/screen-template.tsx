// Example for the add-screen skill. It is not a screen in the app.
// LoadingView, ErrorView, TeacherStackParamList, and the homework field
// do not exist yet. @ts-nocheck keeps the editor quiet.
// @ts-nocheck
import { useCallback } from 'react'
import { FlatList, RefreshControl } from 'react-native'
import { useQuery } from '@apollo/client/react'
import { useFocusEffect } from '@react-navigation/native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { TeacherStackParamList } from '@/navigation/types'
import { HomeworkDetailsDocument } from './HomeworkDetails.generated'

type Props = NativeStackScreenProps<TeacherStackParamList, 'HomeworkDetails'>

export function HomeworkDetailsScreen({ route }: Props) {
  const { data, loading, error, refetch } = useQuery(HomeworkDetailsDocument, {
    variables: { id: route.params.homeworkId },
    fetchPolicy: 'cache-and-network',
  })

  // Refresh when the user comes back to this screen
  // Apollo 4 refetch() rejects on failure; the error state renders from useQuery
  useFocusEffect(useCallback(() => { refetch().catch(() => {}) }, [refetch]))

  if (loading && !data) return <LoadingView />
  if (error && !data) return <ErrorView error={error} onRetry={() => refetch()} />
  if (!data?.homework) return <NotFoundView />  // null usually means RLS hid it

  return (
    <FlatList
      data={data.homework.exercises}
      keyExtractor={(e) => e.id}
      renderItem={({ item }) => <ExerciseRow exercise={item} />}
      ListEmptyComponent={<EmptyView text="No exercises yet" />}
      refreshControl={<RefreshControl refreshing={loading} onRefresh={() => refetch()} />}
    />
  )
}

// Register in the stack, and add to src/navigation/types.ts:
//   export type TeacherStackParamList = { HomeworkDetails: { homeworkId: string }; ... }
