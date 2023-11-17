declare global {
  interface Window {
    mbQuery?: <T = any>(x: number, y: string, cb?: (msg: string, res: any) => void) => Promise<T>
    clientChannelId: string
    LoginCredential?: string
    gtag?: (...args: any) => any
    _hmt?: any[]
    webkit?: any
    setAuthenticationInfo?: (...args: any) => void
    customUserAgent?: string
    setCustomUserAgent?: (...args: any) => void
  }

  type Recordable<T = any> = Record<string, T>
}

export {}
