import { isString } from 'lodash-es'

export type IjumpAppPage = {
  redirect_target: string
  redirect_type: number
}

export type IOfflineDev = {
  member_name: string
  data: any
}

export type ICoupon = {
  coupon_no: number | string
  coupon_id: number | string
}

/**
 * 登录成功通知客户端
 * @param config
 */
export function loginComplete(config: { login_credential?: string }) {
  window.webkit.messageHandlers.loginComplete.postMessage(config)
}

/**
 * 注册成功通知客户端
 * @param config
 */
export function registerComplete(config: { login_credential?: string }) {
  window.webkit.messageHandlers.registerComplete.postMessage(config)
}

/**
 * 关闭登录弹窗
 * @param config
 */
export function closeLoginWindow() {
  window.webkit.messageHandlers.closeLoginWindow.postMessage({})
}

/**
 * 唤起登录弹窗
 * @param config
 */
export function openLoginComponent() {
  window.webkit.messageHandlers.openLoginComponent.postMessage({})
}

/**
 * 唤起多设备弹窗
 * @param config
 */
export function needOfflineOtherDevice(config: IOfflineDev) {
  window.webkit.messageHandlers.needOfflineOtherDevice.postMessage(config)
}

/**
 * 使用优惠券
 * @param config
 */
export function useCoupon(config: ICoupon) {
  window.webkit.messageHandlers.useCoupon.postMessage(config)
}

/**
 * 使用优惠券
 * @param config
 */
export function paySuccess() {
  window.webkit.messageHandlers.paySuccess.postMessage({})
}

/**
 * 唤起客服
 * @param config
 */
export function openCustomerServer() {
  window.webkit.messageHandlers.openCustomerServer.postMessage({})
}

/**
 * 数据上报
 * 示例：dataUpload('member_pay_success_show')
 * @param config
 */
export function dataUpload(key: string, param?: string) {
  const config = {
    key,
    param: param || '',
  }
  window.webkit.messageHandlers.dataUpload.postMessage(config)
}

/**
 * 获取客户端自定义UserAgent
 */
export function getCustomUserAgent() {
  window.webkit.messageHandlers.getCustomUserAgent.postMessage({})
  window.setCustomUserAgent = (res) => {
    window.customUserAgent = res || ''
  }
}

/**
 * 获取客户端用户登录凭证
 * @param devToken 用于开发环境的自定义Token
 * @returns
 */
export function getLoginCredential(devToken?: string) {
  return new Promise((resolve, reject) => {
    if (devToken) {
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
}
