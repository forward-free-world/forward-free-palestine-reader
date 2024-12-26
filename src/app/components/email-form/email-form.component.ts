import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';

type EmailForm = {
  email?: string;
  message: string;
  name?: string;
};

@Component({
  selector: 'app-email-form',
  standalone: true,
  imports: [FormsModule, LucideAngularModule],
  template: `
    <form (ngSubmit)="formSubmit.emit({email, message, name})" class="default-modal-container">
      <h2 class="figtree-500">Contact us</h2>
      <input [(ngModel)]="name" name="name" placeholder="Your name (optional)" />
      <input [(ngModel)]="email" name="email" placeholder="Your email (optional)" />
      <textarea [(ngModel)]="message" name="message" placeholder="Your message" rows="10"></textarea>
      <button [disabled]="!message || disabled">Send message</button>
      <p class="feedback"><ng-content /></p>
    </form>
  `,
  styleUrl: './email-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmailFormComponent {
  email?: string;
  message!: string;
  name?: string;

  @Input() disabled = false;
  @Output() formSubmit = new EventEmitter<EmailForm>();

  clearForm() {
    this.email = undefined;
    this.message = '';
    this.name = undefined;
  }
}
