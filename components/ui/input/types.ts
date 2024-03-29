import { ComponentProps } from '../utils'
import React, { ChangeEventHandler } from 'react'
export type { Theme } from '../theme'

export enum InputMessageVariant {
  error,
  warning,
  success,
}
export type InputMessageVariants = keyof typeof InputMessageVariant

export enum InputType {
  text,
  password,
  number,
  email,
  search,
  tel,
  url,
}
export type InputTypes = keyof typeof InputType

export enum InputVariant {
  small,
  default,
  nopadding,
}
export type InputVariants = keyof typeof InputVariant

export enum InputColor {
  default,
  accent,
}
export type InputColors = keyof typeof InputColor

type CommonProps = {
  label?: React.ReactNode
  error?: React.ReactNode | boolean
  warning?: React.ReactNode | boolean
  success?: React.ReactNode | boolean
  variant?: InputVariants
  color?: InputColors
  active?: boolean
  fullwidth?: boolean
  wrapperRef?: React.RefObject<HTMLDivElement>
  as?: never
}

export type InputProps = ComponentProps<
  'input',
  CommonProps & {
    type?: InputTypes
    leftDecorator?: React.ReactNode
    rightDecorator?: React.ReactNode
  }
>

export type TextareaProps = ComponentProps<'textarea', CommonProps>

export type InputGroupProps = ComponentProps<
  'span',
  {
    fullwidth?: boolean
    error?: React.ReactNode
    success?: React.ReactNode
  }
>

type SliderProps = {
  value: number
  onChange?: ChangeEventHandler<HTMLInputElement>
  min?: number
  max?: number
  minLabel?: React.ReactNode
  maxLabel?: React.ReactNode
  step?: number
  getLabel?: (value: number) => React.ReactNode
  rightDecorator?: React.ReactNode
}

export type SliderInputProps = ComponentProps<'input', SliderProps>

type SliderOptionValue = string | number

interface SliderOption {
  value: SliderOptionValue
  label: React.ReactNode
}

interface OptionsSliderProps {
  options: [SliderOption, SliderOption, ...SliderOption[]] // this is declaration like T[] but with "at least 2 elements" constraint
  value?: SliderOptionValue // if value is not provided, component should act isolated; initial value should be first option
  onChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    value: SliderOptionValue,
    valueIndex: number
  ) => unknown
}

export type OptionsSliderInputProps = ComponentProps<
  'input',
  OptionsSliderProps
>
