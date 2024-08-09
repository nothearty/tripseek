import LandingPage from "../components/LandingPage"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
  component: IndexPage
})

function IndexPage() {
  return <LandingPage />
}
