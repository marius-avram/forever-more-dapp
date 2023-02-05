import React from 'react'
import { InputRightDecoratorStyle } from './InputStyles';
import {
  Label,
  LabelContainer,
  RangeInputSlider,
  RightDecoratorContainer,
  Slider,
  SliderWrapper,
  Track,
} from './SliderInputStyles'
import { SliderInputProps } from './types'

function SliderInput({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  minLabel,
  maxLabel,
  rightDecorator,
  getLabel = (val) => String(val),
}: SliderInputProps): React.ReactElement {
  const fillPercentage = ((value - min) / (max - min)) * 100
  const hasRightDecorator = !!rightDecorator;

  return (
    <SliderWrapper>
      <Slider>
          <span>{getLabel(value)}</span>
          {hasRightDecorator && 
            <RightDecoratorContainer>{rightDecorator}</RightDecoratorContainer>
          }
        <Track fillPercentage={fillPercentage} />
      </Slider>
      <RangeInputSlider
        value={value}
        step={step}
        onChange={onChange}
        min={min}
        max={max}
      />
      <LabelContainer>
        <Label>{minLabel}</Label>
        <Label>{maxLabel}</Label>
      </LabelContainer>
    </SliderWrapper>
  )
}

export default SliderInput
