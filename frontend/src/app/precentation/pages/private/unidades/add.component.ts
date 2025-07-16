import { Component, inject, OnInit } from '@angular/core';
import { ContainerComponent } from '../../../shared/container/container.component';
import { CustomButtonComponent } from '../../../shared/button/button.component';
import { PanelService } from '../../../../infraestructure/services/components/panel.service';
import { P_unit } from '../../../../infraestructure/constants/permitions/p_unidades';
import { MeService } from '../../../../infraestructure/services/components/me.service';
import { PermissionKey } from '../../../../infraestructure/constants/permitions';
import { hasPermissions } from '../../../../infraestructure/utils/checkPermitions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-unidades',
  template: `
    <app-container
      *ngIf="canPermission[P_unit.CREATE]"
      [title]="'Agregar Unidades Ejecutoras'"
    >
      <div class="flex items-end  justify-sytart gap-2">
        <app-custom-button [icon]="'add'" (btnClick)="createNewUnidad()">
          Agregar nuevas unidades ejecutoras</app-custom-button
        >
      </div>
    </app-container>
  `,
  imports: [ContainerComponent, CustomButtonComponent, CommonModule],
})
export class ImportUnidadesComponent implements OnInit {
  modalS = inject(PanelService);
  meService = inject(MeService);

  P_unit = P_unit;

  createNewUnidad() {
    this.modalS.openModal();
  }
  canPermission: Record<PermissionKey, boolean> = {} as any;

  ngOnInit(): void {
    this.canPermission = hasPermissions(
      [P_unit.CREATE],
      this.meService.permissions
    );
  }
}
