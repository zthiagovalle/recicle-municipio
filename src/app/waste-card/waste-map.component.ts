import { Component, OnInit } from '@angular/core';
import { Waste } from './model/waste.model';
import { WasteService } from './service/waste.service';

@Component({
  selector: 'app-waste-map',
  templateUrl: './waste-map.component.html',
  styleUrls: ['./waste-map.component.css']
})
export class WasteMapComponent implements OnInit {

  public wastes: Array<Waste>;

  constructor(private WasteService: WasteService) { }

  ngOnInit(): void {
    this.WasteService.getWaste().subscribe(data => {
      this.wastes = data;
    },
      error => console.log(error));
  }
}
