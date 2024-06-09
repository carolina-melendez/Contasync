import { Component, OnInit } from '@angular/core';
import { DateTimeService } from '../time/time.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  imports: [
    CommonModule 
  ]
})
export class FooterComponent implements OnInit {
  fechaHoraActual: string = '';

  constructor(private dateTimeService: DateTimeService) { }

  ngOnInit() {
    this.dateTimeService.currentDateTime$.subscribe((dateTime: string) => {
      this.fechaHoraActual = dateTime;
    });
  }
}
