import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BellIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Notification {
  id: string;
  type: string;
  message: string;
  date: string;
  read: boolean;
}

interface NotificationsProps {
  notifications: Notification[];
  onMarkRead: (id: string) => void;
}

export default function Notifications({ notifications, onMarkRead }: NotificationsProps) {
  return (
    <div className="flex flex-col gap-3">
      {notifications.length === 0 && (
        <div className="text-center text-gray-400 text-sm">No notifications.</div>
      )}
      {notifications.map((notif) => (
        <Card key={notif.id} className="w-full border-l-4" style={{ borderColor: notif.read ? '#e5e7eb' : '#2563eb' }}>
          <CardHeader className="flex flex-row items-center gap-2 pb-2">
            <BellIcon className={notif.read ? "w-5 h-5 text-gray-400" : "w-5 h-5 text-blue-500 animate-bounce"} />
            <CardTitle className="text-base font-medium">
              {notif.type.charAt(0).toUpperCase() + notif.type.slice(1)}
            </CardTitle>
            <span className="ml-auto text-xs text-gray-400">{new Date(notif.date).toLocaleString()}</span>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <span className={notif.read ? "text-gray-500" : "font-semibold text-gray-800"}>{notif.message}</span>
            {!notif.read && (
              <Button size="sm" variant="outline" onClick={() => onMarkRead(notif.id)}>
                Mark as read
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
