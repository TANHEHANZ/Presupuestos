import { Component } from '@angular/core';
import { WrapperComponent } from '../../../shared/container/wrapper.component';

@Component({
  selector: 'app-configuration',
  template: ` <app-wrapper
    title="Configuración"
    [path]="{ initial: 'Modulos', finally: 'configuracion' }"
  >
    <section class="grid grid-cols-[200px_1fr] h-full">
      <nav class="flex flex-col justify-center items-center bg-white h-full">
        <div class=" flex flex-col gap-1 ">Perfil</div>
      </nav>
    </section>
  </app-wrapper>`,
  imports: [WrapperComponent],
})
export class ConfigComponent {}
