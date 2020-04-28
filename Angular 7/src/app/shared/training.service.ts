import { Injectable } from '@angular/core';
import {Training } from './training.model';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  formData  : Training;
  list : Training[];
  readonly rootURL ="http://localhost:7741/api"

  constructor(private http : HttpClient) { }

  postTraining(formData : Training){
   return this.http.post(this.rootURL+'/trainings',formData);
    
  }

  refreshList(){
    this.http.get(this.rootURL+'/trainings')
    .toPromise().then(res => this.list = res as Training[]);
  }

  putTraining(formData : Training){
    return this.http.put(this.rootURL+'/trainings/'+formData.tID,formData);
     
   }

   deleteTraining(id : number){
    return this.http.delete(this.rootURL+'/trainings/'+id);
   }
}
