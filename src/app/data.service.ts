import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

import { Storage } from './models/storage';
import { Item } from './models/item';

const STORAGE_KEY = 'shopping-list_data';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  data: Storage;

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {
    this.getStorage();
  }

  public getStorage(): Storage {
    this.data = this.storage.get(STORAGE_KEY) || { version: '0.0.1', stores: {}, items: {}, lists: {} };
    return this.data;
  }

  private setStorage(): void {
    this.storage.set(STORAGE_KEY, this.data);
  }

  public getItems(): Item[] {
    return Object.values(this.data.items);
  }

  public addItem(name: string): void {
    const item = {
      id: this.uuidv4(),
      name,
      count: 0
    };
    this.data.items[item.id] = item;
    this.setStorage();
  }

  public updateItem(item: Item): void {
    this.data.items[item.id] = item;
    this.setStorage();
  }

  public deleteItem(itemId: string): void {
    delete this.data.items[itemId];
    this.setStorage();
  }

  private uuidv4(): string {
    return (`${1e7}-${1e3}-${4e3}-${8e3}-${1e11}`).replace(/[018]/g, (c: any) =>
      // tslint:disable-next-line:no-bitwise
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }

}
