import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [LucideAngularModule],
  template: `<div>
    <ng-content /><lucide-icon name="x" [size]="20" [strokeWidth]="3" (click)="close.emit()"></lucide-icon>
  </div>`,
  styleUrl: './modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent {
  @Output() close = new EventEmitter();
}
