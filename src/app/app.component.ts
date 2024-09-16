import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular_17_crud_with_localstorage';

  @ViewChild('myModal') modal: ElementRef | undefined;

  openModal() {
    const modal = document.getElementById('myModal');
    if( modal!= null ) {
      modal.style.display = 'block';
    }
  }

  closeModal() {
    if (this.modal && this.modal.nativeElement) {
      this.modal.nativeElement.style.display = 'none';
    }
  }
}
