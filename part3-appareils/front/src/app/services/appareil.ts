
import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Appareil, AppareilInput } from '../models/appareil';

@Injectable({
  providedIn: 'root',
})
export class AppareilService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  readonly appareils = signal<Appareil[]>([]);
  readonly loading = signal(false);
  readonly error = signal('');

  chargerAppareils(): void {
    this.loading.set(true);
    this.error.set('');

    this.http.get<Appareil[]>(this.apiUrl).subscribe({
      next: (appareils) => {
        this.appareils.set(appareils);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Erreur de chargement :', err);
        this.error.set('Impossible de charger les appareils.');
        this.loading.set(false);
      },
    });
  }

  ajouterAppareil(data: AppareilInput): void {
    this.error.set('');

    this.http.post<Appareil>(this.apiUrl, data).subscribe({
      next: (appareil) => {
        this.appareils.update((liste) => [appareil, ...liste]);
      },
      error: (err) => {
        console.error('Erreur de création :', err);
        this.error.set('Impossible de créer cet appareil.');
      },
    });
  }

  modifierAppareil(id: string, data: AppareilInput): void {
    this.error.set('');

    this.http.put<Appareil>(`${this.apiUrl}/${id}`, data).subscribe({
      next: (appareil) => {
        this.appareils.update((liste) =>
          liste.map((item) => item._id === id ? appareil : item),
        );
      },
      error: (err) => {
        console.error('Erreur de modification :', err);
        this.error.set('Impossible de modifier cet appareil.');
      },
    });
  }

  supprimerAppareil(id: string): void {
    this.error.set('');

    this.http.delete(`${this.apiUrl}/${id}`).subscribe({
      next: () => {
        this.appareils.update((liste) =>
          liste.filter((item) => item._id !== id),
        );
      },
      error: (err) => {
        console.error('Erreur de suppression :', err);
        this.error.set('Impossible de supprimer cet appareil.');
      },
    });
  }

  inverserTousLesEtats(): void {
    this.error.set('');

    this.http.patch<{ appareils: Appareil[] }>(
      `${this.apiUrl}/switch-all`,
      {},
    ).subscribe({
      next: (resultat) => {
        this.appareils.set(resultat.appareils);
      },
      error: (err) => {
        console.error('Erreur de mise à jour :', err);
        this.error.set('Impossible de changer les états.');
      },
    });
  }
}
