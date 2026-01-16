import { Component, OnInit, ElementRef, ViewChild, NgModule } from '@angular/core';
import { RealtyService } from 'src/app/serivce/realty.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Realty } from 'src/app/model/Realty';
import { AuthService } from '../../serivce/auth.service';


@Component({
  selector: 'app-realty-overview',
  templateUrl: './realty.overview.component.html',
  styleUrls: ['./realty.overview.component.css']
})
export class RealtyOverviewComponent implements OnInit {

  id: string;
  realty: Realty;
  isVisible: boolean = false;

  constructor(
    private service: RealtyService,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService
  ) {
    this.route.paramMap.subscribe( params => this.id = params.get('id'));
    this.checkIsOwner();
  }

  ngOnInit() {
    this.service.findById(this.id).subscribe( data => {
      this.realty = data;
    });
  }

  delete(id: string) {
    this.service.deleteById(id).subscribe( data => {
      console.log('success');
    });
    this.goToRealtyMy();
  }

  goToRealtyMy() {
    this.router.navigate(['/realties/my']);
    localStorage.removeItem('isOwner');
  }

  goToRealtyAll() {
    this.router.navigate(['/realties']);
    localStorage.removeItem('isOwner');
  }

  goToRealtyEdit() {
    this.router.navigate(['/realties/editing/' + this.id]);
    localStorage.removeItem('isOwner');
  }

  private checkIsOwner() {
    if (localStorage.getItem('isOwner') == 'true') {
      this.isVisible = true;
    }
  }
  
}
