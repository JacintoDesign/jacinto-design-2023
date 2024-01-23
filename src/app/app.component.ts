import { Component, ElementRef, Renderer2, OnInit, AfterViewInit } from '@angular/core';

declare var CSS: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  isMenuOpen!: boolean;
  message = 'Contact me at contact@jacinto.design - Looking forward to hearing from you!';
  repeatedMessageCount = 10;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.initializeBannerContent();
  }

  // Navigation ------------------------------------

  toggleMenu() {
    const nav = this.elRef.nativeElement.querySelector('#nav');
    const menuIcon = this.elRef.nativeElement.querySelector('.menu-icon');

    if (nav && menuIcon) {
      this.isMenuOpen = !this.isMenuOpen; // Toggle the menu state
      if (this.isMenuOpen) {
        this.renderer.addClass(nav, 'active');
        this.renderer.addClass(menuIcon, 'active');
      } else {
        this.renderer.removeClass(nav, 'active');
        this.renderer.removeClass(menuIcon, 'active');
      }
    }
  }

  hideMenu() {
    const nav = this.elRef.nativeElement.querySelector('#nav');
    const menuIcon = this.elRef.nativeElement.querySelector('.menu-icon');
    if (nav) this.renderer.removeClass(nav, 'active');
    if (menuIcon) this.renderer.removeClass(menuIcon, 'active');
    this.isMenuOpen = false;
  }
  

  // Slideshow ---------------------------------------

  currentImageIndex = 0;
  images!: NodeListOf<Element>;

  ngAfterViewInit() {
    this.images = this.elRef.nativeElement.querySelectorAll('.slide');
    setInterval(() => this.switchImage(), 5000);
  }

  switchImage() {
    this.renderer.removeClass(this.images[this.currentImageIndex], 'active');
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    this.renderer.addClass(this.images[this.currentImageIndex], 'active');
  }

  // Banner ------------------------------------------
  
  initializeBannerContent() {
    const bannerContent = this.elRef.nativeElement.querySelector('#bannerContent');

    if (bannerContent) {
      for (let i = 0; i < this.repeatedMessageCount; i++) {
        const spanElement = this.renderer.createElement('span');
        this.renderer.addClass(spanElement, 'contact-message');
        this.renderer.setStyle(spanElement, 'margin-right', '50px');
        const textNode = this.renderer.createText(this.message);
        this.renderer.appendChild(spanElement, textNode);
        this.renderer.appendChild(bannerContent, spanElement);
      }
    }
  }
}
