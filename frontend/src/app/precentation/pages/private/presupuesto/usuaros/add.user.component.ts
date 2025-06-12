import { Component, inject } from '@angular/core';
import { CustomInputComponent } from '../../../../shared/input/input.component';
import { CustomButtonComponent } from '../../../../shared/button/button.component';
import { PanelService } from '../../../../../infraestructure/services/components/panel.service';
import { ContainerComponent } from '../../../../shared/container/container.component';

@Component({
  template: `
    <app-container title="Agregar usuario">
      <div class="flex gap-2 justify-start items-end ">
        <app-custom-input
          label="Buscar CI"
          inputId="buscar-ci"
          placeholder="Buscar por ci a usuario para agregarlo"
          [type]="'text'"
          class="w-[60%]"
        ></app-custom-input>
        <app-custom-button
          type="button"
          icon="add"
          (click)="newUser()"
          aria-label="Agregar nuevo usuario"
        >
          Nuevo usuario
        </app-custom-button>
      </div>
    </app-container>
  `,
  selector: 'app-user-add',
  imports: [CustomInputComponent, CustomButtonComponent, ContainerComponent],
})
export class AddUserComponent {
  panelS = inject(PanelService);
  newUser() {
    this.panelS.openDrawer();
  }
}
