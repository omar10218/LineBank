import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-f01008scn1',
  templateUrl: './f01008scn1.component.html',
  styleUrls: ['./f01008scn1.component.css','../../../assets/css/f01.css']
})
export class F01008scn1Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    let element: HTMLElement = document.getElementById('firstBtn') as HTMLElement;
    element.click();
  }

}
