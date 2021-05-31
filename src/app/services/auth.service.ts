import { Injectable, NgZone } from '@angular/core';
import { User } from './user';
import { Router } from '@angular/router';
import { Platform, ToastController } from '@ionic/angular';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { auth } from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: User;

  constructor(
    public ngFireAuth: FirebaseAuthentication,
    public afStore: AngularFirestore,
    public router: Router,
    public ngZone: NgZone,
    public platform: Platform,
    public googlePlus: GooglePlus,
    public firebaseLogin: AngularFireAuth,
    public toast: ToastController
	){    // try login from localstore?
      this.firebaseLogin.auth.onAuthStateChanged(user => {
        console.log(this.platform.platforms());
        if (user) {
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user'));
        } else {
          console.log('Purging user from local storage');
          localStorage.setItem('user', null);
          JSON.parse(localStorage.getItem('user'));
        }
      });

    // Check if user has already logged in

  }

  signIn(email, password) {
    return this.ngFireAuth.signInWithEmailAndPassword(email,password);
  }

  registerUser(email, password) {
    return this.ngFireAuth.createUserWithEmailAndPassword(email, password);
  }

  sendVerificationEmail() {
    return this.ngFireAuth.sendEmailVerification()
      .then(() => {
        this.router.navigate(['verify-email']);
      });
  }

  passwordRecover(passwordResetEmail) {
    return this.ngFireAuth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email has been sent, please check your inbox.');
    }).catch((error) => {
      window.alert(error);
    });
  }

  // Returns true when user is looged in
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  // Returns true when user's email is verified
  get isEmailVerified(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user.emailVerified !== false) ? true : false;
  }

  // Sign in with Gmail
  googleAuth() {
      return this.authLogin();
  }

  // Auth providers
  authLogin() {
    if(this.platform.is('cordova')) {
      return this.googlePlus.login({
        webClientID: '277060750108-ogquhi1bn51raslqtbpe1mrmqo00h5dv.apps.googleusercontent.com',
        offline: true,
      }).then( res => {
        //this.showToast('Google login sucess');
          this.ngFireAuth.signInWithGoogle(res.idToken, res.accessToken)
          .then(() => {
            //this.showToast('Sign in with google');

            this.ngFireAuth.onAuthStateChanged().subscribe(user => {
              if (user) {
                this.userData = user;
                localStorage.setItem('user', JSON.stringify(this.userData));
                JSON.parse(localStorage.getItem('user'));
                this.ngZone.run(() => {
                  //this.showToast('Home navigate');
                  this.router.navigate(['home']);
                });
                this.setUserData(user);
              } else {
                localStorage.setItem('user', null);
                JSON.parse(localStorage.getItem('user'));
              }
            });
          });
        }
      );
    } else {
      console.log('Login without cordova');
      return this.firebaseLogin.auth.signInWithPopup(new auth.GoogleAuthProvider())
      .then((result) => {
         this.ngZone.run(() => {
            this.router.navigate(['home']);
          });
        this.setUserData(result.user);
      }).catch((error) => {
        window.alert(error);
      });
    }

  }

  // Store user in localStorage
  setUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    };
    return userRef.set(userData, {
      merge: true
    });
  }

  // Sign-out
  signOut() {
    return this.ngFireAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }

}
