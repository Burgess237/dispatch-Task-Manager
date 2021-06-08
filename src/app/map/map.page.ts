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
  options: google.maps.MapOptions = {
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: false,
    maxZoom: 15,
    minZoom: 8,
    gestureHandling: 'auto',
    streetViewControl: false
  };

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
            color: 'blue',
            text: 'You Are here!',
          },
          title: 'You Are here!',
          info: 'You Are here!',
          options: {
            animation: google.maps.Animation.DROP,
            icon: '<ion-icon name="car-outline"></ion-icon>'
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
          lat: parseFloat(e.payload.doc.data().lat),
          lng: parseFloat(e.payload.doc.data().lng),
        },
        label: {
          color: 'red',
          text: e.payload.doc.data().displayName,
        },

        options: {
          animation: google.maps.Animation.DROP
        }
      })
      );
    }
  });
}



markerEvent(e, marker) {
  console.log(e, marker);
}


}
