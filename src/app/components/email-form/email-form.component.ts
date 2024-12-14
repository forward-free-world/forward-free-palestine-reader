import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
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
    <form (ngSubmit)="formSubmit.emit({email, message, name})">
      <lucide-icon name="x" [size]="20" [strokeWidth]="3" (click)="close.emit()"></lucide-icon>
      <h2 class="figtree-400">Contact us</h2>
      <input [(ngModel)]="name" name="name" placeholder="Your name (optional)" />
      <input [(ngModel)]="email" name="email" placeholder="Your email (optional)" />
      <textarea [(ngModel)]="message" name="message" placeholder="Your message" rows="10"></textarea>
      <button [disabled]="!message">Send message</button>
    </form>
  `,
  styleUrl: './email-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmailFormComponent {
  email?: string;
  message!: string;
  name!: string;

  @Output() close = new EventEmitter();
  @Output() formSubmit = new EventEmitter<EmailForm>();
}
