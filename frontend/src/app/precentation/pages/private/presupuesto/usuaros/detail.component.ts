import { Component, inject, input, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { R_UserDTO } from '../../../../../infraestructure/modules/presupuesto/types';
import { CustomInputComponent } from '../../../../shared/input/input.component';
import { CustomButtonComponent } from '../../../../shared/button/button.component';
import { CommonModule } from '@angular/common';
import { PermitionViewerComponent } from '../../../../../infraestructure/modules/permition/render.permition';
import { PanelService } from '../../../../../infraestructure/services/components/panel.service';
import { DrawerComponent } from '../../../../shared/drawer/drawer.component';
import { ConfigUserComponent } from './config.user.component';

@Component({
  selector: 'app-usuer-detail',
  template: `
    <app-drawer title="Configuración de cuenta de usuario ">
      <ng-container *ngIf="editMode">
        <app-config-user-component
          *ngIf="editMode"
          [D_user]="D_user()"
          [edit]="true"
        />
      </ng-container>
    </app-drawer>
    <div class="w-full grid grid-cols-2 gap-4" *ngIf="userForm">
      <form [formGroup]="userForm" class="grid grid-cols-4 w-full ">
        <p class="font-medium col-span-full">Información del usuario:</p>

        <app-custom-input label="CI" formControlName="ci" [disabled]="true" />
        <app-custom-input label="Nombre" formControlName="name" />
        <app-custom-input label="Rol" formControlName="rol" />
        <app-custom-input label="Estado" formControlName="estado" />

        <app-custom-input label="UE" formControlName="ue" [disabled]="true" />
        <app-custom-input
          label="Unidad / Secretaría"
          formControlName="unidadSecretaria"
          [disabled]="true"
          class="col-span-2"
        />
      </form>
      <div class=" rounded-lg">
        <p class="font-medium">Permisos:</p>
        <app-permition-viewer
          [permitions]="D_user()?.permisos"
          [readonly]="true"
        />
      </div>
      <section
        class="flex  gap-4 justify-end flex-wrap items-center col-span-full self-end "
      >
        <p class="font-medium  w-full text-end">Acciones</p>
        <app-custom-button [icon]="'edit'" (click)="openEditDrawer()">
          Editar
        </app-custom-button>
        <app-custom-button [variant]="'secondary'" [icon]="'settings'">
        </app-custom-button>
        <app-custom-button [variant]="'danger'" [icon]="'delete'">
        </app-custom-button>
      </section>
    </div>
  `,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomInputComponent,
    CustomButtonComponent,
    PermitionViewerComponent,
    DrawerComponent,
    ConfigUserComponent,
  ],
  standalone: true,
})
export class DetailUserComponent implements OnInit {
  D_user = input<any>();
  userForm!: FormGroup;
  editMode = false;
  panelS = inject(PanelService);
  ngOnInit() {
    const user = this.D_user();
    console.log(user);
    this.userForm = new FormGroup({
      ci: new FormControl({ value: user?.ci ?? '', disabled: true }),
      name: new FormControl({ value: user?.name ?? '', disabled: true }),
      rol: new FormControl({ value: user?.rol ?? '', disabled: true }),
      estado: new FormControl({ value: user?.estado ?? '', disabled: true }),
      ue: new FormControl({ value: user?.ue ?? '', disabled: true }),
      unidadSecretaria: new FormControl({
        value: user?.unidadSecretaria ?? '',
        disabled: true,
      }),
    });
  }

  openEditDrawer() {
    this.editMode = true;
    this.panelS.openDrawer();
  }
}
