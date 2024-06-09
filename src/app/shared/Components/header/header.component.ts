import { CommonModule } from '@angular/common';
import { Component, Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2 } from '@angular/core';
import { TimeComponent } from '../time/time.component';
import { AuthService } from '../../../auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, TimeComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userName: string = '';

  isCatalogOpen = false;
  isUsersOpen = false;
  isUnidadOpen = false;

  toggleDropdown(dropdown: string) {
    if (dropdown === 'catalog') {
      this.isCatalogOpen = !this.isCatalogOpen;
      this.isUsersOpen = false; // Cerrar el otro dropdown si está abierto
      this.isUnidadOpen = false; // Cerrar el otro dropdown si está abierto
    } else if (dropdown === 'users') {
      this.isUsersOpen = !this.isUsersOpen;
      this.isCatalogOpen = false; // Cerrar el otro dropdown si está abierto
      this.isUnidadOpen = false; // Cerrar el otro dropdown si está abierto
    } else if (dropdown === 'unidad') {
      this.isUnidadOpen = !this.isUnidadOpen;
      this.isCatalogOpen = false; // Cerrar el otro dropdown si está abierto
      this.isUsersOpen = false; // Cerrar el otro dropdown si está abierto
    }
    
  }

  @HostBinding('class.scroll-on') scrollClass = false;
  private scrollPosition = 0; // Initialize scroll position
  headerElement: any;

  constructor(private elementRef: ElementRef, private renderer: Renderer2, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.headerElement = this.elementRef.nativeElement.querySelector('.start-style');

    this.authService.getProfile().subscribe(
      (response) => {
        this.userName = response.name;
      },
      (error) => {
        console.error('Error al obtener el perfil del usuario', error);
      }
    );
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.userName = '';
      this.router.navigate(['/login']);
    });
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
