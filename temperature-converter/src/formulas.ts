interface Formulas {
  [key: string]: {
    [key: string]: (number: number) => number
  }
}

export const formulas : Formulas = {
  celsius: {
    fahrenheit: (number: number): number => (number * 9/5) + 32,
    kelvin: (number: number): number => number + 273.15
  },
  fahrenheit: {
    celsius: (number: number): number => (number - 32) * 5/9,
    kelvin: (number: number): number => (number - 32) * 5/9 + 273.15
  },
  kelvin: {
    celsius: (number: number): number => number - 273.15,
    fahrenheit: (number: number): number => (number - 273.15) * 9/5 + 32
  }
};