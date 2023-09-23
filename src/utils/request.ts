import AbortController from 'abort-controller'
import { Headers } from '../interface/headers.interface'
import { BazarPayException } from '../interface/exception'

interface IPayload {
  [key: string]: unknown
}

export async function get<T> (
  url: string,
  additionalHeaders: Headers
): Promise<T> {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Accept: 'application/json',
      ...additionalHeaders
    }
  })
  const parsed = (await response.json()) as any
  if (parsed.errorMessage) throw new BazarPayException(parsed.errorMessage)
  return parsed
}

export async function post<T> (
  url: string,
  payload: IPayload = {},
  additionalHeaders: Headers
): Promise<T> {
  const controller = new AbortController()
  const timeout = setTimeout(() => {
    controller.abort()
  }, 30 * 1000)
  const response = await fetch(url, {
    headers: {
      'content-type': 'application/json',
      Accept: 'application/json',
      ...additionalHeaders
    },
    body: JSON.stringify(payload),
    method: 'POST'
    // signal: controller.signal,
  })

  clearTimeout(timeout)
  const parsed = (await response.json()) as any
  if (parsed.errorMessage) throw new BazarPayException(parsed.errorMessage)
  return parsed
}
