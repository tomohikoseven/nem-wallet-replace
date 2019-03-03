import { Component, OnInit, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Helpers } from '../../utils/helpers';
import { DOCUMENT } from '@angular/common';
import nem from 'nem-sdk';

// service
import { LocalStorageService } from '../../providers/local-storage.service';

// config
import { AppConstants } from '../../config/app.constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', '../../../css/nano.css']
})
export class HomeComponent implements OnInit {
  updateInfo = {};
  newUpdate: boolean = false;
  appName: string = '';
  showInfo: number;
  imageApostilleURL: string = '/assets/images/apostille.png';
  _AppConstants: any;

  constructor( 
    private http: Http,
    private _storage: LocalStorageService,
    @Inject(DOCUMENT) document
  ) { 
    
    //// Module dependencies region ////
    this._AppConstants = AppConstants;

    this.appName = this._AppConstants.appName;
    this.newUpdate = false;
    this.updateInfo = {};
    //this.showInfo = null;


    //// End dependencies region ////

    //// Module properties region ////

    //// End properties region ////

    this.checkBrowser();
    this.getGeolocation();
    this.checkLatestVersion();
  }

  ngOnInit() {
  }

  /**
   * Check if browser is supported or show an un-dismassable modal
   */
  checkBrowser() {
      // Detect recommended browsers
      let isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
      let isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
      let isFirefox = /Firefox/.test(navigator.userAgent);

      // If no recommended browser used, open modal
      if(!isChrome && !isSafari && !isFirefox) {
          let noSupportModal:any = <any>document.getElementById("noSupportModal");
          //$('#noSupportModal').modal({
          noSupportModal.showModal({
            backdrop: 'static',
            keyboard: false
          }); 
      }
  }

  /**
   * Get closest node from geolocation, if user agrees
   */
  getGeolocation() {
      // If no mainnet node in local storage
      if (navigator.geolocation && !this._storage.selectedMainnetNode) {
          // Get position
          navigator.geolocation.getCurrentPosition((res) => {
              // Get the closest nodes
              nem.com.requests.supernodes.nearest(res.coords).then((res) => {
                  // Pick a random node in the array
                  let node = res.data[Math.floor(Math.random()*res.data.length)];
                  // Set the node in local storage
                  this._storage.selectedMainnetNode = nem.model.objects.create("endpoint")("http://"+node.ip, 7890);
              }, (err) => {
                  // If error it will use default node
                  console.log(err);
              });
          }, (err) => {
              console.log(err);
              // Get all the active supernodes
              nem.com.requests.supernodes.get(1).then((res) => {
                  // Pick a random node in the array
                  let node = res.data[Math.floor(Math.random()*res.data.length)];
                  // Set the node in local storage
                  this._storage.selectedMainnetNode = nem.model.objects.create("endpoint")("http://"+node.ip, 7890);
              }, (err) => {
                  // If error it will use default node
                  console.log(err);
              });
          });
      }
  }

  /**
   * Check if a new version is available on Github
   */
  private checkLatestVersion() {
      this.http.get("https://api.github.com/repos/NemProject/NanoWallet/releases/latest").subscribe(
        response => {
          let currentVersion = AppConstants.version;
          let version = response.json().name;
          let isVersion2 = parseInt(version.split(".")[0]) > 1;
          if (isVersion2 && Helpers.versionCompare(currentVersion, version) < 0) {
              this.newUpdate = true;
              this.updateInfo = response.json();
          }
      });
  }
  
}
