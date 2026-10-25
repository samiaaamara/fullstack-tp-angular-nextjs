
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppareilService } from '../../services/appareil';

@Component({
  selector: 'app-appareil-list',
  imports: [RouterLink],
  templateUrl: './appareil-list.html',
  styleUrl: './appareil-list.css',
})
export class AppareilList implements OnInit {
  readonly service = inject(AppareilService);

  ngOnInit(): void {
    this.service.chargerAppareils();
  }

  changerEtat(id: string, name: string, status: 'On' | 'Off'): void {
    this.service.modifierAppareil(id, {
      name,
      status: status === 'On' ? 'Off' : 'On',
    });
  }

  supprimer(id: string, name: string): void {
    if (confirm(`Voulez-vous vraiment supprimer "${name}" ?`)) {
      this.service.supprimerAppareil(id);
    }
  }
}
