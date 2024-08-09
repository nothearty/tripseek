import { useState, useEffect } from 'react';
import { UseFormSetValue } from 'react-hook-form'

type TravelDaysProps = {
  setValue: UseFormSetValue<{ city: string; daysNumber: number; activities: string[]; other?: string }>;
  value: number;
};

const TravelDays: React.FC<TravelDaysProps> = ({ setValue, value }) => {
  const [days, setDays] = useState(value);

  useEffect(() => {
    setValue("daysNumber", days);
  }, [days, setValue]);

  const handleIncrement = () => {
    setDays(days + 1);
  };

  const handleDecrement = () => {
    if (days > 1) {
      setDays(days - 1);
    }
  };

  return (
    <div className="relative flex max-h-[53px]">
      <div className="flex w-full items-center justify-between gap-2 rounded-lg border border-solid border-gray-300 px-4 py-2.5 text-base outline-none">
        <div className="flex items-center gap-2">
          <span className="min-w-[40px] rounded-md border border-solid border-zinc-200 bg-lime-100 p-1 px-3 text-center text-sm">{days}</span>
          <span>{days === 1 ? 'Day' : 'Days'}</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleDecrement}
            className="flex min-w-[42px] items-center justify-center rounded-md border border-solid border-gray-300 p-1 px-3 py-1.5 text-gray-500 transition-colors hover:border-gray-400 md:hover:bg-gray-100 md:hover:text-gray-700 disabled:opacity-50"
            disabled={days <= 1}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 12h14"
              />
            </svg>
          </button>
          <button
            onClick={handleIncrement}
            className="flex min-w-[42px] items-center justify-center rounded-md border border-solid border-gray-300 p-1 px-3 py-1.5 text-gray-500 transition-colors hover:border-gray-400 md:hover:bg-gray-100 md:hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v12m6-6H6"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TravelDays;
