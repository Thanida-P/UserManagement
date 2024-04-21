import { Injectable } from '@angular/core';
import { AddUserRequest } from '../dashboard/models/addUser.model';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { getUsersRequest, getUsersResponse } from '../dashboard/models/getUsers.model';
import { EditUserRequest } from '../dashboard/models/editUser.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  addUser(model: AddUserRequest): Observable<void> {
    return this.http.post<void>('https://localhost:7247/api/Users', model);
  }

  getUsers(model: getUsersRequest): Observable<getUsersResponse> {
    return this.http.post<getUsersResponse>('https://localhost:7247/api/Users/DataTable', model)
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`https://localhost:7247/api/Users/${id}`);
  }

  editUser(model: EditUserRequest, id: string): Observable<void> {
    return this.http.put<void>(`https://localhost:7247/api/Users/${id}`, model);
  }
}
