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
    this.studentObj = new Student();
  }

  onEdit(item: Student) {
    this.studentObj = item;
    this.openModal();
  }

  updateStudent() {
    const currentRecord = this.studentList.find(n => n.id === this.studentObj.id);
    if (currentRecord != undefined) {
      currentRecord.name = this.studentObj.name;
      currentRecord.mobileNo = this.studentObj.mobileNo;
      currentRecord.email = this.studentObj.name;
      currentRecord.city = this.studentObj.city;
      currentRecord.state = this.studentObj.state;
      currentRecord.pincode = this.studentObj.pincode;
      currentRecord.address = this.studentObj.address;
    };
    localStorage.setItem('angular17crud', JSON.stringify(this.studentList));
    this.closeModal();

  }

  saveStudent() {
    const isLocalpresent = localStorage.getItem('angular17crud');
    if (isLocalpresent != null) {
      const oldArray = JSON.parse(isLocalpresent);
      this.studentObj.id = oldArray.length + 1;
      oldArray.push(this.studentObj);
      localStorage.setItem('angular17crud', JSON.stringify(oldArray));
      this.studentList = oldArray;
    } else {
      const newArr = [];
      newArr.push(this.studentObj);
      this.studentObj.id = 1;
      this.studentList = newArr;
      localStorage.setItem('angular17crud', JSON.stringify(newArr));
    }
    this.studentObj = new Student();
    this.closeModal();
  }

  onDelete(item: Student) {
    const isDelete = confirm('Are you sure you want to delete');
    if (isDelete) {
      const currentRecord = this.studentList.findIndex(n => n.id === this.studentObj.id);
      this.studentList.splice(currentRecord,1);
      localStorage.setItem('angular17crud', JSON.stringify(this.studentList));
    }
  }
}


export class Student {
  id: number;
  name: string;
  mobileNo: string;
  email: string;
  city: string;
  state: string;
  pincode: string;
  address: string;

  constructor() {
    this.id = 0;
    this.name = '';
    this.mobileNo = '';
    this.email = '';
    this.city = '';
    this.state = '';
    this.pincode = '';
    this.address = '';
  }
}
