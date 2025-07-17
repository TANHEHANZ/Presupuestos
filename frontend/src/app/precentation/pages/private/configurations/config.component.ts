import { Component } from '@angular/core';
import { WrapperComponent } from '../../../shared/container/wrapper.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { SubNavComponent } from '../../../shared/nav/sub.nav.component';

@Component({
  selector: 'app-configuration',
  standalone: true,
  imports: [WrapperComponent, RouterOutlet, SubNavComponent, RouterModule],
  template: `
    <app-wrapper
      title="Configuración"
      [path]="{ initial: 'Modulos', finally: 'configuracion' }"
    >
      <section class="min-h-[73dvh] bg-white rounded-xl overflow-hidden">
        <app-sub-nav
          [links]="[
            { path: 'perfil', icon: 'user', label: 'Perfil' },
            { path: 'history', icon: 'history', label: 'Historial' }
          ]"
        />
        <section class="h-full p-2 ">
          <router-outlet />
        </section>
      </section>
    </app-wrapper>
  `,
})
export class ConfigComponent {}
