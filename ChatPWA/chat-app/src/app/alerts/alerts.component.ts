import { Component, OnInit, Input } from '@angular/core';
import { AlertsService, IAlert } from '../services/alerts.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styles: []
})
export class AlertsComponent implements OnInit {
  @Input() public errors: Array<IAlert> = this.alertService.getErrors();
  @Input() public connections: Array<IAlert> = this.alertService.getConnections();

  constructor(private alertService: AlertsService) { }

  ngOnInit() {
  }

  closeError(error: IAlert) {
    this.alertService.closeError(error);
  }

  closeConnections(conn: IAlert) {
    this.alertService.closeConnections(conn);
  }

}
