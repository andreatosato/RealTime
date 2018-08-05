import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { UserStatsResponseModels, UserStatsRequestModels, StatType, UserSignalR } from '../models/userStats';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private http: HttpClient) { }

  getUsersStats(): Observable<UserStatsResponseModels<UserSignalR>> {
    const requestModel = new UserStatsRequestModels(StatType.User);
    return this.http.post<UserStatsResponseModels<UserSignalR>>(environment.baseUrl + environment.controllers.UserStats, requestModel);
  }

  getGroupsStats(): Observable<UserStatsResponseModels<string>> {
    const requestModel = new UserStatsRequestModels(StatType.Group);
    return this.http.post<UserStatsResponseModels<string>>(environment.baseUrl + environment.controllers.UserStats, requestModel);
  }

  getUserInGroupStats(groupName: string): Observable<UserStatsResponseModels<string>> {
    const userInGroupRequest = new UserStatsRequestModels(StatType.UserInGroup);
    userInGroupRequest.Group = groupName;
    return this.http.post<UserStatsResponseModels<string>>(environment.baseUrl + environment.controllers.UserStats, userInGroupRequest);
  }
}
