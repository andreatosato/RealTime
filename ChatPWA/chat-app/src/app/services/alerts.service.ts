import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  private errors: Array<IAlert> = [];
  private connections: Array<IAlert> = [];

  constructor() { }
  addError(error: IAlert) {
    this.errors.push(error);
  }
  addConnections(conn: IAlert) {
    this.connections.push(conn);
  }
  getErrors(): Array<IAlert> {
    return this.errors;
  }
  getConnections(): Array<IAlert> {
    return this.connections;
  }
  closeError(error: IAlert) {
    const index: number = this.errors.indexOf(error);
    this.errors.splice(index, 1);
  }
  closeConnections(conn: IAlert) {
    const index: number = this.connections.indexOf(conn);
    this.connections.splice(index, 1);
  }
}

export interface IAlert {
  type: string;
  message: string;
}
