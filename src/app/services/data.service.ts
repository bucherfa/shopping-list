import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

import { Storage } from '../models/storage';
import { Item } from '../models/item';
import { ListItem } from '../models/listItem';

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
    this.data = this.storage.get(STORAGE_KEY) || { version: '0.0.1', stores: {}, items: {}, list: {} };
    return this.data;
  }

  private setStorage(): void {
    this.storage.set(STORAGE_KEY, this.data);
  }

  public getItems(): Item[] {
    return Object.values(this.data.items);
  }

  public addItem(name: string, amount: number): void {
    const item = {
      id: this.uuidv4(),
      name,
      count: 0,
      disabled: false
    };
    this.data.items[item.id] = item;
    this.addItemToShoppingList(item, amount);
    this.setStorage();
  }

  public updateItem(item: Item): void {
    this.data.items[item.id] = item;
    this.setStorage();
  }

  public deleteItem(itemId: string): void {
    this.data.items[itemId].disabled = true;
    this.setStorage();
  }

  private uuidv4(): string {
    return (`${1e7}-${1e3}-${4e3}-${8e3}-${1e11}`).replace(/[018]/g, (c: any) =>
      // tslint:disable-next-line:no-bitwise
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }

  public addItemToShoppingList(item: Item, amount: number): void {
    if (this.data.list[item.id]) {
      this.data.list[item.id].amount += amount;
    } else {
      this.data.list[item.id] = { itemId: item.id, amount };
    }
  }

  getItem(itemId: string): Item {
    return this.data.items[itemId];
  }

  getList(): ListItem[] {
    return Object.values(this.data.list);
  }

  reset(): void {
    this.data = { version: '0.0.1', stores: {}, items: {}, list: {} };
    this.setStorage();
  }
}