import { CommonModule } from '@angular/common';
import { Component, Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isCatalogOpen = false;
  isUsersOpen = false;

  toggleDropdown(dropdown: string) {
    if (dropdown === 'catalog') {
      this.isCatalogOpen = !this.isCatalogOpen;
      this.isUsersOpen = false; // Cerrar el otro dropdown si está abierto
    } else if (dropdown === 'users') {
      this.isUsersOpen = !this.isUsersOpen;
      this.isCatalogOpen = false; // Cerrar el otro dropdown si está abierto
    }
  }

  @HostBinding('class.scroll-on') scrollClass = false;
  private scrollPosition = 0; // Initialize scroll position
  headerElement: any;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.headerElement = this.elementRef.nativeElement.querySelector('.start-style');
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    this.scrollPosition = window.scrollY || 0; // Access scrollTop
    this.scrollClass = this.scrollPosition >= 10;
  }
}

@Directive({
  selector: '.nav-item'
})
export class NavItemDirective implements OnInit {
  @Input() hoverClass = 'show'; // Allow customization of hover class

  constructor(private elementRef: ElementRef) { }
   // State variable to track dropdown visibility


  ngOnInit(): void {
    this.elementRef.nativeElement.addEventListener('mouseenter', this.handleHover);
    this.elementRef.nativeElement.addEventListener('mouseleave', this.handleHover);
  }

  handleHover(event: any): void {
    if (event.target) {
      event.target.classList.toggle(this.hoverClass, event.type === 'mouseenter');
    }
  }
}
