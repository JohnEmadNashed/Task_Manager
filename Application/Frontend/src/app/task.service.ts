import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private WebReqService: WebRequestService) { }

  createList(title: string){
    return this.WebReqService.post('lists', {title});
  }

  getLists(){
    return this.WebReqService.get('lists');
  }
  getTasks(listId: string){
    return this.WebReqService.get(`lists/${listId}/tasks`);
  }
}
