import { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useAppStore } from "@/context/AppStoreContext";

export function RecordEditorPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { data, updateRecord } = useAppStore();

    const dateParam = searchParams.get("date");
    const todayStr = new Date().toISOString().split('T')[0];
    const targetDate = dateParam || todayStr;

    const record = data.records[targetDate] || {
        date: targetDate,
        achievements: [],
        medication: false,
        period: false,
        hospital: false,
        memo: ""
    };

    const [achievements, setAchievements] = useState<string[]>(record.achievements);
    const [inputText, setInputText] = useState("");
    const [medication, setMedication] = useState(record.medication);
    const [period, setPeriod] = useState(record.period);
    const [hospital, setHospital] = useState(record.hospital);

    useEffect(() => {
        // Sync local state if data changes externally or on mount logic adjustments
        // For MVP, initial state load is enough as data comes from provider
    }, [record]);

    const handleAddParams = () => {
        if (!inputText.trim()) return;
        const newItems = [...achievements, inputText.trim()];
        setAchievements(newItems);
        setInputText("");
        // Auto-save logic could go here or on "Save" button
    };

    const handleRemove = (index: number) => {
        setAchievements(prev => prev.filter((_, i) => i !== index));
    };

    const handleSave = () => {
        updateRecord(targetDate, {
            achievements,
            medication,
            period,
            hospital,
        });
        navigate("/");
    };

    const { settings } = data;

    return (
        <div className="flex flex-col h-screen bg-background">
            <header className="p-4 border-b flex items-center gap-4">
                <Link to="/" className="text-sm text-muted-foreground">Cancel</Link>
                <h2 className="text-lg font-bold flex-1 text-center">{targetDate}</h2>
                <button onClick={handleSave} className="text-sm font-bold text-primary">Done</button>
            </header>

            <main className="flex-1 p-4 overflow-y-auto space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Achievements</label>
                    <div className="flex gap-2">
                        <input
                            className="flex-1 border rounded px-3 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="What did you do?"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleAddParams()}
                        />
                        <button onClick={handleAddParams} className="px-4 py-2 bg-secondary rounded font-medium">+</button>
                    </div>
                    <ul className="space-y-2 mt-2">
                        {achievements.map((item, idx) => (
                            <li key={idx} className="flex items-center justify-between bg-card p-3 rounded border shadow-sm animate-in fade-in slide-in-from-bottom-2">
                                <span>{item}</span>
                                <button onClick={() => handleRemove(idx)} className="text-destructive text-sm px-2">×</button>
                            </li>
                        ))}
                        {achievements.length === 0 && (
                            <li className="text-muted-foreground text-sm text-center py-4">No records yet.</li>
                        )}
                    </ul>
                </div>

                <div className="space-y-3 pt-4 border-t">
                    <h3 className="text-sm font-medium text-muted-foreground">Health Checks</h3>

                    {settings.showMedication && (
                        <label className="flex items-center justify-between p-3 bg-muted/20 rounded cursor-pointer">
                            <span>Medication</span>
                            <input type="checkbox" checked={medication} onChange={e => setMedication(e.target.checked)} className="w-5 h-5 accent-emerald-500" />
                        </label>
                    )}

                    {settings.showPeriod && (
                        <label className="flex items-center justify-between p-3 bg-muted/20 rounded cursor-pointer">
                            <span>Period</span>
                            <input type="checkbox" checked={period} onChange={e => setPeriod(e.target.checked)} className="w-5 h-5 accent-red-400" />
                        </label>
                    )}

                    {settings.showHospital && (
                        <label className="flex items-center justify-between p-3 bg-muted/20 rounded cursor-pointer">
                            <span>Hospital Visit</span>
                            <input type="checkbox" checked={hospital} onChange={e => setHospital(e.target.checked)} className="w-5 h-5 accent-blue-500" />
                        </label>
                    )}
                </div>
            </main>
        </div>
    );
}
