import {Component, Input, OnInit} from '@angular/core';
import {Bar} from '../bar';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css'],
})
export class BarComponent implements OnInit {

  @Input() bar: Bar;
  // bar: Bar = {
  //   index: 1,
  //   beats: [2, 0, 1, 0, 1, 0, 1]
  //   // {index: 1, state: 2}, {index: 2, state: 0}, {index: 3, state: 1}, ]
  //   //beats: []
  //   //beats: [1, 0, 1, 0, 1, 0, 1] // Note, Rest, Note, Rest, Note, Rest, Note]
  // };
  constructor() { }

  ngOnInit() {
  }

}
