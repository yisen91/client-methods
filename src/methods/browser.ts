export interface IBrowserType {
    // 是否是平板电脑
    isTablet: boolean
    // 是否是Ipad
    isIpad: boolean
    // 是否是安卓Pad
    isAndroidPad: boolean
    isPhone: boolean
    isAndroid: boolean
    isWindowsPc: boolean
    isMac: boolean
}

export const isBrowser = typeof window !== 'undefined'

export const isNavigator = typeof window.navigator !== 'undefined'

export function getUserAgent(useragent?: string) {
    if (useragent) {
        return useragent
    }
    if (isBrowser) {
        return window.navigator.userAgent.toLowerCase();
    }
    return null
}

/**
 * 根据ua检测当前设备类型
 * @param useragent 
 * @returns 
 */
export function checkBrowserType(useragent?: string) {
    const ua = getUserAgent(useragent)
    if (!ua) return false
    const isWindowsPhone = /windows phone/.test(ua);
    const isSymbian = /symbianos/.test(ua) || isWindowsPhone;
    const isAndroid = /android/.test(ua);
    const isFirefox = /firefox/.test(ua);
    const isChrome = /chrome|crios/.test(ua);
    const isTablet = /ipad|playbook/.test(ua) || (isAndroid && !/mobile/.test(ua)) || (isFirefox && /tablet/.test(ua));
    const isIpad = /ipad|playbook/.test(ua);
    const isAndroidPad = (isAndroid && !/mobile/.test(ua)) || (isFirefox && /tablet/.test(ua));
    const isPhone = /iphone/.test(ua) && !isTablet;
    const isMac = /macintosh|mac os x/i.test(ua);
    const isWindowsPc = !isPhone && !isAndroid && !isSymbian && !isMac;
    return {
        isTablet,
        isIpad,
        isAndroidPad,
        isPhone,
        isAndroid,
        isWindowsPc,
        isMac,
    } as IBrowserType
}

/**
 * 是否是微信浏览器
 * @param useragent 
 * @returns 
 */
export function isWXBrowser(useragent?: string): boolean {
    const ua = getUserAgent(useragent)
    if (!ua) return false
    return ua.includes('micromessenger');
}
