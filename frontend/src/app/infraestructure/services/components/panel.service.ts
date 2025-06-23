import { Injectable, TemplateRef, Type } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

type ModalContent = TemplateRef<any> | Type<any> | null;

@Injectable({ providedIn: 'root' })
export class PanelService {
  private modalOpen$ = new BehaviorSubject<boolean>(false);
  private drawerOpen$ = new BehaviorSubject<boolean>(false);
  private refreshSubject$ = new Subject<void>();
  private drawerData$ = new BehaviorSubject<any>(null);
  modalState$ = this.modalOpen$.asObservable();
  drawerState$ = this.drawerOpen$.asObservable();
  refresh$ = this.refreshSubject$.asObservable();
  drawerDataState$ = this.drawerData$.asObservable();
  openModal(triggerRefresh = false) {
    this.modalOpen$.next(true);
    if (triggerRefresh) {
      this.triggerRefresh();
    }
  }

  closeModal(triggerRefresh = false) {
    this.modalOpen$.next(false);
    if (triggerRefresh) {
      this.triggerRefresh();
    }
  }

  openDrawer(triggerRefresh = false) {
    this.drawerOpen$.next(true);
    if (triggerRefresh) {
      this.triggerRefresh();
    }
  }
  openDrawerWithData(data: any) {
    this.drawerData$.next(data);
    this.openDrawer();
  }
  closeDrawer(triggerRefresh = false) {
    this.drawerOpen$.next(false);
    if (triggerRefresh) {
      this.triggerRefresh();
    }
  }

  triggerRefresh() {
    this.refreshSubject$.next();
  }
}
