import { useAppStore } from "@/context/AppStoreContext";

export function LandingPage() {
    const { login } = useAppStore();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4 space-y-8">
            <div className="text-center space-y-2">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-primary">
                    Dekita Note
                </h1>
                <p className="text-xl text-muted-foreground">
                    Record your small achievements daily.
                </p>
            </div>

            <div className="grid gap-4 w-full max-w-sm">
                <button
                    className="w-full bg-primary text-primary-foreground h-12 rounded-md font-medium"
                    onClick={() => login("user_1")}
                >
                    Login as User 1
                </button>
                <button
                    className="w-full bg-secondary text-secondary-foreground h-12 rounded-md font-medium"
                    onClick={() => login("user_2")}
                >
                    Login as User 2
                </button>
            </div>
        </div>
    );
}
