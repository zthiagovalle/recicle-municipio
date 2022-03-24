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
      this.orderWastebyName();
      this.wastes.forEach(waste => {
        this.orderAddressInWaste(waste);
      });
    },
      error => console.log(error));
  }

  orderWastebyName() {
    this.wastes.sort((a, b) => a.name.localeCompare(b.name));
  }

  orderAddressInWaste(waste: Waste) {
    waste.addres.sort((a, b) => a.street.localeCompare(b.street));
  }
}
