
import { BaseModel } from '@api/model/base.model';
import { Http, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import * as UrlTemplate from 'url-template';
import { Injectable } from '@angular/core';

@Injectable()
export class BaseService<T extends BaseModel> {

  protected modelClass: any;
  protected routing: any;


  constructor(protected http: Http) {

  }

  protected httpGetAll(routeTpl: string, params: any = {}, query: any = {}): Observable<T[]> {
    let route = this.buildRoute(routeTpl, params);
    return this.http.get(route, query).map(res => this.mapToCollection(res, this.modelClass));
  }

  protected httpGetOne(routeTpl: string, params: any = {}, query: any = {}): Observable<T> {
    let route = this.buildRoute(routeTpl, params);
    return this.http.get(route, query).map(res => this.mapToModel(res, this.modelClass));
  }

  protected httpPut(routeTpl: string, params: any = {}, model: T, query: any = {}): Observable<T> {
    let route = this.buildRoute(routeTpl, params);
    return this.http.put(route, model.toJson(), query).map(res => this.mapToModel(res, this.modelClass));
  }

  protected httpPost(routeTpl: string, params: any = {}, model: T, query: any = {}): Observable<T> {
    let route = this.buildRoute(routeTpl, params);
    return this.http.post(route, model.toJson(), query).map(res => this.mapToModel(res, this.modelClass));
  }


  protected buildRoute(route: string, params: any = {}): string {
    let tpl = UrlTemplate.parse('http://127.0.0.1:8000' + route);
    return tpl.expand(params);
  }

  protected mapToModel(res: Response, modelClass: new () => T) {
    return (new modelClass()).fromJson(res.json());
  }

  protected mapToCollection(res: Response, modelClass: new () => T) {
    return res.json().map(item => (new modelClass()).fromJson(item));
  }
}