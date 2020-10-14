import {Component, ElementRef, OnInit, QueryList, ViewChild} from '@angular/core';

import { Item } from '../models/item';
import {DataService} from '../data.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  constructor(private dataService: DataService) { }

  items: Item[];
  nextAmount = 1;

  searchValue = '';

  @ViewChild('searchElement') searchElement: ElementRef;

  modifyNextAmount(x: number): void {
    this.nextAmount =  this.nextAmount + x;
    if (this.nextAmount < 1) {
      this.nextAmount = 1;
    }
  }

  filtered(): Item[] {
    return this.getItems().filter(value => value.name.includes(this.searchValue));
  }

  addItem(): void {
    this.searchValue = this.searchValue.trim();
    if (this.searchValue !== '') {
      this.dataService.addItem(this.searchValue);
    }
    this.searchValue = '';
  }

  clearSearch(): void {
    this.searchValue = '';
    console.log(this.searchElement);
    this.searchElement.nativeElement.focus();
  }

  getItems(): Item[] {
    return this.dataService.getItems();
  }

  handleItemClick(item: Item): void {
    this.searchValue = item.name;
  }

  ngOnInit(): void {
  }

}
