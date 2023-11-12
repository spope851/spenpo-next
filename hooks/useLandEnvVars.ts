import { ProjectEnvVariableInput } from "@/context/shoppingCart"
import { useMemo } from "react"

export const useLandEnvVars = (
  variables: Record<string, string | undefined>
): ProjectEnvVariableInput[] => {
  const environmentVariables = useMemo(() => {
    return Object.entries(variables)
      .filter(([, value]) => !!value)
      .map(([key, value]) => {
        return {
          key,
          target: "production",
          type: "encrypted",
          value: value!,
        }
      })
  }, [variables])

  return environmentVariables
}
