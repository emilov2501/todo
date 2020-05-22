import LocalStorage from "@/utils/LocalStorage";

export class BackupController<T> {
  constructor(snapshot: T, key: string) {
    this.saveTo(snapshot, key);
  }

  public saveTo(value: T, key: string): void {
    const data = LocalStorage.getItem<T[]>(key, []);

    data.push(value);

    LocalStorage.setItem(key, data);
  }
}
