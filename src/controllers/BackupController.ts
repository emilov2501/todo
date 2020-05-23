import LocalStorage from "@/utils/LocalStorage";
import Vue from "vue";
export class BackupController<T> {
  constructor(snapshot: T, key: string) {
    this.saveTo(snapshot, key);
  }

  public saveTo(value: T, key: string): void {
    const data = LocalStorage.getItem(key, {});
    const dataValue = data[value["id"]];

    if (!dataValue) {
      Vue.set(data, value["id"], [value]);
    } else {
      dataValue.push(value);
    }

    LocalStorage.setItem(key, data);
  }
}
