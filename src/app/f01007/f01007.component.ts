import { Component, OnInit } from '@angular/core';
import { NzResizeEvent } from 'ng-zorro-antd/resizable';

@Component({
  selector: 'app-f01007',
  templateUrl: './f01007.component.html',
  styleUrls: ['./f01007.component.css']
})
export class F01007Component implements OnInit {
  width = 400;
  height = 200;
  id = -1;
  disabled = false;

  onResize({ width, height }: NzResizeEvent): void {
    cancelAnimationFrame(this.id);
    this.id = requestAnimationFrame(() => {
      this.width = width!;
      this.height = height!;
    });
  }

  cols = [
    {
      title: 'Name',
      width: '180px'
    },
    {
      title: 'Age',
      width: '180px'
    },
    {
      title: 'Address',
      width: '200px'
    },
    {
      title: 'Actions'
    }
  ];

  listOfData = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    }
  ];
  onResize1({ width }: NzResizeEvent, col: string): void {
    console.log(width,col)
    this.cols = this.cols.map(e => (e.title === col ? { ...e, width: `${width}px` } : e));
  }
  constructor() { }

  ngOnInit(): void {
  }

}
