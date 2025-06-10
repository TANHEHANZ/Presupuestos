import { Component, input } from '@angular/core';
import { Proyecto } from '../../../../../infraestructure/global/proyecto';

@Component({
  template: `
    <div class="flex flex-col gap-2">
      <div>
        <p class="uppercase text-xs">Detalle</p>
        {{ row()?.descripcionGasto }}
      </div>
      <div class="flex gap-4 mt-2">
        <button class="text-primary font-semibold">Editar</button>
        <button class="text-red-500 font-semibold">Eliminar</button>
      </div>
    </div>
  `,
  standalone: true,
  selector: 'app-registros-detail',
})
export class RegistrosDetailComponent {
  row = input<Proyecto>();
}
