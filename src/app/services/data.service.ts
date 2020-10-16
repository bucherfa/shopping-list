import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

import { Storage } from '../models/storage';
import { Item } from '../models/item';
import { ListItem } from '../models/listItem';
import {Store} from '../models/store';

const STORAGE_KEY = 'shopping-list_data';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  data: Storage;

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {
    this.getStorage();
  }

  static defaultData(): Storage {
    return JSON.parse(JSON.stringify({ version: '0.0.1', stores: {
        'bdc88b7f-da10-4295-b56b-2a109b265352': {
          id: 'bdc88b7f-da10-4295-b56b-2a109b265352',
          name: 'Store 1'
        },
        'bdc88b7f-da10-4295-b56b-2a109b265353': {
          id: 'bdc88b7f-da10-4295-b56b-2a109b265353',
          name: 'Store 2'
        }
      }, items: {}, list: {} }));
  }

  public getStorage(): Storage {
    this.data = this.storage.get(STORAGE_KEY) || DataService.defaultData();
    return this.data;
  }

  private setStorage(): void {
    this.storage.set(STORAGE_KEY, this.data);
  }

  public getItems(): Item[] {
    return Object.values(this.data.items).filter((item: Item) => !item.disabled);
  }

  public addItem(name: string, amount: number): void {
    const item = {
      id: this.uuidv4(),
      name,
      count: 0,
      disabled: false,
      stores: []
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

  getStores(): Store[] {
    return Object.values(this.data.stores);
  }

  reset(): void {
    this.data = DataService.defaultData();
    this.setStorage();
  }

  getStore(storeId: string): Store {
    return this.getStores()[storeId];
  }

  getStoreKeys(): string[] {
    return Object.keys(this.getStores());
  }
}
