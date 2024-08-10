import { useState, useEffect } from "react";
import { CheckIcon } from "lucide-react";
import {
  ComboBox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxInput,
} from "@/components/ui/Combobox";
import { UseFormSetValue, UseFormRegisterReturn } from "react-hook-form";

type City = {
  id: string;
  city: string;
  countryName: string;
};

type CityComboboxProps = {
  setValue: UseFormSetValue<{
    city: string;
    daysNumber: number;
    activities: string[];
    other?: string;
  }>;
  register: UseFormRegisterReturn;
  value: string | null;
};

// Default cities to show when input is empty
const defaultCities: City[] = [
  { id: "1", city: "Paris", countryName: "France" },
  { id: "2", city: "Rome", countryName: "Italy" },
  { id: "3", city: "London", countryName: "United Kingdom" },
  { id: "4", city: "New York", countryName: "United States" },
  { id: "5", city: "Tokyo", countryName: "Japan" },
];

export const CityCombobox: React.FC<CityComboboxProps> = ({
  setValue,
  register,
  value,
}) => {
  const [localValue, setLocalValue] = useState<string | null>(value);
  const [filteredCities, setFilteredCities] = useState<City[]>(defaultCities);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setValue("city", localValue || "");
  }, [localValue, setValue]);

  const fetchCities = async (inputValue: string) => {
    console.log
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/api/cities?query=${inputValue}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: City[] = await response.json();
      setFilteredCities(data.length > 0 ? data : defaultCities);
    } catch (error) {
      console.error("Error fetching cities:", error);
      setFilteredCities(defaultCities);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    setLocalValue(inputValue);

    if (inputValue.length >= 2) {
      fetchCities(inputValue);
    } else {
      setFilteredCities(defaultCities);
    }
  };

  return (
    <ComboBox
      value={localValue}
      onValueChange={(value) => {
        setLocalValue(value);
        if (value && value.length >= 2) {
          fetchCities(value);
        } else {
          setFilteredCities(defaultCities);
        }
      }}
    >
      <ComboboxInput
        placeholder='Select a City...'
        {...register}
        onChange={handleInputChange}
      />
      <ComboboxContent>
        {loading ? (
          <div className='loading-spinner'>Loading...</div>
        ) : (
          filteredCities.map(({ id, city, countryName }) => (
            <ComboboxItem key={id} value={id} label={city} className='ps-8'>
              <span className='text-sm text-foreground'>{city}</span>
              <span className='text-xs text-muted-foreground'>
                {countryName}
              </span>
              {localValue === id && (
                <span className='absolute start-2 top-0 flex h-full items-center justify-center'>
                  <CheckIcon className='size-4' />
                </span>
              )}
            </ComboboxItem>
          ))
        )}
        {filteredCities.length === 0 && (
          <ComboboxEmpty>No results.</ComboboxEmpty>
        )}
      </ComboboxContent>
    </ComboBox>
  );
};
