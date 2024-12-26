import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  inject,
  TemplateRef,
  Type,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { EmailFormComponent } from '../email-form/email-form.component';
import { LucideAngularModule } from 'lucide-angular';
import { ModalComponent } from '../modal/modal.component';
import { catchError, map, of } from 'rxjs';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, EmailFormComponent, LucideAngularModule, ModalComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  feedback?: string;
  private readonly httpClient = inject(HttpClient);
  inFlight = false;
  modalTemplate?: TemplateRef<any>;
  private readonly spy = inject(ChangeDetectorRef);

  @ViewChild('emailFormComp') formModal!: EmailFormComponent;

  submit(form: any) {
    this.feedback = undefined;
    this.inFlight = true;
    this.spy.detectChanges();

    const request: any = {
      text: form.message
    };

    if (form.name) {
      request['name'] = form.name;
    }

    if (form.email) {
      request['email'] = form.email;
    }

    this.httpClient
      .post('http://localhost:5284/mail', request, { responseType: 'text' })
      .pipe(
        map(() => true),
        catchError(() => of(false))
      )
      .subscribe(success => {
        this.feedback = success
          ? 'Thank you for your feedback.'
          : 'Something went wrong. Please return later and try again.';
        this.feedback += 'You can now close this popup.';
        this.inFlight = false;

        if (success && this.formModal) {
          this.formModal.clearForm();
        }

        this.spy.detectChanges();
      });
  }
}
