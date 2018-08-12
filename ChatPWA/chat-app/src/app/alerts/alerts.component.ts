import { Component, OnInit, Input } from '@angular/core';
import { AlertsService, IAlert, Alert } from '../services/alerts.service';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {
  @Input() public alerts: Array<Alert> = this.alertService.getAlert();
  constructor(private alertService: AlertsService) { }

  ngOnInit() {
    const sub = new Subject();
    setTimeout(() => {
      const alertsToDelete = this.alerts;
      // debounce last 5 second events
      sub.pipe(debounceTime(3000))
      .subscribe(() => {
        alertsToDelete.forEach(function(a) {
          this.alertService.close(a);
        });
      });
    }, 3000);
  }

  closeError(message: IAlert) {
    this.alertService.close(message);
  }
}
