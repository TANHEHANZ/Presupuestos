import { Component, inject, input, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { R_UserDTO } from '../../../../../infraestructure/modules/presupuesto/types';
import { CustomInputComponent } from '../../../../shared/input/input.component';
import { CustomButtonComponent } from '../../../../shared/button/button.component';
import { CommonModule } from '@angular/common';
import { PermitionViewerComponent } from '../../../../../infraestructure/modules/permition/render.permition';
@Component({
  selector: 'app-usuer-detail',
  template: `
    <div class="w-full grid grid-cols-2 md:grid-cols-3 gap-4" *ngIf="userForm">
      <form [formGroup]="userForm" class="contents">
        <p class="font-medium col-span-full">Informacion del usuario:</p>

        <app-custom-input label="CI" formControlName="ci" [disabled]="true" />
        <app-custom-input label="Nombre" formControlName="name" />
        <app-custom-input label="Email" formControlName="email" />
        <app-custom-input label="Rol" formControlName="rol" />
        <app-custom-input label="Estado" formControlName="estado" />
        <app-custom-input
          label="Creado"
          [value]="(userForm.value.createdAt | date : 'short') ?? ''"
          [disabled]="true"
        />
        <div class="col-span-2  rounded-lg">
          <p class="font-medium">Permisos:</p>

          <app-permition-viewer
            [permitions]="D_user()?.permisos || []"
            [readonly]="true"
          ></app-permition-viewer>
        </div>
        <section class="grid grid-cols-3 gap-4">
          <p class="font-medium col-span-full">Acciones:</p>
          <app-custom-button [icon]="'edit'" (click)="toggleEdit($event)">
            {{ editMode ? 'Guardar' : 'Editar' }}
          </app-custom-button>
          <app-custom-button [variant]="'secondary'" [icon]="'settings'">
            Permisos
          </app-custom-button>
          <app-custom-button [variant]="'danger'" [icon]="'delete'">
            Eliminar
          </app-custom-button>
        </section>
      </form>
    </div>
  `,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomInputComponent,
    CustomButtonComponent,
    PermitionViewerComponent,
  ],
  standalone: true,
})
export class DetailUserComponent implements OnInit {
  D_user = input<R_UserDTO>();
  userForm!: FormGroup;
  editMode = false;

  ngOnInit() {
    const user = this.D_user();
    this.userForm = new FormGroup({
      ci: new FormControl({ value: user?.ci ?? '', disabled: true }),
      name: new FormControl({ value: user?.name ?? '', disabled: true }),
      email: new FormControl({ value: user?.email ?? '', disabled: true }),
      rol: new FormControl({ value: user?.rol ?? '', disabled: true }),
      estado: new FormControl({ value: user?.estado ?? '', disabled: true }),
      createdAt: new FormControl(user?.createdAt ?? ''),
    });
  }

  toggleEdit(event: Event) {
    event.preventDefault();
    if (this.editMode) {
      const updatedUser = this.userForm.getRawValue();
      console.log('Valores guardados:', updatedUser);
    }
    this.editMode = !this.editMode;
    if (this.editMode) {
      this.userForm.get('name')?.enable();
      this.userForm.get('email')?.enable();
      this.userForm.get('rol')?.enable();
      this.userForm.get('estado')?.enable();
    } else {
      this.userForm.get('name')?.disable();
      this.userForm.get('email')?.disable();
      this.userForm.get('rol')?.disable();
      this.userForm.get('estado')?.disable();
    }
  }
}
