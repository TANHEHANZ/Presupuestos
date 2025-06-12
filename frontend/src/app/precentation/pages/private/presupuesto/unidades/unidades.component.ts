import { Component } from '@angular/core';
import { WrapperComponent } from '../../../../shared/container/wrapper.component';

@Component({
  selector: 'app-unidades',
  template: `
    <app-wrapper
      title="Unidades"
      [path]="{
        initial: 'Modulos',
        finally: 'Unidades'
      }"
    >
    </app-wrapper>
  `,
  imports: [WrapperComponent],
})
export class UnidadesComponent {
  // Aquí puedes agregar la lógica necesaria para el componente
}
