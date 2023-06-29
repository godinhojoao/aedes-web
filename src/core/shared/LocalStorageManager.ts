
export class LocalStorageManager {
  static setItem<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static getItem<T>(key: string, isToParse?: boolean): T | null {
    const value = localStorage.getItem(key);
    return value && isToParse ? JSON.parse(value) : value;
  }

  static removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
