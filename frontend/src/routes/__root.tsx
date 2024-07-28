import { Outlet, createRootRoute } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/router-devtools"
import Navbar from "../components/Navbar"

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <Navbar />
      <TanStackRouterDevtools position='bottom-right' />
      <Outlet />
    </>
  )
}
