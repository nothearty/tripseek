import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/coming-soon")({
  component: () => (
    <div className='flex justify-center font-semibold text-xl'>
      Coming soon...
    </div>
  ),
});
