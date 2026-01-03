import { useAppStore } from "@/context/AppStoreContext";

export function LandingPage() {
    const { login } = useAppStore();

    return (
        <div className="flex flex-col items-center justify-center h-full bg-background p-4 space-y-8">
            <div className="text-center space-y-2">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-primary">
                    できたノート
                </h1>
                <p className="text-xl text-muted-foreground">
                    日々の小さな「できた」を記録しよう。
                </p>
            </div>

            <div className="grid gap-4 w-full max-w-sm">
                <button
                    className="w-full bg-primary text-primary-foreground h-12 rounded-md font-medium"
                    onClick={() => login("user_1")}
                >
                    ユーザー1としてログイン
                </button>
                <button
                    className="w-full bg-secondary text-secondary-foreground h-12 rounded-md font-medium"
                    onClick={() => login("user_2")}
                >
                    ユーザー2としてログイン
                </button>
            </div>
        </div>
    );
}
