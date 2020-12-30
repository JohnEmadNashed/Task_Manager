import { Injectable } from '@angular/core';
import { Task } from './models/task.model';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private WebReqService: WebRequestService) { }

  getLists(){
    return this.WebReqService.get('lists');
  }

  createList(title: string){
    //sending a web request to create a list
    return this.WebReqService.post('lists', {title});
  }

  getTasks(listId: string){
    return this.WebReqService.get(`lists/${listId}/tasks`);
  }

  createTask(title: string, listId: string){
    //sending a web request to create a task
    return this.WebReqService.post(`lists/${listId}/tasks`, {title});
  }
  complete(task: Task){
    return this.WebReqService.patch(`lists/${task._listId}/tasks/${task._id}`, {
      completed: !task.completed
    })
  }

}
