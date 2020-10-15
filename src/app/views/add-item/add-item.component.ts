import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Item } from '../../models/item';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  constructor(private dataService: DataService, private modalService: NgbModal) { }

  nextAmount = 1;
  searchValue = '';
  itemToEdit: Item;
  @ViewChild('searchElement') searchElement: ElementRef;

  modifyNextAmount(x: number): void {
    this.nextAmount =  this.nextAmount + x;
    if (this.nextAmount < 1) {
      this.nextAmount = 1;
    }
  }

  filtered(): Item[] {
    return this.getItems().filter(value => value.name.toLocaleLowerCase().includes(this.cleanInput().toLocaleLowerCase()));
  }

  cleanInput(): string {
    return this.searchValue.replace(/\s+/g, ' ').trim();
  }

  addItem(): void {
    this.searchValue = this.cleanInput();
    const searchedElement = this.filtered().find((item: Item) => item.name === this.searchValue);
    if (searchedElement !== undefined) {
      this.dataService.addItemToShoppingList(searchedElement, this.nextAmount);
    } else {
      if (this.searchValue !== '') {
        this.dataService.addItem(this.searchValue, this.nextAmount);
      }
    }
    this.searchValue = '';
    this.nextAmount = 1;
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

  handleItemEditClick(content: any, item: Item): void {
    this.itemToEdit = JSON.parse(JSON.stringify(item));
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true });
  }

  saveEdit(modal: any): void {
    modal.close();
    this.dataService.updateItem(JSON.parse(JSON.stringify(this.itemToEdit)));
  }

  deleteItem(modal: any): void {
    modal.close();
    this.dataService.deleteItem(this.itemToEdit.id);
  }

  ngOnInit(): void {
  }

}
