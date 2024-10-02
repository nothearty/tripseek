import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"

type City = {
  name: string
  countryName: string
  geonameId: number
}

type CityComboboxProps = {
  setSelectedCity: React.Dispatch<React.SetStateAction<string | null>>
  selectedCity: string | null
}

export const CityCombobox: React.FC<CityComboboxProps> = ({
  setSelectedCity,
  selectedCity,
}) => {
  const [inputValue, setInputValue] = useState<string>("")
  const [cities, setCities] = useState<City[]>([])
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false)
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null)
  const [noResultsMessage, setNoResultsMessage] = useState<string | null>(null)

  const comboboxRef = useRef<HTMLDivElement | null>(null)

  // Fetch cities from Geonames based on user input
  const fetchCities = async (query: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_CITIES_API_URL}?name_startsWith=${query}&featureClass=P&cities=cities5000&maxRows=10&username=${import.meta.env.VITE_CITIES_API_USERNAME}`
      )
      const data = await response.json()

      const seen = new Set()
      const fetchedCities = data.geonames
        .filter((city: City) => /^[A-Z]/.test(city.name))
        .filter((city: City) => {
          const uniqueKey = `${city.name}, ${city.countryName}`
          if (seen.has(uniqueKey)) {
            return false
          } else {
            seen.add(uniqueKey)
            return true
          }
        })
        .map((city: City) => ({
          name: city.name,
          countryName: city.countryName,
          geonameId: city.geonameId,
        }))

      setCities(fetchedCities)
      if (fetchedCities.length === 0) {
        setNoResultsMessage("No results found.")
      } else {
        setNoResultsMessage(null) // Clear no results message if cities are fetched
      }
    } catch (error) {
      console.error("Error fetching cities:", error)
    }
  }

  useEffect(() => {
    if (inputValue.length > 2) {
      fetchCities(inputValue)
      if (inputValue !== selectedCity) setSelectedCity(null)
      setIsDropdownVisible(true)
    } else {
      setCities([])
      setIsDropdownVisible(false)
      setNoResultsMessage(
        inputValue.length > 0 ? "Type 2 or more characters." : null
      )
      setSelectedCity(null)
    }
  }, [inputValue, setSelectedCity, selectedCity])

  const handleCitySelect = (city: City) => {
    setInputValue(`${city.name}, ${city.countryName}`)
    setSelectedCity(`${city.name}, ${city.countryName}`)
    setIsDropdownVisible(false)
    setCities([])
    setHighlightedIndex(null)
  }

  // Close dropdown on 'Esc' or clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        comboboxRef.current &&
        !comboboxRef.current.contains(event.target as Node)
      ) {
        if (!isDropdownVisible) setNoResultsMessage(null)
        setIsDropdownVisible(false) // Close dropdown if clicked outside
      }
    }

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (!isDropdownVisible) setNoResultsMessage(null)
        setIsDropdownVisible(false) // Close dropdown on 'Esc'
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleEscKey)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscKey)
    }
  }, [isDropdownVisible])

  // Show dropdown when input is clicked
  const handleInputClick = () => {
    if (inputValue.length > 2) {
      setIsDropdownVisible(true)
    } else {
      setNoResultsMessage("Type 2 or more characters.")
    }
  }

  // Handle keyboard navigation with correct event typing
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault() // Prevent redirection on Enter
      if (highlightedIndex !== null && cities[highlightedIndex]) {
        handleCitySelect(cities[highlightedIndex]) // Select highlighted city
      }
    } else if (event.key === "ArrowDown") {
      setHighlightedIndex((prevIndex) =>
        prevIndex === null || prevIndex === cities.length - 1
          ? 0
          : prevIndex + 1
      ) // Move down the list
    } else if (event.key === "ArrowUp") {
      setHighlightedIndex((prevIndex) =>
        prevIndex === null || prevIndex === 0
          ? cities.length - 1
          : prevIndex - 1
      ) // Move up the list
    }
  }

  return (
    <div ref={comboboxRef} className="relative w-full">
      <Input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onClick={handleInputClick}
        onKeyDown={handleKeyDown} // Corrected typing
        placeholder="Search for a city..."
      />
      {isDropdownVisible && cities.length > 0 && (
        <ul className="absolute left-0 right-0 z-10 mt-2 max-h-60 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-lg">
          {cities.map((city, index) => (
            <li
              key={city.geonameId}
              onClick={() => handleCitySelect(city)}
              className={`p-2 cursor-pointer hover:bg-blue-100 ${
                highlightedIndex === index ? "bg-blue-100" : ""
              }`}
            >
              <span className="font-semibold">{city.name}</span>,{" "}
              <span className="text-sm text-gray-600">{city.countryName}</span>
            </li>
          ))}
        </ul>
      )}
      {noResultsMessage && !selectedCity && (
        <div className="absolute left-0 right-0 mt-2 p-2 bg-white border border-gray-300 rounded-md">
          {noResultsMessage}
        </div>
      )}
    </div>
  )
}
