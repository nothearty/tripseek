import { Disclosure } from "@headlessui/react"
import { Link } from "@tanstack/react-router"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import tripseekLogo from "../assets/tripseekFont.svg"
import { useState, useEffect } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogIn, Plane } from "lucide-react"
import { User } from "@server/sharedTypes"

const navigation = [
  { name: "Generate a trip", href: "/trip-form", current: false },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

const FALLBACK_IMAGE =
  "https://www.wycliffe.ca/wp-content/uploads/2021/03/member-fallback-user-image.png"

const Navbar = () => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/auth/session")
        if (response.ok) {
          const data = await response.json()
          setUser(data.user)
        }
      } catch (error) {
        console.error("Error fetching user data:", error)
      }
    }

    fetchUser()
  }, [])

  const handleGoogleLogin = async () => {
    try {
      const response = await fetch("/api/auth/google")
      if (response.ok) {
        const data = await response.json()
        window.location.href = data.url
      }
    } catch (error) {
      console.error("Error initiating Google login:", error)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout")
      setUser(null)
    } catch (error) {
      console.error("Error logging out:", error)
    }
    window.location.reload()
  }

  const [isOpen, setIsOpen] = useState(false)
  const handleMenuButton = () => {
    setIsOpen(!isOpen)
  }

  return (
    <Disclosure as="nav" className="bg-white lg:w-[80%] mx-auto relative">
      <>
        <div className="mx-auto px-8 sm:px-6">
          <div className="flex items-center h-16">
            <div className="flex-1 flex items-center justify-start">
              <Link to="/" className="flex-shrink-0">
                <img
                  src={tripseekLogo}
                  alt="tripseek.ai"
                  className="h-8 w-auto"
                />
              </Link>
              <div className="flex-1 flex justify-center">
                <div className="hidden sm:flex sm:space-x-8 ml-4 justify-center">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={classNames(
                        item.current
                          ? "text-gray-900"
                          : "text-gray-700 hover:bg-gray-100 hover:text-gray-700",
                        "px-3 py-2 rounded-md text-[16px] font-medium"
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="hidden sm:flex sm:items-center">
              {user ? (
                <div className="hover:bg-zinc-100 rounded-full hover:text-white">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="flex items-center">
                        <img
                          className="inline-block h-9 w-9 rounded-full ring-2 ring-white"
                          src={user.picture || FALLBACK_IMAGE}
                          alt=""
                        />
                        <span className="ml-2 text-gray-900 font-semibold">
                          {user.name}
                        </span>
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Link to="/trips" className="flex-shrink-0">
                          My Trips
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleLogout}>
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <button
                  className="rounded-lg px-6 py-2 bg-zinc-900 text-white hover:opacity-90 transition-all duration-300 font-medium flex items-center"
                  onClick={handleGoogleLogin}
                >
                  <img
                    className="h-5 w-5 mr-2"
                    src="https://img.icons8.com/color/48/google-logo.png"
                    alt="Google"
                  />
                  Continue with Google
                </button>
              )}
            </div>

            {/* Mobile Interface */}
            {user ? (
              <div className="hover:bg-zinc-100 rounded-full hover:text-white sm:hidden">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center">
                      <img
                        className="inline-block h-9 w-9 rounded-full ring-2 ring-white"
                        src={user.picture || FALLBACK_IMAGE}
                        alt=""
                      />
                      <span className="ml-2 text-gray-900 font-semibold">
                        {user.name}
                      </span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link to="/trip-form" className="flex-shrink-0">
                        My Trips
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <DropdownMenu onOpenChange={handleMenuButton}>
                <DropdownMenuTrigger>
                  <div className="sm:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-white">
                    <span className="sr-only">Menu</span>
                    {isOpen ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="mr-2">
                  <DropdownMenuLabel>Menu</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Plane className="mr-2 h-4 w-4 mt-1 opacity-90" />
                    <Link to="/trip-form">Generate a trip</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <LogIn className="mr-2 h-4 w-4 mt-1 opacity-90" />
                    <button onClick={handleGoogleLogin}>Sign In</button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </>
    </Disclosure>
  )
}

export default Navbar
