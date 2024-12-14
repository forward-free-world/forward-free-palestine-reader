import { ChangeDetectionStrategy, Component, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailFormComponent } from '../email-form/email-form.component';
import { LucideAngularModule } from 'lucide-angular';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, EmailFormComponent, LucideAngularModule, ModalComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  modalTemplate?: TemplateRef<any>;

  submit(form: any) {
    console.log(form);
  }
}
