export declare class ConfigService {
    static GLOBAL_PREFIX: string;
    private readonly config;
    private getConfig;
    private expand;
    get(name: string, defaultValue: string): string;
    get(name: string): string | undefined;
    set(name: string, value: string): void;
}
