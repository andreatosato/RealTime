import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { UserStatsResponseModels, UserStatsRequestModels, StatType, UserSignalR } from '../models/userStats';
import { OnlineDataStoreService } from './online-data-store.service';
import { GroupModel, UpdateGroupModel, JoinGroupModel } from '../models/groupData';
import { AlertsService, AlertType } from './alerts.service';
import { GroupDataStoreService } from './group-data-store.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private http: HttpClient, private onlineDataStore: OnlineDataStoreService,
    private alertService: AlertsService, private groupDataStore: GroupDataStoreService) { }

  getUsersStats() {
    const requestModel = new UserStatsRequestModels(StatType.User);
    this.http.post<UserStatsResponseModels<UserSignalR>>(environment.baseUrl + environment.controllers.UserStats, requestModel)
      .subscribe(x => {
        this.onlineDataStore.usersConnected = x.Count;
        this.onlineDataStore.usersConnectedList = x.Values;
      });
  }

  getGroupsStats() {
    const requestModel = new UserStatsRequestModels(StatType.Group);
    this.http.post<UserStatsResponseModels<string>>(environment.baseUrl + environment.controllers.UserStats, requestModel)
    .subscribe(x => {
      this.onlineDataStore.groups = x.Count;
      this.onlineDataStore.groupsList = x.Values;
    });
  }

  getUserInGroupStats(groupName: string): Observable<UserStatsResponseModels<string>> {
    const userInGroupRequest = new UserStatsRequestModels(StatType.UserInGroup);
    userInGroupRequest.Group = groupName;
    return this.http.post<UserStatsResponseModels<string>>(environment.baseUrl + environment.controllers.UserStats, userInGroupRequest);
  }

  addGroup(group: GroupModel) {
    return this.http.post(environment.baseUrl + environment.controllers.Groups, group)
    .subscribe(() => {
      this.onlineDataStore.groups++;
      this.onlineDataStore.groupsList.push(group.Group);
    },
    (err) => this.alertService.add({message: err, type: AlertType.danger}));
  }
  updateGroup(group: UpdateGroupModel) {
    return this.http.put(environment.baseUrl + environment.controllers.Groups, group)
    .subscribe(() => {
      let oldGroup = this.onlineDataStore.groupsList.find(x => x === group.OldGroup);
      if (oldGroup !== undefined) {
        oldGroup = group.Group;
      }
    },
    (err) => this.alertService.add({message: err, type: AlertType.danger}));
  }
  deleteGroup(group: string) {
    return this.http.delete(environment.baseUrl + environment.controllers.Groups + '/' + group)
    .subscribe(() => {
      const oldGroup = this.onlineDataStore.groupsList.find(x => x === group);
      if (oldGroup !== undefined) {
        const index = this.onlineDataStore.groupsList.indexOf(oldGroup);
        this.onlineDataStore.groupsList.splice(index, 1);
      }
    },
    (err) => this.alertService.add({message: err, type: AlertType.danger}));
  }
  addUserToGroup(group: JoinGroupModel) {

  }
  removeUserFromGroup(group: JoinGroupModel) {

  }
}
