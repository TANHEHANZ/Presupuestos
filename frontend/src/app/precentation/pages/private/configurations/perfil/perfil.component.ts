import { Component, inject, OnInit } from '@angular/core';
import { ConfigService } from '../../../../../infraestructure/services/apis/config.service';
import { CustomInputComponent } from '../../../../shared/input/input.component';
import { CustomButtonComponent } from '../../../../shared/button/button.component';
import { IconComponent } from '../../../../shared/icons/icon.component';

@Component({
  selector: 'app-profile',
  template: `
    <div class=" p-8">
      <form
        class="grid grid-cols-2 gap-4 content-center justify-center items-center "
      >
        <app-custom-input label="Nombre"></app-custom-input>
        <app-custom-input label="CI"></app-custom-input>
        <app-custom-input label="Rol"></app-custom-input>
        <app-custom-input label="Estado"></app-custom-input>
        <app-custom-input label="Secretaria"></app-custom-input>
        <app-custom-input label="Descripcion"></app-custom-input>
        <div class="col-span-full flex justify-end ">
          <app-custom-button>Cambiar contraseña</app-custom-button>
        </div>
        <div
          class="col-span-full grid grid-cols-2  gap-4 justify-center items-center bg-primary/5 rounded-xl  p-8 "
        >
          <p
            class=" col-span-full text-violet-600 border  p-4  rounded-lg border-violet-200 bg-violet-50"
          >
            <app-icon name="warning" />
            Estas Por cambiar tu contraseña , ingresa una contraseña segura y
            facil de recordar
          </p>
          <app-custom-input label="Contraseña actual"></app-custom-input>
          <app-custom-input label="Nueva contraseña"></app-custom-input>
        </div>
        <div class="self-end col-span-full flex justify-end gap-4">
          <app-custom-button [variant]="'secondary'" [icon]="'close'"
            >Cancelar</app-custom-button
          >
          <app-custom-button [icon]="'save'"
            >Cambiar contraseña</app-custom-button
          >
        </div>
      </form>
    </div>
  `,
  imports: [CustomInputComponent, CustomButtonComponent, IconComponent],
})
export class PerfilComponent implements OnInit {
  profileS = inject(ConfigService);

  ngOnInit(): void {
    this.profileS.profile().subscribe({
      next: (value) => {
        console.log(value);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}
