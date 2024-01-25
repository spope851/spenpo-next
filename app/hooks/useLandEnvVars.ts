import { ProjectEnvVariableInput } from '@/app/context/shoppingCart'
import { useMemo } from 'react'

export const useLandEnvVars = (
  variables: Record<string, string | undefined>
): ProjectEnvVariableInput[] => {
  const environmentVariables = useMemo(() => {
    return Object.entries(variables).map(([key, value]) => {
      return {
        key,
        target: 'production',
        type: 'encrypted',
        value: value || '',
      }
    })
  }, [variables])

  return environmentVariables
}
