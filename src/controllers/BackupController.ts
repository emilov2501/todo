import LocalStorage from "@/utils/LocalStorage";

export class BackupController<T> {
  private value: T;

  constructor(value: T, key: string) {
    this.value = value;

    this.saveTo(this.value, key);
  }

  public saveTo(value: T, key: string): void {
    const data = LocalStorage.getItem<T[]>(key, []);

    data.push(value);

    LocalStorage.setItem(key, data);
  }
}
