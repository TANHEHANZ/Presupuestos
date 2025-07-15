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
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginService } from '../../../../infraestructure/services/apis/login.service';
import { CustomInputComponent } from '../../../shared/input/input.component';
import { ToastService } from '../../../../infraestructure/lib/toast/toast.service';
import { ToastComponent } from '../../../../infraestructure/lib/toast/toast.component';
gsap.registerPlugin(TextPlugin);
@Component({
  selector: 'app-login',
  template: `
    <app-toast />
    <div
      class="h-screen flex items-center justify-end gap-4 bg-gray-100 relative overflow-hidden "
    >
      <div
        #bloque
        class="bloque w-[30dvw] h-screen bg-primary  -skew-x-[12deg] flex  justify-center items-center absolute left-[20dvw] "
      >
        <div
          class="logo text-white  skew-x-[12deg] w-full h-full relative flex justify-center items-center flex-col gap-4"
        >
          <img
            src="assets/logo.png"
            alt="Logo"
            class="logo aspect-square w-44"
            #logoImg
          />

          <section class="carga hidden scale-0 absolute bottom-[30%]">
            <div class="spinner">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </section>
        </div>
      </div>
      <section class="w-1/2 flex justify-center items-center">
        <form
          [formGroup]="form"
          #loginForm
          (submit)="onLogin($event)"
          class="p-6 sm:p-8 rounded w-[60%]  flex flex-col gap-4 z-10  relative "
        >
          <h1 class="text-primary text-5xl font-bold text-center mb-4">
            Iniciar sesión
          </h1>
          <app-custom-input
            label="CI"
            formControlName="ci"
            [type]="'number'"
            placeholder="Ingrese su cédula de identidad"
          />
          <app-custom-input
            label="Contraseña"
            type="password"
            formControlName="password"
            placeholder="Contraseña"
          />
          <button
            type="submit"
            class="bg-primary text-white rounded-xl px-3 py-4 font-semibold"
          >
            Entrar
          </button>
        </form>
      </section>
    </div>
  `,
  imports: [CustomInputComponent, ToastComponent, ReactiveFormsModule],
})
export class LoginComponent implements OnInit {
  @ViewChild('bloque') bloque!: ElementRef;
  @ViewChild('loginForm') loginForm!: ElementRef;
  router = inject(Router);
  LoginS = inject(LoginService);
  toastS = inject(ToastService);
  form = new FormGroup({
    ci: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required,
    }),
  });

  ngOnInit(): void {
    gsap.fromTo(
      '.bloque',
      {
        duration: 1,

        translateX: -1000,
        ease: 'ease-in-out',
      },
      {
        duration: 1,
        translateX: 0,
        ease: 'ease-in-out',
      }
    );
  }

  onLogin(event: Event) {
    const formValue = this.form.getRawValue();
    event.preventDefault();

    if (this.form.invalid) {
      this.toastS.addToast({
        id: 'invalid-form',
        title: 'Error',
        description: 'Por favor completa todos los campos.',
        type: 'error',
      });
      return;
    }

    this.LoginS.login(formValue).subscribe({
      next: () => {
        const tl = gsap.timeline();

        tl.to(this.loginForm.nativeElement, {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.inOut',
          display: 'none',
        });
        tl.to('.logo', {
          skewX: 0,
          duration: 0.5,
          scale: 1.1,
          ease: 'power2.inOut',
        });
        tl.to(
          this.bloque.nativeElement,
          {
            skewX: 0,
            left: 0,
            duration: 0.8,
            height: '20vw',
            width: '100vw',
            ease: 'power2.inOut',
          },
          '<'
        );
        tl.to(this.bloque.nativeElement, {
          height: '100vh',
          duration: 1.5,
          ease: 'power2.inOut',
        });
        tl.to('.carga', {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: 'power2.inOut',
          display: 'flex',
        });

        tl.call(() => {
          this.LoginS.me().subscribe({
            next: (meResponse) => {
              sessionStorage.setItem('_u', JSON.stringify(meResponse));

              gsap.to(this.bloque.nativeElement, {
                translateY: -3000,
                ease: 'power2.inOut',
                duration: 0.5,
                delay: 2,
                display: 'none',
                onComplete: () => {
                  this.router.navigate(['/dashboard']);
                },
              });
            },
            error: () => {
              this.toastS.addToast({
                title: 'Ocurrió un error al obtener los datos del usuario',
                type: 'error',
              });
            },
          });
        });
      },
      error: (err) => {
        const message =
          err?.error?.errors?.message ||
          err?.error?.message ||
          'Error desconocido';

        this.toastS.addToast({
          title: 'Error',
          description: message,
          id: 'login-error',
          type: 'error',
        });
      },
    });
  }
}
