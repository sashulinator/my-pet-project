import { Route } from './route'

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
export function getListForEveryLocation(ROUTES: any, pathnameArg?: string): Route[] {
  const pathname = pathnameArg || window.location.pathname

  const routesResult: Route[] = []

  const keys = Object.keys(ROUTES)

  for (let i = 0; i < keys.length; i += 1) {
    const route = ROUTES[keys[i]]

    if (route.isPartOf(pathname)) routesResult.push(route)
  }

  routesResult.sort((a, b) => (a.PATH.length > b.PATH.length ? 1 : -1))

  return routesResult
}
