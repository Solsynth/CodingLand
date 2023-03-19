export class Temperature {
  // Unit is Kelvin, use toString or forNumber to covert units
  temperature: number

  constructor(temperature: number) {
    this.temperature = temperature
  }

  static fromJSON(save: any): Temperature {
    return Object.setPrototypeOf(save, Temperature.prototype)
  }

  toNumber(unit: "kelvin" | "celsius" | "fahrenheit") {
    switch (unit) {
      case "kelvin":
        return this.temperature
      case "celsius":
        return this.temperature + 273.15
      case "fahrenheit":
        return this.temperature * 9 / 5 - 459.67
    }
  }

  toString(unit: "kelvin" | "celsius" | "fahrenheit", radix?: number) {
    return this.toNumber(unit).toString(radix)
  }
}