import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-not-found',
  standalone: true,
  template: `
    <div
      class="bg-primary text-white w-screen h-screen flex flex-col justify-center items-center gap-4 text-center px-4"
    >
      <h1 class="text-6xl font-bold">404</h1>
      <p class="text-xl">La página que estás buscando no existe.</p>
      <button
        (click)="goBack()"
        class="mt-4 px-6 py-3 bg-white text-primary rounded-lg font-semibold hover:bg-gray-200 transition"
      >
        Volver atrás
      </button>
    </div>
  `,
})
export class NotFoundComponent {
  constructor(private location: Location) {}

  goBack() {
    this.location.back();
  }
}
