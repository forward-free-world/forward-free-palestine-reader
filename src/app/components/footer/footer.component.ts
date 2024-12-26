import { ChangeDetectionStrategy, Component, inject, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
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
  httpClient = inject(HttpClient);
  modalTemplate?: TemplateRef<any>;

  submit(form: any) {
    this.httpClient
      .post(
        'https://scltamhxbe.execute-api.af-south-1.amazonaws.com/Production/mail',
        {
          email: form.email,
          text: form.message
        },
        {
          responseType: 'text'
        }
      )
      .subscribe();
  }
}
