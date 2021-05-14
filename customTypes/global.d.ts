declare namespace NodeJS {
    export interface Process {
        tools: {
            mode: string
        };
    }
}

interface ImportMeta {
    env: Record<string, unknown>;
    globEager<T = unknown>(globPath: string): Record<string, T>;
}