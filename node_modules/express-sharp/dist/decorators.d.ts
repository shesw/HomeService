import 'reflect-metadata';
export declare function Transform<T, U = string>(transformer: (value: U) => T): (target: unknown, key: string) => void;
export declare function ToNumber(): (target: unknown, key: string) => void;
