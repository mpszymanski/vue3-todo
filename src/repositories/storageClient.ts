export default {
  getArray<T>(key: string): T {
    return JSON.parse(<string>localStorage.getItem(key)) || [];
  },
  storeArray(key: string, value: any): void {
    return localStorage.setItem(key, JSON.stringify(value));
  }
};
