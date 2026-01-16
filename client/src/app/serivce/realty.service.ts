import { Injectable } from '@angular/core';
import { Realty } from '../model/Realty';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Pageable } from '../model/Pageable';
import { ParamSet } from '../model/ParamSet';
import { AngularYandexMapsModule } from 'angular8-yandex-maps';
import { YandexGeoObjectComponent } from 'angular8-yandex-maps/lib/components/yandex-geoobject-component/yandex-geoobject.component';

const apiUrl = 'http://localhost:8090/api/v1/realties';
const yandexUrl = 'https://geocode-maps.yandex.ru/1.x/?apikey=94004118-bc46-4c2a-989d-5a622bc8bf64&format=json&geocode=';

@Injectable({
  providedIn: 'root'
})
export class RealtyService {

  constructor(private http: HttpClient) { }

  public edit(realty: any, id: string): Observable<any> {
    return this.http.patch<Realty>(apiUrl + '/' + id, realty);
  }

  public findById(id: string): Observable<Realty> {
    return this.http.get<Realty>(apiUrl + '/' + id);
  }

  public deleteById(id: string): Observable<Realty> {
    return this.http.delete<Realty>(apiUrl + '/' + id);
  }

  getAllRealties(params: ParamSet): Observable<Pageable> {
    return this.http.get<Pageable>(apiUrl, {params: this.getParams(params)});
  }

  public save(realty: any): Observable<any> {
    return this.http.post<Realty>(apiUrl, realty);
  }

  getMyRealties(params: ParamSet): Observable<Pageable> {
    return this.http.get<Pageable>(apiUrl + '/my', {params: this.getParams(params)});
  }

  private getParams(params: ParamSet) {
    return new HttpParams()
    .set("sortBy", params.value)
    .set("sortWith", params.with)
    .set("pageNum", params.pageNum);
  }

}
