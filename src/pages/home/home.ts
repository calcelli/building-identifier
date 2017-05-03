import { Component } from '@angular/core';
import {ModalController, NavController} from 'ionic-angular';

import { NewPlacePage } from "../new-place/new-place";
import { PlacesService } from "../../services/places.service";
import { PlacePage } from '../place/place';
import {Place} from "../../model/place.model";
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  places: {title: string}[] = [];
  public base64Image: string;
  public response: string;

  constructor(public navCtrl: NavController,
              private placesService: PlacesService,
              private modalCtrl: ModalController,
              private camera: Camera,
              public http: Http) {

  }

  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };



  ionViewWillEnter() {
    this.placesService.getPlaces()
      .then(
        (places) => this.places = places
      );
  }

  onLoadNewPlace() {
    this.navCtrl.push(NewPlacePage);
  }

  onOpenPlace(place: Place){
    this.modalCtrl.create(PlacePage, place).present();
  }

  onDeleteNewPlace(){
    this.placesService
  }

  takePicture() {
    this.camera.getPicture(this.options).then((imageData) => {
      // imageData is a base64 encoded string
      this.base64Image = "data:image/jpeg;base64," + imageData;
      this.getResponse();
    }, (err) => {
      console.log(err);
    });

    //this.getResponse()
  }
  // imageData is a base64 encoded string
  //this.base64Image =

  getResponse(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let data = JSON.stringify({'image': this.base64Image});

    this.http.post('http://54.243.1.4:8080/', data, {headers: headers})
      .subscribe(res => {
        console.log("success");
      }, (err) => {
        console.log("failed");
      });
  }
}
