export class BazarPayException extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'BazarException'
    this.stack = this.stack ?? new Error().stack
  }
}
