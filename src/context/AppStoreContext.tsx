import React, { createContext, useContext, useEffect, useState } from "react";
import type { AppData, AppSettings, DailyRecord } from "@/types";
import { storage, DEFAULT_DATA } from "@/lib/storage";

type AppStoreContextType = {
    currentUser: string | null;
    data: AppData;
    login: (userId: string) => void;
    logout: () => void;
    updateRecord: (date: string, update: Partial<DailyRecord>) => void;
    updateSettings: (settings: Partial<AppSettings>) => void;
};

const AppStoreContext = createContext<AppStoreContextType | undefined>(undefined);

export function AppStoreProvider({ children }: { children: React.ReactNode }) {
    const [currentUser, setCurrentUser] = useState<string | null>(null);
    const [data, setData] = useState<AppData>(DEFAULT_DATA);

    // ユーザー変更時にロード
    useEffect(() => {
        if (currentUser) {
            const loaded = storage.load(currentUser);
            setData(loaded);
        } else {
            setData(DEFAULT_DATA);
        }
    }, [currentUser]);

    // データ変更時に保存
    useEffect(() => {
        if (currentUser) {
            storage.save(currentUser, data);
        }
    }, [data, currentUser]);

    const login = (userId: string) => setCurrentUser(userId);
    const logout = () => setCurrentUser(null);

    const updateRecord = (date: string, update: Partial<DailyRecord>) => {
        setData((prev) => {
            const currentRecord = prev.records[date] || {
                date,
                achievements: [],
                medication: false,
                period: false,
                hospital: false,
            };

            const newRecord = { ...currentRecord, ...update };

            return {
                ...prev,
                records: {
                    ...prev.records,
                    [date]: newRecord,
                },
            };
        });
    };

    const updateSettings = (settings: Partial<AppSettings>) => {
        setData((prev) => ({
            ...prev,
            settings: { ...prev.settings, ...settings },
        }));
    };

    return (
        <AppStoreContext.Provider value={{ currentUser, data, login, logout, updateRecord, updateSettings }}>
            {children}
        </AppStoreContext.Provider>
    );
}

export const useAppStore = () => {
    const context = useContext(AppStoreContext);
    if (!context) throw new Error("useAppStore must be used within AppStoreProvider");
    return context;
};
