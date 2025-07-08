import { BellIcon, UserIcon, LogOutIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavbarProps {
  user: { name: string; email: string };
  notifications: { read: boolean }[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Navbar({ user, notifications, activeTab, onTabChange }: NavbarProps) {
  const unreadCount = notifications.filter((n) => !n.read).length;
  return (
    <nav className="w-full bg-white shadow-sm flex items-center justify-between px-4 py-2 sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <div className="rounded-full bg-blue-100 w-10 h-10 flex items-center justify-center text-blue-600 text-lg font-bold">
          <UserIcon className="w-6 h-6" />
        </div>
        <div className="flex flex-col ml-2">
          <span className="font-semibold text-sm">{user.name}</span>
          <span className="text-xs text-gray-500">{user.email}</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Button
          variant={activeTab === "notifications" ? "default" : "ghost"}
          size="icon"
          className="relative"
          aria-label="Notifications"
          onClick={() => onTabChange("notifications")}
        >
          <BellIcon className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-[10px] px-1 min-w-[16px] h-[16px] flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
        <Button variant="ghost" size="icon" aria-label="Logout">
          <LogOutIcon className="w-5 h-5" />
        </Button>
      </div>
    </nav>
  );
}
