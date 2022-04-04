import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './navegation/menu/menu.component';
import { FooterComponent } from './navegation/footer/footer.component';
import { HomeComponent } from './navegation/home/home.component';
import { WasteMapComponent } from './waste-card/waste-map.component';
import { WasteService } from './waste-card/service/waste.service';
import { HttpClientModule } from '@angular/common/http';
import { GoogleMapsModule } from '@angular/google-maps';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    HomeComponent,
    WasteMapComponent,
    AboutComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GoogleMapsModule
  ],
  providers: [
    WasteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
