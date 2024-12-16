import React, { useState } from "react";
import axios from "axios";

interface LocationInputProps {
  value: string;
  onChange: (value: string) => void;
  onCoordinatesChange?: (lat: number | null, lng: number | null) => void;
}

export function LocationInput({
  value,
  onChange,
  onCoordinatesChange,
}: LocationInputProps) {
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const getLocation = () => {
    setIsGettingLocation(true);
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      setIsGettingLocation(false);
      return;
    }

    // Get location quickly (without forcing high accuracy)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        // Pass raw latitude and longitude immediately
        onCoordinatesChange?.(latitude, longitude);
        onChange(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`); // Set raw data first

        // Reverse geocode asynchronously without blocking the main UI
        fetchAddressAsync(latitude, longitude);
      },
      (error) => {
        setLocationError(
          "Unable to get location. Please allow location access or try again."
        );
        setIsGettingLocation(false);
      },
      { enableHighAccuracy: false, timeout: 5000 } // Low accuracy, faster
    );
  };

  const fetchAddressAsync = async (latitude: number, longitude: number) => {
    try {
      const response = await axios.get(
        "https://nominatim.openstreetmap.org/reverse",
        {
          params: {
            lat: latitude,
            lon: longitude,
            format: "json",
          },
        }
      );

      const address = response.data.display_name;
      if (address) {
        // Update input field with the human-readable address
        onChange(address);
      } else {
        // In case address is not available, still update with the coordinates
        onChange(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
      }
    } catch (error) {
      console.warn("Reverse geocoding failed, showing raw coordinates instead.");
      // Update with raw coordinates in case of an error
      onChange(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
    } finally {
      setIsGettingLocation(false);
    }
  };

  const handleAddressChange = async (input: string) => {
    onChange(input);

    if (input.length > 2) {
      try {
        const response = await axios.get("https://nominatim.openstreetmap.org/search", {
          params: {
            q: input,
            format: "json",
            addressdetails: 1,
            limit: 5,
          },
        });

        if (response.data && response.data.length > 0) {
          const suggestionsList = response.data.map((item: any) => item.display_name);
          setSuggestions(suggestionsList); // Update suggestions
        } else {
          setSuggestions([]); // No suggestions found
        }
      } catch (error) {
        console.error("Error fetching location data:", error);
        setSuggestions([]); // Clear suggestions on error
      }
    } else {
      setSuggestions([]); // Clear suggestions if input is too short
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-zinc-400">Location</label>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => handleAddressChange(e.target.value)}
          placeholder="Enter location or use pin"
          className="w-full rounded-xl bg-zinc-900/50 border border-zinc-800 pl-4 pr-12 py-3.5
            text-white transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-sky-500/40"
        />
        {suggestions.length > 0 && (
          <ul className="absolute z-10 bg-zinc-800 border border-zinc-700 w-full rounded-lg mt-1 text-white">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => {
                  onChange(suggestion);
                  setSuggestions([]); // Clear suggestions after selection
                }}
                className="p-2 hover:bg-zinc-700 cursor-pointer"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
        <button
          type="button"
          onClick={getLocation}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5
            rounded-lg bg-sky-500/10 text-sky-400 
            hover:bg-sky-500/20 transition-colors duration-200
            disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isGettingLocation}
          title="Get current location"
        >
          {isGettingLocation ? (
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          )}
        </button>
      </div>
      {locationError && (
        <p className="text-sm text-red-400">{locationError}</p>
      )}
    </div>
  );
}
