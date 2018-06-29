import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e) => {
     alert('beforeinstallprompt event');
    });

    window.addEventListener('appinstalled', (evt) => {
      alert('App Installed');
    });
  }
  title = 'app';
}
