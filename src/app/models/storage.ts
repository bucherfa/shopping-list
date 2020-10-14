import { Item } from './item';
import { ListItem } from './listItem';

export interface Storage {
  version: string;
  stores: { [id: string]: any };
  items: { [id: string]: Item };
  lists: { [id: string]: ListItem };
}
