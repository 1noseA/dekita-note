import { Link } from "react-router-dom";
import { useAppStore } from "@/context/AppStoreContext";

export function SettingsPage() {
    const { data, updateSettings, logout } = useAppStore();
    const { settings } = data;

    return (
        <div className="flex flex-col h-screen bg-background">
            <header className="p-4 border-b flex items-center gap-4">
                <Link to="/" className="text-sm text-muted-foreground">Back</Link>
                <h2 className="text-lg font-bold flex-1 text-center">Settings</h2>
                <div className="w-8" />
            </header>

            <main className="p-4 space-y-6">
                <div className="space-y-4">
                    <h3 className="text-sm font-medium text-muted-foreground">Visibility</h3>

                    <div className="space-y-2">
                        <Toggle
                            label="Show Medication"
                            checked={settings.showMedication}
                            onChange={v => updateSettings({ showMedication: v })}
                        />
                        <Toggle
                            label="Show Period"
                            checked={settings.showPeriod}
                            onChange={v => updateSettings({ showPeriod: v })}
                        />
                        <Toggle
                            label="Show Hospital Check"
                            checked={settings.showHospital}
                            onChange={v => updateSettings({ showHospital: v })}
                        />
                    </div>
                </div>

                <div className="pt-8 border-t">
                    <button
                        onClick={logout}
                        className="w-full py-3 text-destructive font-bold bg-destructive/10 rounded-md hover:bg-destructive/20 transition-colors"
                    >
                        Logout
                    </button>
                </div>
            </main>
        </div>
    );
}

function Toggle({ label, checked, onChange }: { label: string, checked: boolean, onChange: (v: boolean) => void }) {
    return (
        <label className="flex items-center justify-between p-3 bg-card border rounded-md cursor-pointer hover:bg-muted/50 transition-colors">
            <span>{label}</span>
            <div className={`w-10 h-6 rounded-full relative transition-colors ${checked ? 'bg-primary' : 'bg-input'}`}>
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${checked ? 'left-5' : 'left-1'}`} />
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={e => onChange(e.target.checked)}
                    className="hidden"
                />
            </div>
        </label>
    )
}
