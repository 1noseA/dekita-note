export type DailyRecord = {
    date: string; // "YYYY-MM-DD"
    achievements: string[];
    medication: boolean;
    period: boolean;
    hospital: boolean;
    memo?: string;
};

export type AppSettings = {
    showMedication: boolean;
    showPeriod: boolean;
    showHospital: boolean;
};

export type AppData = {
    records: Record<string, DailyRecord>;
    settings: AppSettings;
};
