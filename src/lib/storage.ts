import type { AppData, AppSettings } from "@/types";

const STORAGE_KEY = "dekita-note-data";

export const DEFAULT_SETTINGS: AppSettings = {
    showMedication: true,
    showPeriod: false,
    showHospital: false,
};

export const DEFAULT_DATA: AppData = {
    records: {},
    settings: DEFAULT_SETTINGS,
};

export const storage = {
    load: (userId: string): AppData => {
        try {
            const key = `${STORAGE_KEY}-${userId}`;
            const raw = localStorage.getItem(key);
            if (!raw) return DEFAULT_DATA;
            return { ...DEFAULT_DATA, ...JSON.parse(raw) }; // 新しいフィールドが存在することを保証するためにマージ
        } catch (e) {
            console.error("Failed to load data", e);
            return DEFAULT_DATA;
        }
    },
    save: (userId: string, data: AppData) => {
        try {
            const key = `${STORAGE_KEY}-${userId}`;
            localStorage.setItem(key, JSON.stringify(data));
        } catch (e) {
            console.error("Failed to save data", e);
        }
    },
};
