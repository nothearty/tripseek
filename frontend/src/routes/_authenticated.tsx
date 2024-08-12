import { createFileRoute, Outlet } from "@tanstack/react-router";
import { userQueryOptions } from "@/lib/api";
import { NotLoggedIn } from "@/components/NotLoggedInPage";

const Component = () => {
  const { user } = Route.useRouteContext();
  if (!user) {
    return <NotLoggedIn />;
  }

  return <Outlet />;
};

// src/routes/_authenticated.tsx
export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context }) => {
    const queryClient = context.queryClient;

    try {
      const data = await queryClient.fetchQuery(userQueryOptions);
      console.log("data", data);
      return data;
    } catch (e) {
      console.log("error", e);
      return { user: null };
    }
  },
  component: Component,
});
