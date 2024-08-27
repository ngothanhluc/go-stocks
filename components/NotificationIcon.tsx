import { Bell } from 'lucide-react'
interface NotificationIconProps {
    notificationCount: number
    className?: string
}
export default function NotificationIcon({
    notificationCount,
    className,
}: NotificationIconProps) {
    return (
        <div className={`relative inline-block ${className}`}>
            <Bell className="h-6 w-6" />
            {notificationCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                    {notificationCount > 99 ? '99+' : notificationCount}
                </span>
            )}
        </div>
    )
}
