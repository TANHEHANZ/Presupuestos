import { Component, inject, OnInit } from '@angular/core';
import { ConfigService } from '../../../../../infraestructure/services/apis/config.service';

@Component({
  selector: 'app-profile',
  template: `
    <div>
      <h1>Perfil</h1>
    </div>
  `,
  imports: [],
})
export class PerfilComponent implements OnInit {
  profileS = inject(ConfigService);

  ngOnInit(): void {
    this.profileS.profile().subscribe({
      next: (value) => {
        console.log(value);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}
