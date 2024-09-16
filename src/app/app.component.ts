import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular_17_crud_with_localstorage';

  @ViewChild('myModal') modal: ElementRef | undefined;
  studentObj: Student = new Student();
  studentList: Student[] = [];

  ngOnInit(): void {
    const localData = localStorage.getItem('angular17crud');
    if (localData != null) {
      this.studentList = JSON.parse(localData);
    }
  }

  openModal() {
    const modal = document.getElementById('myModal');
    if (modal != null) {
      modal.style.display = 'block';
    }
  }

  closeModal() {
    if (this.modal && this.modal.nativeElement) {
      this.modal.nativeElement.style.display = 'none';
    }
  }

  saveStudent() {
    const isLocalpresent = localStorage.getItem('angular17crud');
    if (isLocalpresent != null) {
      const oldArray = JSON.parse(isLocalpresent);
      oldArray.push(this.studentObj);
      localStorage.setItem('angular17crud', JSON.stringify(oldArray));
      this.studentList = oldArray;
    } else {
      const newArr = [];
      newArr.push(this.studentObj);
      localStorage.setItem('angular17crud', JSON.stringify(newArr));
      this.studentList = newArr;
    }
    this.studentObj = new Student();
    this.closeModal();
  }
}


export class Student {
  name: string;
  mobileNo: string;
  email: string;
  city: string;
  state: string;
  pincode: string;
  address: string;

  constructor() {
    this.name = '';
    this.mobileNo = '';
    this.email = '';
    this.city = '';
    this.state = '';
    this.pincode = '';
    this.address = '';
  }
}
