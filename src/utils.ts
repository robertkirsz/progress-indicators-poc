export const clamp = (min: number, value: number, max: number) => Math.min(Math.max(value, min), max)

export const randomInt = (min = 5, max = 20) => Math.floor(Math.random() * (max - min + 1)) + min
