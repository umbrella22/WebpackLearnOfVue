declare namespace NodeJS {
    export interface Process {
        tools: {
            mode: string
        };
    }
}

interface ImportMeta {
    env: Record<string, unknown>;
    glob<T = unknown>(globPath: string): Record<string, T>;
}