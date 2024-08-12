import ReactDOM from "react-dom/client";
import React from "react";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import "./index.css";
import NotFoundPage from "./components/NotFoundPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Toaster } from "@/components/ui/sonner";

const queryClient = new QueryClient();

// Configurazione del router
const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  defaultNotFoundComponent: () => <NotFoundPage />,
  context: { queryClient },
});

// Creazione del client di React Query

// Registrazione del modulo di router
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Ottenimento dell'elemento root
const rootElement = document.getElementById("root")!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster />
      </QueryClientProvider>
      {/* <TanStackRouterDevtools /> */}
    </React.StrictMode>
  );
}
