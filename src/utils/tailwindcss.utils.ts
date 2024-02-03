import { CSSProperties } from 'react'

import classNames from 'classnames'
import { twMerge } from 'tailwind-merge'

import { Config } from 'tailwindcss'

type TTheme = <TDefaultValue = Config['theme']>(
  path?: string,
  defaultValue?: TDefaultValue,
) => TDefaultValue
type RecursiveKeyValuePair<T> = {
  [key: string]: RecursiveKeyValuePair<T> | T
}
type CSSRuleObject = RecursiveKeyValuePair<
  CSSProperties | number | string | null
>

export const cn = (...input: classNames.ArgumentArray) => {
  return twMerge(classNames(input))
}

export const generateCustomComponentPlugin = (_: TTheme): CSSRuleObject[] => {
  return []
}
