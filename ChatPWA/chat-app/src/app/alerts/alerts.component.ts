import { Component, OnInit, Input } from '@angular/core';
import { AlertsService, IAlert, Alert } from '../services/alerts.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {
  @Input() public alerts: Array<Alert> = this.alertService.getAlert();

  constructor(private alertService: AlertsService) { }

  ngOnInit() {
  }

  closeError(message: IAlert) {
    this.alertService.close(message);
  }
}
