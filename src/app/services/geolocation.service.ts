import { Injectable } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  currentPosition: LocationObject = {
    lat: 0,
    lng: 0
  };
  otherUsersArray: LocationObject[];


  constructor(
    private auth: AuthService,
    private firestore: FirebaseService,
    private geolocation: Geolocation
  ) {
    this.watchPosition();
   }

  watchPosition() {
    this.geolocation.watchPosition().subscribe((data: Geoposition) => {
      if(data) {
        console.log(data);
      this.currentPosition.lat = data.coords.latitude;
      this.currentPosition.lng = data.coords.longitude;
      const user = JSON.parse(localStorage.getItem('user'));
      user.lat = this.currentPosition.lat;
      user.lng = this.currentPosition.lng;
      localStorage.setItem('user', JSON.stringify(user));
      this.firestore.setUserLocation(user).then(() => console.log('user update with latlng'));
      }
    });
  }

  getLivePosition(): Observable<LocationObject> {
    return new Observable(o => {
      o.next(this.currentPosition);
    });
  }

}

export class LocationObject {
  lat: number;
  lng: number;
}
