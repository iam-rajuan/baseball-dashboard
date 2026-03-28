import axios from 'axios'

export const api = axios.create({
  baseURL: '/api',
})

export const simulateNetwork = async <T>(value: T, delay = 180) =>
  new Promise<T>((resolve) => {
    window.setTimeout(() => resolve(value), delay)
  })
