import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from './infraestructure/config/environment';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `<router-outlet />`,
})
export class AppComponent implements OnInit {
  title = 'frontend';
  environment = environment;
  ngOnInit(): void {
    console.log('ENV TEST:', environment.API_BACK);
    console.log('PRODUCTIONS:', environment.production);
  }
}
