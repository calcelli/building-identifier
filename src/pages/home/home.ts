import { Component } from '@angular/core';
import {ModalController, NavController} from 'ionic-angular';

import { NewPlacePage } from "../new-place/new-place";
import { PlacesService } from "../../services/places.service";
import { PlacePage } from '../place/place';
import {Place} from "../../model/place.model";
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  places: {title: string}[] = [];
  public base64Image: string;


  constructor(public navCtrl: NavController,
              private placesService: PlacesService,
              private modalCtrl: ModalController,
              private camera: Camera) {

  }

  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }



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
    }, (err) => {
      console.log(err);
    });
  }
}
