import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EmailFormComponent } from './email-form/email-form.component';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [EmailFormComponent, LucideAngularModule],
  template: ` <div><lucide-icon name="mail" [size]="17" [strokeWidth]="2" (click)="showForm = true"></lucide-icon></div>
    @if(showForm) {
    <app-email-form (formSubmit)="submit($event)" (close)="showForm = false" />
    }`,
  styles: `
  :host {
    display: flex;
    position: fixed;
    bottom: 0px;
    left: 0;
    right: 0;
    height: 60px;
    background: #fff;
    justify-content: center;
    align-items: center;
    div {
      width: var(--site-width);
    }

    lucide-icon {
      cursor: pointer;
    }
  }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  showForm = false;

  submit(form: any) {
    console.log(form);
  }
}
