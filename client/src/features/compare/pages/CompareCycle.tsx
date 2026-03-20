import { useState } from 'react';
import { useCompareVehiclesMutation } from '../compareApis';
import { useGetAllCyclesQuery, type ICycle } from '@/features/cycle/cycleApis';

const CompareCycle = () => {
  const { data: cycles } = useGetAllCyclesQuery({});
  const [compareVehicles, { data: comparisonData }] = useCompareVehiclesMutation();

  const [slot1, setSlot1] = useState<ICycle | null>(null);
  const [slot2, setSlot2] = useState<ICycle | null>(null);

  const handleSelect = (cycle: ICycle) => {
    if (slot1?._id === cycle._id) return setSlot1(null);
    if (slot2?._id === cycle._id) return setSlot2(null);
    if (!slot1) return setSlot1(cycle);
    if (!slot2) return setSlot2(cycle);
    setSlot2(cycle);
  };

  const getSlotClass = (cycle: ICycle) => {
    if (slot1?._id === cycle._id) return 'ring-2 ring-blue-500';
    if (slot2?._id === cycle._id) return 'ring-2 ring-green-500';
    return 'hover:shadow-md';
  };

  const handleCompare = async () => {
    if (!slot1 || !slot2) return;
    await compareVehicles({ id1: slot1._id, id2: slot2._id, type: 'cycle' });
  };

  const comparison = comparisonData?.data?.comparison;
  const vehicle1 = comparisonData?.data?.vehicle1;
  const vehicle2 = comparisonData?.data?.vehicle2;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-1">Compare Cycles</h2>
      <p className="text-sm text-gray-500 mb-4">
        Click a cycle to select it. First click = Cycle 1, second = Cycle 2.
      </p>

      <div className="grid grid-cols-4 gap-3">
        {cycles?.data?.map((cycle: ICycle) => (
          <div
            key={cycle._id}
            onClick={() => handleSelect(cycle)}
            className={`relative border rounded-xl p-3 cursor-pointer transition-all ${getSlotClass(cycle)}`}
          >
            {slot1?._id === cycle._id && (
              <span className="absolute top-2 left-2 text-[10px] font-semibold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                1
              </span>
            )}
            {slot2?._id === cycle._id && (
              <span className="absolute top-2 left-2 text-[10px] font-semibold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                2
              </span>
            )}
            <img
              src={cycle.imageUrl}
              alt={`${cycle.brand} ${cycle.model}`}
              className="h-20 w-full object-contain"
            />
            <p className="text-center text-xs font-medium mt-2">
              {cycle.brand} {cycle.model}
            </p>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-6 mt-6 p-4 bg-gray-50 rounded-xl">
        <div className="flex-1">
          {slot1 ? (
            <div className="flex items-center gap-3">
              <img src={slot1.imageUrl} alt={slot1.model} className="h-14 object-contain" />
              <div>
                <p className="text-xs text-blue-600 font-semibold">Cycle 1</p>
                <p className="text-sm font-medium">
                  {slot1.brand} {slot1.model}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-400 text-center">Select Cycle 1</p>
          )}
        </div>

        <div className="text-xl font-bold text-gray-400">VS</div>

        <div className="flex-1">
          {slot2 ? (
            <div className="flex items-center gap-3 justify-end">
              <div className="text-right">
                <p className="text-xs text-green-600 font-semibold">Cycle 2</p>
                <p className="text-sm font-medium">
                  {slot2.brand} {slot2.model}
                </p>
              </div>
              <img src={slot2.imageUrl} alt={slot2.model} className="h-14 object-contain" />
            </div>
          ) : (
            <p className="text-sm text-gray-400 text-center">Select Cycle 2</p>
          )}
        </div>
      </div>

      <div className="text-center mt-4">
        <button
          onClick={handleCompare}
          disabled={!slot1 || !slot2}
          className="bg-black text-white px-8 py-2.5 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          Compare Cycles
        </button>
      </div>

      {comparison && vehicle1 && vehicle2 && (
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-4">Results</h2>
          <table className="w-full border text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left">Specification</th>
                <th className="p-3 text-center">
                  {vehicle1.brand} {vehicle1.model}
                </th>
                <th className="p-3 text-center">
                  {vehicle2.brand} {vehicle2.model}
                </th>
              </tr>
            </thead>
            <tbody>
              {comparison.map(
                (item: {
                  field: string;
                  label: string;
                  winner: string;
                  vehicle1Value: unknown;
                  vehicle2Value: unknown;
                }) => (
                  <tr key={item.field} className="border-t">
                    <td className="p-3 text-gray-600">{item.label}</td>
                    <td
                      className={`p-3 text-center ${item.winner === 'vehicle1' ? 'bg-green-50 font-semibold text-green-800' : ''}`}
                    >
                      {String(item.vehicle1Value)}
                    </td>
                    <td
                      className={`p-3 text-center ${item.winner === 'vehicle2' ? 'bg-green-50 font-semibold text-green-800' : ''}`}
                    >
                      {String(item.vehicle2Value)}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CompareCycle;
