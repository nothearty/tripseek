import TripForm from "@/components/TripForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/trip-form")({
  component: TripFormPage,
});

function TripFormPage() {
  return <TripForm />;
}
