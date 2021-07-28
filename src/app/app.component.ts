import { Component } from '@angular/core';

// for defining template
@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
})

// for performing operations on template
export class AppComponent {
  pageTitle = 'Angular: Getting Started';
}
