/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from "./routes/__root";
import { Route as ComingSoonImport } from "./routes/coming-soon";
import { Route as AboutImport } from "./routes/about";
import { Route as AuthenticatedImport } from "./routes/_authenticated";
import { Route as IndexImport } from "./routes/index";
import { Route as AuthenticatedTripFormImport } from "./routes/_authenticated/trip-form";
import { Route as AuthenticatedTripsIndexImport } from "./routes/_authenticated/trips/index";
import { Route as AuthenticatedTripsTripIdImport } from "./routes/_authenticated/trips/$tripId";

// Create/Update Routes

const ComingSoonRoute = ComingSoonImport.update({
  path: "/coming-soon",
  getParentRoute: () => rootRoute,
} as any);

const AboutRoute = AboutImport.update({
  path: "/about",
  getParentRoute: () => rootRoute,
} as any);

const AuthenticatedRoute = AuthenticatedImport.update({
  id: "/_authenticated",
  getParentRoute: () => rootRoute,
} as any);

const IndexRoute = IndexImport.update({
  path: "/",
  getParentRoute: () => rootRoute,
} as any);

const AuthenticatedTripFormRoute = AuthenticatedTripFormImport.update({
  path: "/trip-form",
  getParentRoute: () => AuthenticatedRoute,
} as any);

const AuthenticatedTripsIndexRoute = AuthenticatedTripsIndexImport.update({
  path: "/trips/",
  getParentRoute: () => AuthenticatedRoute,
} as any);

const AuthenticatedTripsTripIdRoute = AuthenticatedTripsTripIdImport.update({
  path: "/trips/$tripId",
  getParentRoute: () => AuthenticatedRoute,
} as any);

// Populate the FileRoutesByPath interface

declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/": {
      id: "/";
      path: "/";
      fullPath: "/";
      preLoaderRoute: typeof IndexImport;
      parentRoute: typeof rootRoute;
    };
    "/_authenticated": {
      id: "/_authenticated";
      path: "";
      fullPath: "";
      preLoaderRoute: typeof AuthenticatedImport;
      parentRoute: typeof rootRoute;
    };
    "/about": {
      id: "/about";
      path: "/about";
      fullPath: "/about";
      preLoaderRoute: typeof AboutImport;
      parentRoute: typeof rootRoute;
    };
    "/coming-soon": {
      id: "/coming-soon";
      path: "/coming-soon";
      fullPath: "/coming-soon";
      preLoaderRoute: typeof ComingSoonImport;
      parentRoute: typeof rootRoute;
    };
    "/_authenticated/trip-form": {
      id: "/_authenticated/trip-form";
      path: "/trip-form";
      fullPath: "/trip-form";
      preLoaderRoute: typeof AuthenticatedTripFormImport;
      parentRoute: typeof AuthenticatedImport;
    };
    "/_authenticated/trips/$tripId": {
      id: "/_authenticated/trips/$tripId";
      path: "/trips/$tripId";
      fullPath: "/trips/$tripId";
      preLoaderRoute: typeof AuthenticatedTripsTripIdImport;
      parentRoute: typeof AuthenticatedImport;
    };
    "/_authenticated/trips/": {
      id: "/_authenticated/trips/";
      path: "/trips";
      fullPath: "/trips";
      preLoaderRoute: typeof AuthenticatedTripsIndexImport;
      parentRoute: typeof AuthenticatedImport;
    };
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexRoute,
  AuthenticatedRoute: AuthenticatedRoute.addChildren({
    AuthenticatedTripFormRoute,
    AuthenticatedTripsTripIdRoute,
    AuthenticatedTripsIndexRoute,
  }),
  AboutRoute,
  ComingSoonRoute,
});

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
        "/coming-soon"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_authenticated": {
      "filePath": "_authenticated.tsx",
      "children": [
        "/_authenticated/trip-form",
        "/_authenticated/trips/$tripId",
        "/_authenticated/trips/"
      ]
    },
    "/about": {
      "filePath": "about.tsx"
    },
    "/coming-soon": {
      "filePath": "coming-soon.tsx"
    },
    "/_authenticated/trip-form": {
      "filePath": "_authenticated/trip-form.tsx",
      "parent": "/_authenticated"
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
