export default {
  getItem<T>(key: string, defaultValue: T): T {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const value = JSON.parse(localStorage.getItem(key)!);

    if (!value) {
      return defaultValue;
    }

    return value;
  },

  setItem<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  removeItem(key: string) {
    localStorage.removeItem(key);
  }
};
