/**
 * Represents a value of type `T` that may be `null`.
 */
export type MaybeNull<T> = T | null;

/**
 * Represents a value of type `T` that may be a `Promise` or `T`.
 */
export type MaybePromise<T> = Promise<T> | T;