import { Component } from '@angular/core';
import { WrapperComponent } from '../../../../shared/container/wrapper.component';

@Component({
  selector: 'app-dashboard-presupuesto',
  template: `
    <app-wrapper
      title="Dashboard"
      [path]="{
        initial: 'Modulos',
        finally: 'Dashboard'
      }"
    >
    </app-wrapper>
  `,
  imports: [WrapperComponent],
})
export class DashboardComponent {
  // Aquí puedes agregar la lógica necesaria para el componente
}
