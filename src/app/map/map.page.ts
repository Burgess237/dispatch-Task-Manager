import { Component, OnInit, ViewChild } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { GeolocationService, LocationObject } from '../services/geolocation.service';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
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
  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;
  infoContent = '';

  center: google.maps.LatLngLiteral = {lat: -29.772107899999998, lng: 30.999091999999997};
  zoom = 12;
  myMarker;
  markers = [];
  liveposition: LocationObject;
  singleMarker: google.maps.Marker;
  options: google.maps.MapOptions = {
    zoomControl: false,
    scrollwheel: true,
    disableDoubleClickZoom: false,
    maxZoom: 15,
    minZoom: 1,
    gestureHandling: 'auto',
    streetViewControl: false,
    mapTypeControl: false  };

  constructor(
    private geolocation: Geolocation,
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
          options: {
            icon: {
              url: '../assets/location02.svg',
              scaledSize: {
                height: 50,
                width: 50
              }
            },
          }
        };
      });
    });
}

fetchUserLocations() {
  this.firebaseService.getUsers().subscribe((res: any) => {
    if(res){
      this.markers = res.map(e=> ( {
        position: {
          lat: parseFloat(e.payload.doc.data().lat),
          lng: parseFloat(e.payload.doc.data().lng),
        },
        title: e.payload.doc.data().displayName,
        options: {
          icon: {
            url: '../assets/location01.svg',
            scaledSize:
            {
              height: 35,
              width: 35
            }
          }
        }
      })
      );
    }
  });
}

mapClick(event) {
  console.log(event);
}

markerEvent(e, marker) {
  console.log(e, marker);
}

openInfo(marker, content) {
    this.infoContent = content;
    this.infoWindow.open(marker);
}


}
