import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { R_UserDTO } from '../../../../../infraestructure/modules/presupuesto/types';

@Component({
  selector: 'app-usuer-detail',
  template: `
    <div>
      <strong>Permisos:</strong>
      <ul>
        <li *ngFor="let permiso of D_user()?.permisos">
          {{ permiso.nombre }}
        </li>
      </ul>
    </div>
  `,
  imports: [CommonModule],
})
export class DetailUserComponent {
  D_user = input<R_UserDTO>();
}
