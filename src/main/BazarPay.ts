import { Headers } from '../interface/headers.interface'
import {
  CreatePayment,
  CreateWallet,
  ResponsePaymentCreate,
  ResponseWalletCreate
} from '../interface/types'
import { get, post } from '../utils/request'

export class BazarPayClient {
  private key: string
  private baseUrl = 'https://api.bazarexchange.ltd'

  constructor (key: string, { testing }: { testing?: boolean } = {}) {
    this.key = key
    if (testing) {
      this.baseUrl = 'http://localhost:8080'
    }
  }

  async createPayment (options: CreatePayment): Promise<ResponsePaymentCreate> {
    const url = new URL('/payment/create', this.baseUrl)
    const headers = this.getHeaders()

    const modifiedAmount = parseFloat(options.amount.toString()).toFixed(2)

    url.searchParams.append('amount', modifiedAmount)
    url.searchParams.append('currency', options.currency)
    url.searchParams.append('callbackUrl', options.callbackUrl)
    url.searchParams.append('walletId', options.walletId || '')

    console.log(url.toString())

    const response = await post(url.toString(), {}, headers)
    return response as ResponsePaymentCreate
  }

  async ping () {
    const url = new URL('/payment/ping', this.baseUrl)
    const headers = this.getHeaders()
    const response = await get(url.toString(), headers)
    return response
  }

  async createWallet (options: CreateWallet): Promise<ResponseWalletCreate> {
    const url = new URL('/agent/create-wallet', this.baseUrl)
    const headers = this.getHeaders()
    const response = await post(url.toString(), options, headers)
    return response as ResponseWalletCreate
  }

  getHeaders (): Headers {
    return {
      authorization: 'Bearer ' + this.key,
      accept: 'application/json',
      'content-type': 'application/json'
    }
  }
}
