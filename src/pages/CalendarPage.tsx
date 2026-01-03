import { useAppStore } from "@/context/AppStoreContext";
import { getDailyColor } from "@/lib/color-engine";
import { Link } from "react-router-dom";

export function CalendarPage() {
    const { data } = useAppStore();

    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth(); // 0-indexed

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return (
        <div className="flex flex-col h-full bg-background">
            <header className="p-4 border-b flex items-center justify-between">
                <h2 className="text-xl font-bold">{currentYear} / {currentMonth + 1}</h2>
                <Link to="/settings" className="p-2 text-muted-foreground hover:text-foreground">
                    ⚙️
                </Link>
            </header>

            <main className="flex-1 p-4 overflow-y-auto">
                <div className="grid grid-cols-7 gap-2">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                        <div key={day} className="text-center text-xs text-muted-foreground font-medium py-2">
                            {day}
                        </div>
                    ))}

                    {/* Simple offset for start of month (assuming linear for MVP or correct it) */}
                    {/* MVP: Just list days. Full calendar logic needs day of week offset. */}
                    {Array.from({ length: new Date(currentYear, currentMonth, 1).getDay() }).map((_, i) => (
                        <div key={`empty-${i}`} />
                    ))}

                    {days.map(day => {
                        const dateKey = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                        const record = data.records[dateKey];
                        const colorClass = getDailyColor(record);

                        return (
                            <Link
                                key={day}
                                to={`/edit?date=${dateKey}`}
                                className={`aspect-square rounded-md flex items-center justify-center text-sm font-medium transition-colors ${colorClass} ${record ? 'text-white' : 'text-muted-foreground'}`}
                            >
                                {day}
                            </Link>
                        );
                    })}
                </div>
            </main>

            <div className="p-4 border-t">
                <Link
                    to={`/edit?date=${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`}
                    className="block w-full bg-primary text-primary-foreground text-center py-3 rounded-md font-bold shadow-md hover:bg-primary/90 transition-colors"
                >
                    Record Today
                </Link>
            </div>
        </div>
    );
}
