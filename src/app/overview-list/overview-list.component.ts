import { Component, OnInit } from '@angular/core';
import {Item} from '../models/item';
import { DataService } from '../data.service';
import { ListItem } from '../models/listItem';

@Component({
  selector: 'app-overview-list',
  templateUrl: './overview-list.component.html',
  styleUrls: ['./overview-list.component.css']
})
export class OverviewListComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

  getItem(itemId: string): Item {
    return this.dataService.getItem(itemId);
  }

  getList(): ListItem[] {
    return this.dataService.getList();
  }
}
