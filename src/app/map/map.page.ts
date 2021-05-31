import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { FirebaseService } from '../services/firebase.service';
import { GeolocationService, LocationObject } from '../services/geolocation.service';
import { User } from '../services/user';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


declare let google;


@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {


  liveposition: LocationObject;

  height = 0;
  latitude;
  longitude;
  markers: Marker[];

  constructor(
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private platform: Platform,
    public geolocationService: GeolocationService,
    public firebaseService: FirebaseService,
    public httpClient: HttpClient) {
  }


   async ngOnInit() {
     this.platform.ready().then(() => {
      this.fetchUserLocations();
      this.height = this.platform.height() - 56;
      this.geolocation.getCurrentPosition().then((res: Geoposition) => {
        this.latitude = res.coords.latitude;
        this.longitude = res.coords.longitude;
      });
    });
}

fetchUserLocations() {
  this.firebaseService.getUsersForMap().subscribe((res: any) => {
    if(res){
      this.markers = res.map(e=> ({
        lng: e.payload.doc.data().lng,
        lat: e.payload.doc.data().lat
      })
      );
    }
  });
}




}

interface Marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}
