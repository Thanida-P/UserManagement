import { Component, Renderer2, OnInit} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{
  title = 'user_management';
  logo = "YOURLOGO";
  dashboard_icon = "dashboard";
  document_icon = "documents";

  constructor(private router: Router, private renderer: Renderer2) {}
  checkRouter() {
    var dashboardElement = document.getElementById('dashboard');
    var documentElement = document.getElementById('document');
    this.dashboard_icon = "dashboard";
    this.document_icon = "documents";
    this.renderer.setStyle(dashboardElement, 'border-right', 'none');
    this.renderer.setStyle(documentElement, 'border-right', 'none');
    this.renderer.setStyle(dashboardElement, 'color', '#8b8b8b');
    this.renderer.setStyle(documentElement, 'color', '#8b8b8b');
    if (this.router.url === '/menus/dashboard') {
      this.renderer.setStyle(dashboardElement, 'border-right', '4px solid #4A85F6');
      this.renderer.setStyle(dashboardElement, 'color', '#4A85F6');
      this.dashboard_icon = "dashboard2";
    }
    else if (this.router.url === '/menus/document') {
      this.renderer.setStyle(documentElement, 'border-right', '4px solid #4A85F6');
      this.renderer.setStyle(documentElement, 'color', '#4A85F6');
      this.document_icon = "documents2";
    }
  }

  ngOnInit() {
    this.checkRouter();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkRouter();
      }
    });
  }
}
