// Define mock data for progress leave list
export const PROGRESS_LEAVE_ITEMS = [
  {
    value: 16,
    title: (
      <div className="flex items-center justify-between mb-3">
        <span className="text-lg text-gray-steel">Annual Leave</span>
        <span className="text-lg text-gray-steel">10 of 60 day(s)</span>
      </div>
    ),
  },
  {
    value: 0,
    title: (
      <div className="flex items-center justify-between mb-3">
        <span className="text-lg text-gray-steel">Sick Leave</span>
        <span className="text-lg text-gray-steel">0 of 10 day(s)</span>
      </div>
    ),
  },
  {
    value: 60,
    title: (
      <div className="flex items-center justify-between mb-3">
        <span className="text-lg text-gray-steel">Compassionate Leave</span>
        <span className="text-lg text-gray-steel">8 of 15 day(s)</span>
      </div>
    ),
  },
];
