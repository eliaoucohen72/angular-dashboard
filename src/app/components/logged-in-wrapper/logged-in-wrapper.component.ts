import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { MainLayoutComponent } from '../main-layout/main-layout.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-logged-in-wrapper',
  standalone: true,
  imports: [HeaderComponent, MainLayoutComponent, SidebarComponent],
  templateUrl: './logged-in-wrapper.component.html',
  styleUrl: './logged-in-wrapper.component.scss',
})
export class LoggedInWrapperComponent {}
