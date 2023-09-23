import { BaseUrl } from '../interface/base'
import { PayWalletConfig } from '../interface/types'
import { get } from '../utils/request'

export class PayWallet {
  private key: string
  public walletId: string
  private baseUrl = BaseUrl

  constructor (config: PayWalletConfig) {
    this.key = config.key
    this.walletId = config.walletId
  }

  async getBalance () {
    const url = new URL(`/wallet/${this.walletId}`, this.baseUrl)
    const headers = this.getHeaders()
    console.log(
      '🚀 ~ file: Wallet.ts:18 ~ PayWallet ~ getBalance ~ headers:',
      headers
    )
    console.log(url.toString())

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
