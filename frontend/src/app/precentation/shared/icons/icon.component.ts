import { Component, Input } from '@angular/core';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { ICONS } from './name';

export type IconName = keyof typeof ICONS;

@Component({
  selector: 'app-icon',
  imports: [FontAwesomeModule],
  template: `<fa-icon [icon]="icon"></fa-icon>`,
  standalone: true,
})
export class IconComponent {
  @Input() name!: IconName;

  get icon() {
    return ICONS[this.name];
  }

  constructor(library: FaIconLibrary) {
    library.addIcons(...Object.values(ICONS));
  }
}
