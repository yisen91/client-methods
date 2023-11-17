import { isString } from 'lodash-es'

export const macosMethods = {
  /**
   * 登录成功
   * @param config
   */
  loginComplete: (config = {}) => {
    try {
      window.webkit.messageHandlers.loginComplete.postMessage(config)
    } catch (e) {
      console.log(e)
    }
  },

  registerComplete: (config = {}) => {
    window.webkit.messageHandlers.registerComplete.postMessage(config)
  },
  jumpAppPage: (config = {}) => {
    window.webkit.messageHandlers.jumpAppPage.postMessage(config)
  },
  closeWeb: (config = {}) => {
    window.webkit.messageHandlers.closeWeb.postMessage(config)
  },
  closeLoginWindow: (config = {}) => {
    window.webkit.messageHandlers.closeLoginWindow.postMessage(config)
  },
  openLoginComponent: () => {
    window.webkit.messageHandlers.openLoginComponent.postMessage({})
  },
  requestGuestLogin: () => {
    window.webkit.messageHandlers.loginWithoutAccount.postMessage({})
  },
  needOfflineOtherDev: (devmsgs: string) => {
    window.webkit.messageHandlers.needOfflineOtherDevice.postMessage(devmsgs)
  },
  useCoupon: (config = {}) => {
    window.webkit.messageHandlers.useCoupon.postMessage(config)
  },
  paySuccess: () => {
    window.webkit.messageHandlers.paySuccess.postMessage({})
  },
  openCustomerServer: () => {
    window.webkit.messageHandlers.openCustomerServer.postMessage({})
  },
  dataUpload: (key: string, param?: string) => {
    const config = {
      key,
      param: param || '',
    }
    window.webkit.messageHandlers.dataUpload.postMessage(config)
  },
  toCustomerService() {
    window.webkit.messageHandlers.toCustomerService.postMessage({})
  },
  closeVipCenterWindow() {
    window.webkit.messageHandlers.closeVipCenterWindow.postMessage({})
  },
  getLoginCredential: (devToken?: string) => {
    return new Promise((resolve, reject) => {
      if (process.env.NODE_ENV === 'development' && devToken) {
        window.LoginCredential = devToken
        resolve(devToken)
      }
      window.webkit.messageHandlers.getAuthenticationInfo.postMessage({})
      window.setAuthenticationInfo = (res) => {
        if (res) {
          if (isString(res)) {
            const data = JSON.parse(res)
            window.LoginCredential = data.token
            resolve(JSON.parse(res))
          } else {
            window.LoginCredential = res.token
            resolve(res)
          }
        } else {
          reject(new Error('no data'))
        }
      }
    })
  },
}
