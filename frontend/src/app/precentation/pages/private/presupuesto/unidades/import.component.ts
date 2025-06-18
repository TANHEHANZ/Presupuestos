import { Component } from '@angular/core';
import { ContainerComponent } from '../../../../shared/container/container.component';
import { CustomButtonComponent } from '../../../../shared/button/button.component';

@Component({
  selector: 'app-import-Unidades',
  template: `
    <app-container [title]="'importaciones'">
      <p></p>
      <app-custom-button> Exportart </app-custom-button>
    </app-container>
  `,
  imports: [ContainerComponent, CustomButtonComponent],
})
export class ImportUnidadesComponent {}
