import { Injectable, signal } from '@angular/core';

export interface ConfirmDialogData {
  title: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {
  readonly isOpen = signal(false);
  readonly data = signal<ConfirmDialogData>({ title: '', message: '' });

  private resolve: ((value: boolean) => void) | null = null;

  open(title: string, message: string): Promise<boolean> {
    this.data.set({ title, message });
    this.isOpen.set(true);

    return new Promise((resolve) => {
      this.resolve = resolve;
    });
  }

  confirm(): void {
    this.isOpen.set(false);
    if (this.resolve) {
      this.resolve(true);
    }
  }

  cancel(): void {
    this.isOpen.set(false);
    if (this.resolve) {
      this.resolve(false);
    }
  }
}
