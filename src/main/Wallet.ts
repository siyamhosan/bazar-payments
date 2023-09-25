import { PayWalletConfig } from '../interface/types'
import { get } from '../utils/request'

export class PayWallet {
  private key: string
  public walletId: string
  private baseUrl = 'https://api.bazarexchange.ltd'

  constructor (config: PayWalletConfig) {
    this.key = config.key
    this.walletId = config.walletId
    if (config.testing) {
      this.baseUrl = 'http://localhost:8080'
    }
  }

  async getBalance () {
    const url = new URL(`/wallet/${this.walletId}`, this.baseUrl)
    const headers = this.getHeaders()

    const response = await get(url.toString(), headers)
    return response
  }

  getHeaders () {
    return {
      authorization: 'Bearer ' + this.key,
      accept: 'application/json',
      'content-type': 'application/json'
    }
  }
}
