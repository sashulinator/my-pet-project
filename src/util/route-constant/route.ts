export type Routes = { [key: string]: Route }

export type AdditionalProps = {
  readonly ICON?: JSX.Element
  readonly LABEL?: string
  REDIRECT?: string | Route
}

export type MandateProps = {
  readonly PATH: string
  readonly NAME: string
}

export type RouteProps = MandateProps & AdditionalProps

export class Route implements RouteProps {
  NAME: string

  PATH: string

  REDIRECT?: AdditionalProps['REDIRECT']

  LABEL?: string

  ICON?: JSX.Element

  isPrevious: boolean

  constructor(name: MandateProps['NAME'], path: MandateProps['PATH'], additionalProps?: AdditionalProps) {
    this.NAME = name
    this.PATH = path

    this.ICON = additionalProps?.ICON
    this.LABEL = additionalProps?.LABEL
    this.REDIRECT = additionalProps?.REDIRECT

    this.isPrevious = false
  }

  get isCurrent(): boolean {
    return buildPathRegExp(this.PATH, true).test(window?.location?.pathname)
  }

  get REDIRECT_PATH(): string {
    if (!this.REDIRECT) return this.PATH
    const res = this.REDIRECT instanceof Route ? this.REDIRECT.REDIRECT_PATH : this.REDIRECT
    return res
  }

  toString = (): string => {
    return this.REDIRECT?.toString() || this.PATH
  }

  isPartOf = (path?: string): boolean => {
    return buildPathRegExp(this.PATH).test(path || window.location.pathname)
  }

  static new(name: MandateProps['NAME'], path: MandateProps['PATH'], additionalProps?: AdditionalProps): Route {
    return new Route(name, path, additionalProps)
  }
}

function buildPathRegExp(path: string, end?: boolean): RegExp {
  return new RegExp(`${path.replace(/:(.)+\//, `(.)+/`).replace(/:(.)+/, `(.)+`)}${end ? '$' : ''}`)
}
