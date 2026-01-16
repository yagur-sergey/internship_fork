import { Component, OnInit } from '@angular/core';
import { Realty } from 'src/app/model/Realty';
import { Router } from '@angular/router';
import { RealtyService } from 'src/app/serivce/realty.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-realty-creating',
  templateUrl: './realty.creating.component.html',
  styleUrls: ['./realty.creating.component.css']
})
export class RealtyCreatingComponent implements OnInit {

  pipe = new DatePipe('en-US');

  realty: Realty;

  registerForm: FormGroup;

  city: string;
  house: string;
  street: string;

  dateOfBuilding: string;

  price: string;
  square: string;
  type: string;
  description: string;

  constructor(
    private router: Router,
    private service: RealtyService,
    private formBuilder: FormBuilder
    ) { }

   onFormSubmit(form: NgForm) {
     form['dateOfBuilding'] = this.pipe.transform(form['dateOfBuilding'], 'yyyy-MM-dd');
     console.log(form['dateOfBuilding']);
     this.service.save(form).subscribe( res => {
      this.goToRealtiesAll();
     });
   }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({

      'city': [null, Validators.required],
      'house': [null, Validators.required],
      'street': [null, Validators.required],
      
      'dateOfBuilding': [null, Validators.required],


      'price': [null, Validators.required],
      'square': [null, Validators.required],
      'type': [null, Validators.required],
      'description': [null, Validators.required]
      
    })
  }

  goToRealtiesMy() {
    this.router.navigate(['/realties/my']);
  }

  goToRealtiesAll() {
    this.router.navigate(['/realties'])
  }

}