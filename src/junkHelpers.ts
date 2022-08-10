export function resolveWithFakeDelay<T>(valueToResolve: T): Promise<T> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(valueToResolve);
        }, Math.random() * 200 + 100)
    }) ;
}