import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
// import { TanStackRouterDevtools } from "@tanstack/router-devtools"
import Navbar from "../components/Navbar";
import { QueryClient } from "@tanstack/react-query";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <Navbar />
      {/* <TanStackRouterDevtools position='bottom-right' /> */}
      <Outlet />
    </>
  );
}
