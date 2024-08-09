import { useState, useEffect } from "react";
import { CheckIcon } from "lucide-react";
import {
  ComboBox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxInput
} from "@/components/ui/Combobox";
import { UseFormSetValue, UseFormRegisterReturn } from "react-hook-form";
import allCities from "all-the-cities"; // Importing all-the-cities

type CityComboboxProps = {
  setValue: UseFormSetValue<{ city: string; daysNumber: number; activities: string[]; other?: string }>;
  register: UseFormRegisterReturn;
  value: string | null;
};

export const CityCombobox: React.FC<CityComboboxProps> = ({ setValue, register, value }) => {
  const [localValue, setLocalValue] = useState<string | null>(value);
  const [filteredCities, setFilteredCities] = useState(() =>
    allCities.slice(0, 5) // Show first 5 cities initially
  );

  useEffect(() => {
    setValue("city", localValue || "");
  }, [localValue, setValue]);

  const filterCities = (inputValue: string) => {
    const filtered = allCities.filter(({ name, country }) => {
      return (
        !inputValue ||
        name.toLowerCase().includes(inputValue.toLowerCase()) ||
        country.toLowerCase().includes(inputValue.toLowerCase())
      );
    });
    setFilteredCities(filtered.slice(0, 10)); // Limit to 10 results for better performance
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    filterCities(inputValue);
  };

  return (
    <ComboBox
      value={localValue}
      onValueChange={(value) => {
        setLocalValue(value);
        filterCities(value || "");
      }}
    >
      <ComboboxInput
        placeholder="Select a City..."
        {...register}
        onChange={handleInputChange}
      />
      <ComboboxContent>
        {filteredCities.map(({ cityId, name, country }) => (
          <ComboboxItem
            key={cityId}
            value={cityId.toString()}
            label={name}
            className="ps-8"
          >
            <span className="text-sm text-foreground">{name}</span>
            <span className="text-xs text-muted-foreground">{country}</span>
            {localValue === cityId.toString() && (
              <span className="absolute start-2 top-0 flex h-full items-center justify-center">
                <CheckIcon className="size-4" />
              </span>
            )}
          </ComboboxItem>
        ))}
        <ComboboxEmpty>No results.</ComboboxEmpty>
      </ComboboxContent>
    </ComboBox>
  );
};
