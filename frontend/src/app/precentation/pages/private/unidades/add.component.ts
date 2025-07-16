import { Component, inject } from '@angular/core';
import { ContainerComponent } from '../../../shared/container/container.component';
import { CustomButtonComponent } from '../../../shared/button/button.component';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { PanelService } from '../../../../infraestructure/services/components/panel.service';

@Component({
  selector: 'app-add-unidades',
  template: `
    <app-container [title]="'Agregar Unidades Ejecutoras'">
      <div class="flex items-end  justify-sytart gap-2">
        <app-custom-button [icon]="'add'" (btnClick)="createNewUnidad()">
          Agregar nuevas unidades ejecutoras</app-custom-button
        >
      </div>
    </app-container>
  `,
  imports: [ContainerComponent, CustomButtonComponent],
})
export class ImportUnidadesComponent {
  modalS = inject(PanelService);

  createNewUnidad() {
    this.modalS.openModal();
  }
}
