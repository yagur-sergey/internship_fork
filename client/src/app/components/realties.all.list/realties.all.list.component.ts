import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Realty } from 'src/app/model/Realty';
import { RealtyService } from 'src/app/serivce/realty.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Pageable } from 'src/app/model/Pageable';
import { ParamSet } from 'src/app/model/ParamSet';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-realties-all-list',
  templateUrl: './realties.all.list.component.html',
  styleUrls: ['./realties.all.list.component.css']
})
export class RealtiesAllListComponent implements OnInit {

  dataSource: MatTableDataSource<Realty>;
  realties: Realty[];
  pageable: Pageable;
  params: ParamSet;
  displayedColumns: string[] = ['id', 'price', 'square', 'type', 'overview'];
  isASC = true;

  pageEvent: any;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private router: Router,
    private service: RealtyService
    ) {
      this.params = new ParamSet();
      this.setDefaultParams();
  }

  ngOnInit() {
    this.service.getAllRealties(this.params).subscribe( data => {
      this.setData(data);
    });
  }

  goToRealtiesMy() {
    this.router.navigate(['/realties/my']);
  }

  goToRealtiesCreate() {
    this.router.navigate(['/realties/new']);
  }

  goToRealtyOverview(id: string) {
    this.router.navigate(['realties/' + id]);
    console.log('click')
  }

  getRealties(value: string) {
    this.isASC = !this.isASC;
    this.setQueryParams(null, value);
    this.service.getAllRealties(this.params).subscribe( data => {
      this.setData(data);
    });
  }

  handlePage(event) {
    this.setQueryParams(event,null);
    this.service.getAllRealties(this.params).subscribe( data => {
      this.setData(data);
    });
  }

  private setQueryParams(event, value: string) {
    if(event != null) {
      this.params.pageNum = event.pageIndex;
    }
    if(value != null) {
      this.params.value = value;
    }
    if(this.isASC) {
      this.params.with = "ASC";
    } else {
      this.params.with = "DESC";
    }

  }

  private setDefaultParams() {
      this.params.pageNum = "0";
      this.params.value = "id";
      this.params.with = "ASC";
  }

  private setData(data) {
    this.pageable = data;
    this.realties = data.content;
    this.dataSource = new MatTableDataSource(this.realties);
    this.paginator.length = this.pageable.totalElements;
  }

}
