import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FirebaseService } from '../services/firebase.service';
import { GeolocationService, LocationObject } from '../services/geolocation.service';
import { User } from '../services/user';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder} from '@ionic-native/native-geocoder/ngx';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps';


declare let google;


@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;


  center: google.maps.LatLngLiteral = {lat: -29.772107899999998, lng: 30.999091999999997};
  zoom = 7;
  myMarker;
  markers = [];
  liveposition: LocationObject;
  singleMarker: google.maps.Marker;

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
      this.geolocation.getCurrentPosition().then((res: Geoposition) => {
        console.log('Current: ', res);
        this.center = {lat: res.coords.latitude, lng: res.coords.longitude};
        this.myMarker = {
          position: {
            lat: res.coords.latitude,
            lng: res.coords.longitude,
          },
          label: {
            color: 'red',
            text: 'You Are here!',
          },
          title: 'You Are here!',
          info: 'You Are here!',
          options: {
            animation: google.maps.Animation.DROP,
          }
        };
      });
    });
}

fetchUserLocations() {
  this.firebaseService.getUsersForMap().subscribe((res: any) => {
    if(res){
      this.markers = res.map(e=> ( {
        position: {
          lat: e.payload.doc.data().lat,
          lng: e.payload.doc.data().lng,
        },
        label: {
          color: 'red',
          text: 'Marker label ' + (this.markers.length + 1),
        },
        title: 'Marker title ' + (this.markers.length + 1),
        info: 'Marker info ' + (this.markers.length + 1),
        options: {
          animation: google.maps.Animation.DROP,
        }
      })
      );
    }
  });
}






}
