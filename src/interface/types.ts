export type CreatePayment = {
  amount: string | number
  currency: 'BDT'
  callbackUrl: string
  walletId?: string

  reference?: string
}

export type ResponsePaymentCreate =
  | {
      paymentId: string
      amount: number
      currency: string
      url: string
      agentId: string
      walletId?: string
      reference?: string
    }
  | {
      statusCode: number
      message: string
    }

export type CreateWallet = {
  username: string
  mail: string
  currency: 'BDT'
}

export type ResponseWalletCreate =
  | {
      walletId: string
      username: string
      mail: string
      currency: string
      license: string
      isSuccessful: true
    }
  | {
      statusCode: number
      message: string
    }

export type PayWalletConfig = {
  walletId: string
  key: string
  testing?: boolean
}
