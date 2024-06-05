import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-time',
  standalone: true,
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css']
})
export class TimeComponent implements OnInit, OnDestroy {
  currentTime: string = '';  // Inicialización directa
  private timerId: any;

  constructor() { }

  ngOnInit(): void {
    this.updateTime();
    this.timerId = setInterval(() => this.updateTime(), 1000);
  }

  ngOnDestroy(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }

  updateTime(): void {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString();
  }
}
