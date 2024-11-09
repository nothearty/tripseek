import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
// import { TanStackRouterDevtools } from "@tanstack/router-devtools"
import Navbar from "../components/Navbar";
import { QueryClient } from "@tanstack/react-query";
import { useLocation } from "@tanstack/react-router";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  const location = useLocation(); // Get the current location
  const hideNavbarOnPaths = '/trips'; // Define paths where Navbar should be hidden

  return (
    <>
      {!location.pathname.includes(hideNavbarOnPaths) && <Navbar />}
      {/* <TanStackRouterDevtools position='bottom-right' /> */}
      <Outlet />
    </>
  );
}