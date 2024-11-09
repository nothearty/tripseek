/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as TripFormImport } from './routes/trip-form'
import { Route as AboutImport } from './routes/about'
import { Route as AuthenticatedImport } from './routes/_authenticated'
import { Route as IndexImport } from './routes/index'
import { Route as AuthenticatedTripsIndexImport } from './routes/_authenticated/trips/index'
import { Route as AuthenticatedTripsTripIdImport } from './routes/_authenticated/trips/$tripId'

// Create/Update Routes

const TripFormRoute = TripFormImport.update({
  path: '/trip-form',
  getParentRoute: () => rootRoute,
} as any)

const AboutRoute = AboutImport.update({
  path: '/about',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedRoute = AuthenticatedImport.update({
  id: '/_authenticated',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedTripsIndexRoute = AuthenticatedTripsIndexImport.update({
  path: '/trips/',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedTripsTripIdRoute = AuthenticatedTripsTripIdImport.update({
  path: '/trips/$tripId',
  getParentRoute: () => AuthenticatedRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated': {
      id: '/_authenticated'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthenticatedImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutImport
      parentRoute: typeof rootRoute
    }
    '/trip-form': {
      id: '/trip-form'
      path: '/trip-form'
      fullPath: '/trip-form'
      preLoaderRoute: typeof TripFormImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated/trips/$tripId': {
      id: '/_authenticated/trips/$tripId'
      path: '/trips/$tripId'
      fullPath: '/trips/$tripId'
      preLoaderRoute: typeof AuthenticatedTripsTripIdImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/trips/': {
      id: '/_authenticated/trips/'
      path: '/trips'
      fullPath: '/trips'
      preLoaderRoute: typeof AuthenticatedTripsIndexImport
      parentRoute: typeof AuthenticatedImport
    }
  }
}

// Create and export the route tree

interface AuthenticatedRouteChildren {
  AuthenticatedTripsTripIdRoute: typeof AuthenticatedTripsTripIdRoute
  AuthenticatedTripsIndexRoute: typeof AuthenticatedTripsIndexRoute
}

const AuthenticatedRouteChildren: AuthenticatedRouteChildren = {
  AuthenticatedTripsTripIdRoute: AuthenticatedTripsTripIdRoute,
  AuthenticatedTripsIndexRoute: AuthenticatedTripsIndexRoute,
}

const AuthenticatedRouteWithChildren = AuthenticatedRoute._addFileChildren(
  AuthenticatedRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '': typeof AuthenticatedRouteWithChildren
  '/about': typeof AboutRoute
  '/trip-form': typeof TripFormRoute
  '/trips/$tripId': typeof AuthenticatedTripsTripIdRoute
  '/trips': typeof AuthenticatedTripsIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof AuthenticatedRouteWithChildren
  '/about': typeof AboutRoute
  '/trip-form': typeof TripFormRoute
  '/trips/$tripId': typeof AuthenticatedTripsTripIdRoute
  '/trips': typeof AuthenticatedTripsIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/_authenticated': typeof AuthenticatedRouteWithChildren
  '/about': typeof AboutRoute
  '/trip-form': typeof TripFormRoute
  '/_authenticated/trips/$tripId': typeof AuthenticatedTripsTripIdRoute
  '/_authenticated/trips/': typeof AuthenticatedTripsIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '' | '/about' | '/trip-form' | '/trips/$tripId' | '/trips'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '' | '/about' | '/trip-form' | '/trips/$tripId' | '/trips'
  id:
    | '__root__'
    | '/'
    | '/_authenticated'
    | '/about'
    | '/trip-form'
    | '/_authenticated/trips/$tripId'
    | '/_authenticated/trips/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AuthenticatedRoute: typeof AuthenticatedRouteWithChildren
  AboutRoute: typeof AboutRoute
  TripFormRoute: typeof TripFormRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AuthenticatedRoute: AuthenticatedRouteWithChildren,
  AboutRoute: AboutRoute,
  TripFormRoute: TripFormRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_authenticated",
        "/about",
        "/trip-form"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_authenticated": {
      "filePath": "_authenticated.tsx",
      "children": [
        "/_authenticated/trips/$tripId",
        "/_authenticated/trips/"
      ]
    },
    "/about": {
      "filePath": "about.tsx"
    },
    "/trip-form": {
      "filePath": "trip-form.tsx"
    },
    "/_authenticated/trips/$tripId": {
      "filePath": "_authenticated/trips/$tripId.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/trips/": {
      "filePath": "_authenticated/trips/index.tsx",
      "parent": "/_authenticated"
    }
  }
}
ROUTE_MANIFEST_END */
