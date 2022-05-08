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
  public loadingMap: boolean = true;
  public visibleWastes: boolean = false;
  center: google.maps.LatLngLiteral = { lat: -21.47612055363184, lng: -47.557284861719424 };
  zoom = 14;
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  markerPositions: google.maps.LatLngLiteral[] = [];
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;
  currentAddress: string = "";
  currentWasteName: string = "";
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
        this.loadingMap = false;
        this.visibleWastes = true;
      });
    },
      error => alert('Falha ao carregar os lixos, recarregue a pagina'));
  }

  orderWastebyName() {
    this.wastes.sort((a, b) => a.name.localeCompare(b.name));
  }

  orderAddressInWaste(waste: Waste) {
    waste.address.sort((a, b) => a.street.localeCompare(b.street));
  }

  openInfoWindow(marker: MapMarker, position: any) {
    let wasteClicked = this.wastes.find(waste => waste.name === this.currentWasteName);
    wasteClicked?.address.forEach(address => {
      if (Number(address.lat) === position.lat && Number(address.lng) === position.lng) {
        this.currentAddress = address.street;
      }
    });

    this.infoWindow.open(marker);
  }

  addressClick(lstAddress: Array<Address>, wasteName: string) {
    this.markerPositions = [];
    lstAddress.forEach(address => {
      this.markerPositions.push({ lat: Number(address.lat), lng: Number(address.lng) });
      this.center = { lat: Number(address.lat), lng: Number(address.lng) };
    })
    this.zoom = 14;
    this.currentWasteName = wasteName;
  }
}