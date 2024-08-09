import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/trips/$tripId")({
  component: () => <div className='mt-20'>Hello /trips/$tripId!</div>,
});

