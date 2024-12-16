export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' + name.replace(/([.$?*|{}()[]\+])/g, '\\$1') + '=([^;]*)',
    ),
  )
  return matches ? decodeURIComponent(matches[1]) : undefined
}

interface CookieProps {
  expires?: Date | number | string
  path?: string
  domain?: string
  secure?: boolean
  sameSite?: 'Strict' | 'Lax' | 'None'
}

export function setCookie(
  name: string,
  value: string,
  props: CookieProps = {},
) {
  let exp = props.expires

  if (typeof exp === 'number' && exp) {
    const d = new Date()
    d.setTime(d.getTime() + exp * 1000)
    exp = d
  }

  if (exp instanceof Date) {
    props.expires = exp.toUTCString()
  }

  value = encodeURIComponent(value)
  let updatedCookie = `${name}=${value}`

  for (const propName in props) {
    if (Object.prototype.hasOwnProperty.call(props, propName)) {
      updatedCookie += `; ${propName}`
      const propValue = props[propName as keyof CookieProps]
      if (propValue !== true) {
        updatedCookie += `=${propValue}`
      }
    }
  }

  document.cookie = updatedCookie
}
