export function substring(text: string, length: number = 200) {
    return text.length > length ? `${text.substring(0, length)}…` : text;
}

export function isError(error: any): error is Error {
    return error.stack ?? typeof error === "string";
}

export function inRange(array: any[], length: number): boolean;
export function inRange(array: any[], min: number, max: number): boolean;
export function inRange(array: any[], min: number, max?: number): boolean {
    if (!Array.isArray(array)) false;
    
    const { length } = array;
    return max == null ? length === min : length >= min && length <= max;
}