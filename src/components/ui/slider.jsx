"use client"

import * as React from "react"
import { Slider as SliderPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}) {
  const _values = React.useMemo(() =>
    Array.isArray(value)
      ? value
      : Array.isArray(defaultValue)
        ? defaultValue
        : [min, max], [value, defaultValue, min, max])

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        "relative flex w-full touch-none items-center select-none py-1 data-disabled:opacity-50 data-vertical:h-full data-vertical:min-h-40 data-vertical:w-auto data-vertical:flex-col",
        className
      )}
      {...props}>
      <SliderPrimitive.Track
        data-slot="slider-track"
        className="relative grow overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700 data-horizontal:h-2 data-horizontal:w-full data-vertical:h-full data-vertical:w-2">
        <SliderPrimitive.Range
          data-slot="slider-range"
          className="absolute rounded-full bg-primary select-none data-horizontal:h-full data-vertical:w-full" />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className="relative block size-5 shrink-0 rounded-full border-4 border-background bg-primary shadow-sm ring-primary/15 transition-[transform,box-shadow] duration-200 ease-out select-none after:absolute after:-inset-2 hover:scale-[1.02] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50" />
      ))}
    </SliderPrimitive.Root>
  );
}

export { Slider }
