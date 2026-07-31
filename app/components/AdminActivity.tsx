"use client";

type Activity = {
  title: string;
  time: string;
};

type Props = {
  activities: Activity[];
};

export default function AdminActivity({ activities }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">

      <h2 className="text-2xl font-bold mb-6">
        🕒 Recent Activity
      </h2>

      {activities.length === 0 ? (
        <p className="text-gray-500">
          No recent activity.
        </p>
      ) : (
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="border-l-4 border-pink-600 pl-4 py-2"
            >
              <p className="font-semibold">
                {activity.title}
              </p>

              <p className="text-sm text-gray-500">
                {activity.time}
              </p>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}