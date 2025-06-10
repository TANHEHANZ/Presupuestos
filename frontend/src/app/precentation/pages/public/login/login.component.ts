import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { Router } from '@angular/router';
gsap.registerPlugin(TextPlugin);
@Component({
  selector: 'app-login',
  template: `
    <div
      class="h-screen flex items-center justify-center gap-4 bg-gray-100 relative overflow-hidden "
    >
      <div
        #bloque
        class="bloque w-[40dvw] h-screen bg-primary  -skew-x-6    left-0   transition-all duration-1000 ease-in-out justify-center items-center "
      ></div>
      <form
        #loginForm
        (submit)="onLogin($event)"
        class="p-6 sm:p-8 rounded w-full max-w-xs sm:max-w-sm md:max-w-xl flex flex-col gap-4 z-10  relative"
      >
        <h1 class="text-primary text-5xl font-bold text-center mb-4">
          Iniciar sesión
        </h1>
        <div class="flex flex-col">
          <label for="usuario" class="ml-2">CI</label>
          <input
            type="text"
            placeholder="Ingrese su cédula de identidad"
            class="border border-primary rounded-xl px-3 py-4 focus:outline-none"
          />
        </div>
        <div class="flex flex-col">
          <label for="contraseña" class="ml-2">Contraseña</label>
          <input
            type="password"
            placeholder="Contraseña"
            class="border border-primary rounded-xl px-3 py-4 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          class="bg-primary text-white rounded-xl px-3 py-4 font-semibold"
        >
          Entrar
        </button>
      </form>
    </div>
  `,
})
export class LoginComponent implements OnInit {
  @ViewChild('bloque') bloque!: ElementRef;
  @ViewChild('loginForm') loginForm!: ElementRef;
  router = inject(Router);
  ngOnInit(): void {
    gsap.from('.bloque', {
      duration: 1,
      translateX: -1000,
      ease: 'ease-in-out',
    });
  }
  onLogin(event: Event) {
    event.preventDefault();

    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => {
          this.router.navigate(['/dashboard/presupuestos']);
        }, 500);
      },
    });

    tl.to(this.bloque.nativeElement, {
      skewX: 0,
      rotation: 90,
      height: '3000px',
      width: '100vw',
      duration: 1,
      ease: 'power2.inOut',
    })
      .to(
        this.loginForm.nativeElement,
        {
          opacity: 0,
          overflow: 'hidden',
          duration: 1,
          ease: 'power2.inOut',
        },
        '<'
      )
      .to(this.bloque.nativeElement, {
        y: -1400,
        duration: 1.5,
        delay: 0.8,
        ease: 'power2.inOut',
      });
  }
}
