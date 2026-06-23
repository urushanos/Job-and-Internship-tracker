type DayData = {
  day: string;
  count: number;
};

type Props = {
  data: DayData[];
};

export default function WeeklyActivity({ data }: Props) {

  const getColor = (count: number) => {
    if (count === 0) return "bg-gray-200";
    if (count === 1) return "bg-green-200";
    if (count <= 3) return "bg-green-400";
    return "bg-green-600";
  };

  return (
    <div className="bg-white rounded p-4 mt-4">
      <h3 className="font-medium mb-3">
        Weekly Activity
      </h3>

      <div className="flex gap-2">
        {data.map((item) => (
          <div
            key={item.day}
            className={`w-6 h-6 rounded ${getColor(item.count)}`}
            title={`${item.day}: ${item.count}`}
          />
        ))}
      </div>

      <div className="flex gap-2 mt-2 text-xs">
        {data.map((item) => (
          <div key={item.day} className="w-6 text-center">
            {item.day}
          </div>
        ))}
      </div>
    </div>
  );
}