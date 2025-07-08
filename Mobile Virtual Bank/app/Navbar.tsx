import { BellIcon, LogOutIcon } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface NavbarProps {
  user: { name: string; email: string };
  notifications: { read: boolean }[];
  onNotificationsClick: () => void;
}

export default function Navbar({ user, notifications, onNotificationsClick }: NavbarProps) {
  const unreadCount = notifications.filter((n) => !n.read).length;
  return (
    <nav className="w-full bg-white border-b px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Avatar className="w-9 h-9 bg-gray-200 text-gray-600 flex items-center justify-center font-bold">
          {user.name[0]}
        </Avatar>
        <div>
          <div className="font-semibold text-gray-900 text-sm">{user.name}</div>
          <div className="text-xs text-gray-500">{user.email}</div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button
          className="relative p-2 rounded-full hover:bg-gray-100 focus:outline-none"
          aria-label="Notifications"
          onClick={onNotificationsClick}
        >
          <BellIcon className="w-5 h-5 text-gray-700" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          )}
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100 focus:outline-none" aria-label="Logout">
          <LogOutIcon className="w-5 h-5 text-gray-700" />
        </button>
      </div>
    </nav>
  );
}
