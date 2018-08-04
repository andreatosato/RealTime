import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { UserStatsResponseModels, UserStatsRequestModels, StatType } from '../models/userStats';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private http: HttpClient) { }

  getUsersStats(): Observable<UserStatsResponseModels> {
    const requestModel = new UserStatsRequestModels(StatType.User);
    return this.http.post<UserStatsResponseModels>(environment.baseUrl + environment.controllers.UserStats, requestModel);
  }

  getGroupsStats(): Observable<UserStatsResponseModels> {
    const requestModel = new UserStatsRequestModels(StatType.Group);
    return this.http.post<UserStatsResponseModels>(environment.baseUrl + environment.controllers.UserStats, requestModel);
  }

  getUserInGroupStats(groupName: string): Observable<UserStatsResponseModels> {
    const userInGroupRequest = new UserStatsRequestModels(StatType.UserInGroup);
    userInGroupRequest.Group = groupName;
    return this.http.post<UserStatsResponseModels>(environment.baseUrl + environment.controllers.UserStats, userInGroupRequest);
  }
}
