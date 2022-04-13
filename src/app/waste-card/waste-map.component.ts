import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Address } from './model/addres.model';
import { Waste } from './model/waste.model';
import { WasteService } from './service/waste.service';

@Component({
  selector: 'app-waste-map',
  templateUrl: './waste-map.component.html',
  styleUrls: ['./waste-map.component.css']
})
export class WasteMapComponent implements OnInit {

  public wastes: Array<Waste>;
  center: google.maps.LatLngLiteral = { lat: 24, lng: 12 };
  zoom = 4;
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  markerPositions: google.maps.LatLngLiteral[] = [];
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;
  currentAddress: string = "";
  responsiveOptions;

  constructor(private WasteService: WasteService) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

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
    waste.address.sort((a, b) => a.street.localeCompare(b.street));
  }

  openInfoWindow(marker: MapMarker) {
    this.infoWindow.open(marker);
  }

  addressClick(addres: Address) {
    this.markerPositions = [];
    this.markerPositions.push({ lat: Number(addres.lat), lng: Number(addres.lng) });
    this.center = { lat: Number(addres.lat), lng: Number(addres.lng) };
    this.zoom = 19;
    this.currentAddress = addres.street;
    console.log(this.zoom);
  }
}
