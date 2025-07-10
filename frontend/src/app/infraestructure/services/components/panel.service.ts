import { Injectable, TemplateRef, Type } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

type ModalContent = TemplateRef<any> | Type<any> | null;

@Injectable({ providedIn: 'root' })
export class PanelService {
  private modalOpen$ = new BehaviorSubject<boolean>(false);
  private drawerOpen$ = new BehaviorSubject<boolean>(false);
  private refreshSubject$ = new Subject<void>();
  private drawerData$ = new BehaviorSubject<any>(null);
  private modalData$ = new BehaviorSubject<any>(null);
  modalDataState$ = this.modalData$.asObservable();

  modalState$ = this.modalOpen$.asObservable();
  drawerState$ = this.drawerOpen$.asObservable();
  refresh$ = this.refreshSubject$.asObservable();
  drawerDataState$ = this.drawerData$.asObservable();
  openModal(triggerRefresh = false, data?: any) {
    if (data !== undefined) {
      this.modalData$.next(data);
    }
    this.modalOpen$.next(true);
    if (triggerRefresh) {
      this.triggerRefresh();
    }
  }
  openModalWithData(data: any, triggerRefresh = false) {
    this.modalData$.next(data);
    this.openModal(triggerRefresh);
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
