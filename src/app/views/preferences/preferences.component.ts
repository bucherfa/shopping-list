import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

  resetApp(): void {
    this.dataService.reset();
  }
}
