import { Card } from "@/components/ui/card";
import { BellIcon, ShieldAlertIcon, ArrowDownIcon, ArrowUpIcon } from "lucide-react";

interface Notification {
  id: string;
  type: "transaction" | "balance" | "security";
  message: string;
  date: string;
  read: boolean;
}

const ICONS = {
  transaction: <ArrowDownIcon className="w-5 h-5 text-blue-500" />,
  balance: <ArrowUpIcon className="w-5 h-5 text-green-600" />,
  security: <ShieldAlertIcon className="w-5 h-5 text-yellow-600" />,
};

export default function NotificationsPanel({ notifications }: { notifications: Notification[] }) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">Notifications</h2>
      <div className="grid gap-3">
        {notifications.length === 0 && (
          <div className="text-gray-500 text-sm">No notifications.</div>
        )}
        {notifications.map((notif) => (
          <Card
            key={notif.id}
            className="flex items-center gap-3 px-4 py-3 bg-white shadow-sm"
          >
            <div>{ICONS[notif.type]}</div>
            <div className="flex-1">
              <div className="text-gray-900 text-sm font-medium">
                {notif.message}
              </div>
              <div className="text-xs text-gray-400">
                {new Date(notif.date).toLocaleString()}
              </div>
            </div>
            {!notif.read && <span className="w-2 h-2 bg-red-500 rounded-full"></span>}
          </Card>
        ))}
      </div>
    </div>
  );
}
