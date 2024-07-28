export default function NotFoundPage() {
  return (
    <>
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="font-semibold text-5xl text-blue">404</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page not found</h1>
          <p className="mt-6 text-base leading-7 text-gray-600">Sorry, we couldn’t find the page you’re looking for.</p>
          <div className="mt-6 flex items-center justify-center gap-x-4">
            <a
              href="/"
              className="rounded-md bg-blue px-6 py-2 text-lg font-semibold text-sky-50 shadow-sm hover:bg-sky-400 focus-visible:outline hover:text-sky-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
            >
              Go back home
            </a>
          </div>
        </div>
      </main>
    </>
  )
}
