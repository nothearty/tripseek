import { useState, useEffect } from "react";
import { UseFormSetValue } from "react-hook-form";
import outdoor from "../icons/outdoor.png";
import city from "../icons/city.png";
import shopping from "../icons/shopping.png";
import museum from "../icons/museum.png";
import historical from "../icons/historical.png";
import entertainment from "../icons/entertainment.png";
import { Input } from "@/components/ui/input";

type Activity = {
  icon: string;
  description: string;
  name: string;
};

type ActivitiesProps = {
  setValue: UseFormSetValue<{ city: string; daysNumber: number; activities: string[]; other?: string }>;
  value: string[];
};

const activityList: Activity[] = [
  { icon: outdoor, description: "outdoor", name: "Outdoor" },
  { icon: city, description: "city", name: "City sightseeing" },
  { icon: shopping, description: "shopping", name: "Shopping" },
  { icon: museum, description: "museums", name: "Museums" },
  { icon: historical, description: "historical", name: "Historical" },
  { icon: entertainment, description: "entertainment", name: "Entertainment" },
];

const Activities: React.FC<ActivitiesProps> = ({ setValue, value }) => {
  const [selectedActivities, setSelectedActivities] = useState<string[]>(value);

  useEffect(() => {
    setValue("activities", selectedActivities);
  }, [setValue, selectedActivities]);

  const handleActivitySelect = (activity: Activity) => {
    setSelectedActivities((prevSelected) =>
      prevSelected.includes(activity.name)
        ? prevSelected.filter((name) => name !== activity.name)
        : [...prevSelected, activity.name]
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="w-full flex flex-wrap gap-2">
          {activityList.map((activity) => (
            <div key={activity.description} className="w-[48%] md:w-[32%]">
              <button
                type="button"
                className={`w-full h-full flex items-center text-start border border-zinc-300 rounded-lg p-2 cursor-pointer ${
                  selectedActivities.includes(activity.name)
                    ? "bg-lime-200 border-zinc-500"
                    : "hover:border-zinc-500"
                }`}
                onClick={() => handleActivitySelect(activity)}
              >
                <img
                  src={activity.icon}
                  alt={activity.description}
                  className="h-7 sm:h-8 mr-4"
                />
                <div className="text-xs sm:text-sm md:text-[13px] lg:text-base font-medium">
                  {activity.name}
                </div>
              </button>
            </div>
          ))}
          <div className="font-medium text-[16px] mt-1 space-y-3 w-full">
            Other <span className="text-gray-300">(optional)</span>
            <Input type="text" placeholder="Other" className="placeholder:font-normal font-normal" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activities;
