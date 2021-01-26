export default {
  get<T>(key: string): T {
    return JSON.parse(<string>localStorage.getItem(key)) || [];
  },
  set(key: string, value: any): void {
    return localStorage.setItem(key, JSON.stringify(value));
  }
};
