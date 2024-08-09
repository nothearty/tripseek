import { useState, useEffect } from "react"
import { CheckIcon } from "lucide-react"
import {
  ComboBox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
} from "@/components/ui/Combobox"
import { CITIES } from "@/components/items"
import { UseFormSetValue, UseFormRegisterReturn } from "react-hook-form"

type CityComboboxProps = {
  setValue: UseFormSetValue<{ city: string; daysNumber: number; activities: string[]; other?: string }>;
  register: UseFormRegisterReturn;
  value: string | null;
};

export const CityCombobox: React.FC<CityComboboxProps> = ({ setValue, register, value }) => {
  const [localValue, setLocalValue] = useState<string | null>(value)

  useEffect(() => {
    setValue("city", localValue || "")
  }, [localValue, setValue])

  return (
    <>
      <ComboBox
        value={localValue}
        onValueChange={setLocalValue}
        filterItems={(inputValue, items) =>
          items.filter(({ value }) => {
            const city = CITIES.find((city) => city.id === value)
            return (
              !inputValue ||
              (city &&
                (city.city.toLowerCase().includes(inputValue.toLowerCase()) ||
                city.country.toLowerCase().includes(inputValue.toLowerCase())))
            )
          })
        }
      >
        <ComboboxInput placeholder='Select a City...' {...register} />
        <ComboboxContent>
          {CITIES.map(({ id, city, country }) => (
            <ComboboxItem
              key={id}
              value={id}
              label={city}
              className='ps-8'
            >
              <span className='text-sm text-foreground'>{city}</span>
              <span className='text-xs text-muted-foreground'>{country}</span>
              {localValue === id && (
                <span className='absolute start-2 top-0 flex h-full items-center justify-center'>
                  <CheckIcon className='size-4' />
                </span>
              )}
            </ComboboxItem>
          ))}
          <ComboboxEmpty>No results.</ComboboxEmpty>
        </ComboboxContent>
      </ComboBox>
    </>
  )
}
