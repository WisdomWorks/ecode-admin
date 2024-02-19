/* eslint-disable @typescript-eslint/no-unused-vars */
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

export const generateCustomComponentPlugin = (
  theme: TTheme,
): CSSRuleObject[] => {
  return [
    {
      '.submitBtn': {
        display: 'flex',
        alignItems: 'center',
        padding: '12px 18px',
        justifyContent: 'center',
        fontSize: '14px',
        fontWeight: 400,
        lineHeight: '22px',
        color: `${theme('colors.white')}`,
        background: `${theme('colors.primary.500')}`,
        border: 'none',
        borderRadius: '8px',

        '&:disabled': {
          opacity: 0.4,
        },
      },
    },
    {
      '.cancelBtn': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '12px 18px',
        fontSize: '14px',
        fontWeight: 400,
        lineHeight: '22px',
        color: `${theme('colors.white')}`,
        background: 'transparent',
        border: 'none',
        borderRadius: '8px',

        '&:disabled': {
          opacity: 0.4,
        },

        '&:hover': {
          color: `${theme('colors.neutral.500')}`,
          background: '${theme(colors.neutral-250)}',
        },

        '&:active': {
          color: `${theme('colors.neutral.500')}`,
          background: `${theme('colors.neutral.300')}`,
        },
      },
    },
    {
      '.clearBtn': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        addingRight: '16px',
        padding: '12px 18px',
        paddingLeft: '16px',
        fontSize: '14px',
        fontWeight: 400,
        lineHeight: '22px',
        color: `${theme('colors.white')}`,
        background: `${theme('colors.neutral.500')}`,
        border: 'none',
        borderRadius: '8px',

        '&:disabled': {
          opacity: 0.4,
        },

        '&:hover': {
          color: `${theme('colors.white')}`,
          background: `${theme('colors.neutral.550')}`,
        },

        '&:active': {
          color: `${theme('colors.white')}`,
          background: `${theme('colors.neutral.600')}`,
        },
      },
    },
  ]
}
