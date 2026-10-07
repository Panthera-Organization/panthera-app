import { useCallback } from 'react'
import { FlatList, RefreshControl } from 'react-native'
import { useQuery } from '@apollo/client/react'
import { useFocusEffect } from '@react-navigation/native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { TeacherStackParamList } from '@/navigation/types'
import { HomeworkDetailsQuery } from './HomeworkDetails.operations'

type Props = NativeStackScreenProps<TeacherStackParamList, 'HomeworkDetails'>

export function HomeworkDetailsScreen({ route }: Props) {
  const { data, loading, error, refetch } = useQuery(HomeworkDetailsQuery, {
    variables: { id: route.params.homeworkId },
    fetchPolicy: 'cache-and-network',
  })

  // Refresh when the user comes back to this screen
  useFocusEffect(useCallback(() => { refetch() }, [refetch]))

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
