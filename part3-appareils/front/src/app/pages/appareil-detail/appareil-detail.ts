
import { Component, OnInit, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Appareil } from '../../models/appareil';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-appareil-detail',
  imports: [RouterLink, DatePipe],
  templateUrl: './appareil-detail.html',
  styleUrl: './appareil-detail.css',
})
export class AppareilDetail implements OnInit {
  private readonly http = inject(HttpClient);
  private readonly route = inject(ActivatedRoute);

  appareil = signal<Appareil | null>(null);
  loading = signal(true);
  error = signal('');

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.error.set('Identifiant de l’appareil introuvable.');
      this.loading.set(false);
      return;
    }

    this.http.get<Appareil>(`${environment.apiUrl}/${id}`).subscribe({
      next: (appareil) => {
        this.appareil.set(appareil);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Erreur HTTP :', err);
        this.error.set('Impossible de charger cet appareil.');
        this.loading.set(false);
      },
    });
  }
}
