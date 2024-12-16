'use client'

import { useState, useCallback } from "react"
import { LocationInput } from "./LocationInput";

const REPORT_TYPES = [
    "Theft",
    "Fire Outbreak",
    "Medical Emergency",
    "Natural Disaster",
    "Violence",
    "Other",
  ] as const;

  type ReportType = 'EMERGENCY' | 'NON_EMERGENCY';

  interface ReportFormProps{
    onComplete: (data: any) => void;
  }

  export function ReportForm({ onComplete }: ReportFormProps) {
    const [formData, setFormData] = useState({
      incidentType: "" as ReportType,
      specificType: "",
      location: "",
      description: "",
      title: "",
    });

    const [image, setImage] = useState<string | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
     const [coordinates, setCoordinates] = useState<{
    latitude: number | null;
    longitude: number | null;
    }>({

    latitude: null,
    longitude: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

      function handleImageUpload(event: ChangeEvent<HTMLInputElement>): void {
          throw new Error("Function not implemented.");
      }

  return (
    <form className="space-y-9">
        {/* {emergency type selection} */}
        <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() =>
            setFormData((prev) => ({ ...prev, incidentType: "EMERGENCY" }))
          }
          className={`p-6 rounded-2xl border-2 transition-all duration-200 ${
            formData.incidentType === "EMERGENCY"
              ? "bg-red-500/20 border-red-500 shadow-lg shadow-red-500/20"
              : "bg-zinc-900/50 border-zinc-800 hover:bg-red-500/10 hover:border-red-500/50"
          }`}
          >
            <div className="flex flex-col items-center space-y-2">
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span className="font-medium text-red-500">Emergency</span>
            <span className="text-xs text-zinc-400">
              Immediate Response Required
            </span>
          </div>
        </button>

        <button
          type="button"
          onClick={() =>
            setFormData((prev) => ({ ...prev, incidentType: "NON_EMERGENCY" }))
          }
          className={`p-6 rounded-2xl border-2 transition-all duration-200 ${
            formData.incidentType === "NON_EMERGENCY"
              ? "bg-orange-500/20 border-orange-500 shadow-lg shadow-orange-500/20"
              : "bg-zinc-900/50 border-zinc-800 hover:bg-orange-500/10 hover:border-orange-500/50"
          }`}
        >
          <div className="flex flex-col items-center space-y-2">
            <svg
              className="w-8 h-8 text-orange-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="font-medium text-orange-500">Non-Emergency</span>
            <span className="text-xs text-zinc-400">General Report</span>
          </div>
        </button>
          </div>

             {/* Image Upload */}
      <div className="relative group">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          id="image-upload"
        />
        <label
          htmlFor="image-upload"
          className="block w-full p-8 border-2 border-dashed border-zinc-700 rounded-2xl 
                   hover:border-sky-500/50 hover:bg-sky-500/5 transition-all duration-200
                   cursor-pointer text-center"
        >
          {image ? (
            <div className="space-y-4">
              <div className="w-full h-48 relative rounded-lg overflow-hidden">
                <img
                  src={image}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm text-zinc-400">Click to change image</p>
            </div>
          ) : (
            <div className="space-y-4">
              <svg
                className="mx-auto h-12 w-12 text-zinc-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-sm text-zinc-400">
                Drop an image here or click to upload
              </p>
            </div>
          )}
        </label>
        {isAnalyzing && (
          <div className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center">
            <div className="flex items-center space-x-3">
              <svg
                className="animate-spin h-5 w-5 text-sky-500"
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
              <span className="text-sky-500 font-medium">
                Analyzing image...
              </span>
            </div>
          </div>
        )}
      </div>

       {/* Specific Report Type */}
       <div>
        <label className="block text-sm font-medium text-zinc-400 mb-2">
          Incident Type
        </label>
        <select
          value={formData.specificType}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, specificType: e.target.value }))
          }
          className="w-full rounded-xl bg-zinc-900/50 border border-zinc-800 px-4 py-3.5
                   text-white transition-colors duration-200
                   focus:outline-none focus:ring-2 focus:ring-sky-500/40"
          required
        >
          <option value="">Select type</option>
          {REPORT_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

       {/* Location */}
       <LocationInput
        value={formData.location}
        onChange={(value) =>
          setFormData((prev) => ({ ...prev, location: value }))
        }
        onCoordinatesChange={(lat, lng) =>
          setCoordinates({
            latitude: lat,
            longitude: lng,
          })
        }
      />

      
    </form>
  )
}