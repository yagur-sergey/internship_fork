import { Component, OnInit, ViewChild } from '@angular/core';
import { Realty } from 'src/app/model/Realty';
import { Router } from '@angular/router';
import { RealtyService } from 'src/app/serivce/realty.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { ParamSet } from 'src/app/model/ParamSet';
import { Pageable } from 'src/app/model/Pageable';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-realties-my-list',
  templateUrl: './realties.my.list.component.html',
  styleUrls: ['./realties.my.list.component.css']
})
export class RealtiesMyListComponent implements OnInit {

  dataSource: MatTableDataSource<Realty>;
  realties: Realty[];
  displayedColumns: string[] = ['id', 'price', 'square', 'type', 'overview'];
  isASC = true;
  pageable: Pageable;
  params: ParamSet;

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
    this.service.getMyRealties(this.params).subscribe( data => {
      this.setData(data);
    });
  }

  getRealties(value: string) {
    this.isASC = !this.isASC;
    this.setQueryParams(null, value);
    this.service.getMyRealties(this.params).subscribe( data => {
      this.setData(data);
    });
  }

  handlePage(event) {
    this.setQueryParams(event,null);
    this.service.getMyRealties(this.params).subscribe( data => {
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

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  goToRealtiesAll() {
    this.router.navigate(['/realties']);
  }

  goToRealtiesCreate() {
    this.router.navigate(['/realties/new']);
  }

  goToRealtyOverview(id: string) {
    localStorage.setItem('isOwner', 'true');
    this.router.navigate(['/realties/' + id ]);
    localStorage.setItem('isOwner', 'true');
  }

}
