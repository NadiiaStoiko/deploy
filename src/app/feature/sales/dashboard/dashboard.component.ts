import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent  implements OnInit {

    @Output() photoSelected = new EventEmitter<string>();
    @Input() photoData: string = '';
  constructor() { }

  ngOnInit() {}

    onPhotoSelected(photoData: string) {
        this.photoSelected.emit(photoData);
    }
    onPhotoSelectedFromFooter(photoData: string) {
        this.photoData = photoData;
    }
}
