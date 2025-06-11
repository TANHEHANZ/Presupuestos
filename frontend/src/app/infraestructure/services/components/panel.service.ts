import { Injectable, TemplateRef, Type } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
type ModalContent = TemplateRef<any> | Type<any> | null;

@Injectable({ providedIn: 'root' })
export class PanelService {
  private modalOpen$ = new BehaviorSubject<boolean>(false);
  private drawerOpen$ = new BehaviorSubject<boolean>(false);
  modalState$ = this.modalOpen$.asObservable();
  drawerState$ = this.drawerOpen$.asObservable();

  openModal() {
    this.modalOpen$.next(true);
  }
  closeModal() {
    this.modalOpen$.next(false);
  }

  openDrawer() {
    this.drawerOpen$.next(true);
  }
  closeDrawer() {
    this.drawerOpen$.next(false);
  }
}
