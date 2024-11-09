import { useState, useRef, useCallback } from "react"
import Map, { Marker, NavigationControl, MapRef } from "react-map-gl"
import maplibregl from "maplibre-gl" 
import "maplibre-gl/dist/maplibre-gl.css"
import { Location } from "../sharedTypes"
import { Cross2Icon } from "@radix-ui/react-icons"

interface MapComponentProps {
  locations: Location[]
}

const TripMap: React.FC<MapComponentProps> = ({ locations }) => {
  const [viewState, setViewState] = useState({
    longitude: -118.2437, // Initial longitude (LA)
    latitude: 34.0522,    // Initial latitude (LA)
    zoom: 9,             // Default zoom level
    bearing: 0,
    pitch: 0,
  })

  const [selectedPlace, setSelectedPlace] = useState<Location | null>(null) // State for selected place
  const mapRef = useRef<MapRef>(null) 

  const handleMarkerClick = useCallback((location: Location) => {
    setSelectedPlace(location)

    // Smooth transition to the selected place
    mapRef.current?.flyTo({
      center: [location.longitude, location.latitude],
      zoom: 17,           
      duration: 2500       
    })
  }, [])

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="relative flex-grow">
        <Map
          ref={mapRef}
          {...viewState}
          mapLib={maplibregl as any}
          onMove={(evt) => setViewState(evt.viewState)}
          maxZoom={19}
          style={{ width: "100%", height: "100%" }}
          mapStyle="https://api.maptiler.com/maps/streets-v2/style.json?key=MV1xQr0yei5ARMzQUP0P"
        >
          <NavigationControl position="top-right" />

          {locations.map((location, index) => {
            const isSelected =
              selectedPlace &&
              selectedPlace.longitude === location.longitude &&
              selectedPlace.latitude === location.latitude

            return (
              <Marker
                key={index}
                longitude={location.longitude}
                latitude={location.latitude}
                onClick={() => handleMarkerClick(location)} // Set selected place and zoom on click
              >
                <div
                  className={`${
                    isSelected ? "w-6 h-6 text-base" : "w-4 h-4"
                  } bg-black rounded-full cursor-pointer flex justify-center items-center font-semibold text-white`}
                >
                  {index + 1}
                </div>
              </Marker>
            )
          })}
        </Map>
      </div>

      {selectedPlace && (
        <div className="absolute bottom-4 left-16 p-4 bg-white shadow-xl rounded-lg z-10 max-w-lg flex">
          <button
            onClick={() => setSelectedPlace(null)}
            className="absolute -top-2 -right-2 p-1 bg-white hover:bg-gray-100 rounded-full"
          >
            <Cross2Icon className="w-5 h-5 text-gray-600" />
          </button>

          <div className="flex-1">
            <h3 className="text-xl font-semibold">{selectedPlace.name}</h3>
            <p className="text-gray-600">{selectedPlace.description}</p>
          </div>

          <img
            src={selectedPlace.image}
            alt={selectedPlace.name}
            className="w-24 h-24 object-cover ml-4 rounded-md"
          />
        </div>
      )}
    </div>
  )
}

export default TripMap
