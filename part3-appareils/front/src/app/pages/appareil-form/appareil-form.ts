
import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Appareil } from '../../models/appareil';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-appareil-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './appareil-form.html',
  styleUrl: './appareil-form.css',
})
export class AppareilForm implements OnInit {
  private readonly http = inject(HttpClient);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  appareilId: string | null = null;
  nom = '';
  etat: 'On' | 'Off' = 'Off';

  loading = signal(false);
  error = signal('');
  modeModification = signal(false);

  ngOnInit(): void {
    this.appareilId = this.route.snapshot.paramMap.get('id');

    if (this.appareilId) {
      this.modeModification.set(true);
      this.loading.set(true);

      this.http
        .get<Appareil>(`${environment.apiUrl}/${this.appareilId}`)
        .subscribe({
          next: (appareil) => {
            this.nom = appareil.name;
            this.etat = appareil.status;
            this.loading.set(false);
          },
          error: () => {
            this.error.set('Impossible de charger cet appareil.');
            this.loading.set(false);
          },
        });
    }
  }

  enregistrer(): void {
    const nomNettoye = this.nom.trim();

    if (!nomNettoye) {
      this.error.set('Le nom de l’appareil est obligatoire.');
      return;
    }

    this.error.set('');
    this.loading.set(true);

    const donnees = {
      name: nomNettoye,
      status: this.etat,
    };

    const requete = this.appareilId
      ? this.http.put<Appareil>(
          `${environment.apiUrl}/${this.appareilId}`,
          donnees
        )
      : this.http.post<Appareil>(environment.apiUrl, donnees);

    requete.subscribe({
      next: () => {
        this.router.navigate(['/appareils']);
      },
      error: (err) => {
        console.error('Erreur lors de l’enregistrement :', err);
        this.error.set('Impossible d’enregistrer l’appareil.');
        this.loading.set(false);
      },
    });
  }
}
