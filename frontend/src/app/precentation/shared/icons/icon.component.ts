import { Component, Input } from '@angular/core';
import {
  FaIconLibrary,
  FontAwesomeModule,
  SizeProp,
} from '@fortawesome/angular-fontawesome';
import { ICONS } from './name';

export type IconName = keyof typeof ICONS;

@Component({
  selector: 'app-icon',
  imports: [FontAwesomeModule],
  template: `<fa-icon [icon]="icon" [size]="size"></fa-icon>`,
  standalone: true,
})
export class IconComponent {
  @Input() name!: IconName;
  @Input() size: SizeProp = '1x';

  get icon() {
    return ICONS[this.name];
  }

  constructor(library: FaIconLibrary) {
    library.addIcons(...Object.values(ICONS));
  }
}
