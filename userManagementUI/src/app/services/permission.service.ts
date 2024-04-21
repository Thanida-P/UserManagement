import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { getAllPermissionsResponse } from '../dashboard/models/getPermission.model';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private http: HttpClient) { }

  getAllPermissions(): Observable<getAllPermissionsResponse> {
    return this.http.get<getAllPermissionsResponse>('https://localhost:7247/api/Permissions');
  }
}