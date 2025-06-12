import { Component } from '@angular/core';
import { WrapperComponent } from '../../../../shared/container/wrapper.component';

@Component({
  selector: 'app-consultas',
  template: ` <app-wrapper
    title="Consultas"
    [path]="{
      initial: 'Modulos',
      finally: 'Consultas'
    }"
  >
  </app-wrapper>`,
  imports: [WrapperComponent],
})
export class ConsultasComponent {}
