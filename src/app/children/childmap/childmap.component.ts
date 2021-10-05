import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-childmap',
  templateUrl: './childmap.component.html',
  styleUrls: ['./childmap.component.css']
})
export class ChildmapComponent implements OnInit {

  constructor() { }

  w: string = '400px';
  h: string = '400px';

  mapOptions: google.maps.MapOptions = {
    center: { lat: 38.9987208, lng: -77.2538699 },
    zoom: 14
  };

  ngOnInit(): void {
  }

}
