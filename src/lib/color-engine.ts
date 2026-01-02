import type { DailyRecord } from "@/types";

export function getDailyColor(record?: DailyRecord): string {
    if (!record || record.achievements.length === 0) {
        return "bg-muted/30"; // Empty/None
    }
    const count = record.achievements.length;
    // Level 1: 1 item
    if (count === 1) return "bg-emerald-200";
    // Level 2: 2-3 items
    if (count <= 3) return "bg-emerald-400";
    // Level 3: 4+ items
    return "bg-emerald-600";
}

export function getTextColor(record?: DailyRecord): string {
    if (!record || record.achievements.length === 0) {
        return "text-muted-foreground";
    }
    const count = record.achievements.length;
    if (count <= 3) return "text-emerald-900";
    return "text-white";
}
