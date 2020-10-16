import { Item } from './item';
import { ListItem } from './listItem';
import { Store } from './store';

export interface Storage {
  version: string;
  stores: { [id: string]: Store };
  items: { [id: string]: Item };
  list: { [id: string]: ListItem };
}
