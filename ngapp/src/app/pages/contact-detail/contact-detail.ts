import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container py-5">
      <h1 class="mb-3">Détail du contact</h1>

      <p class="fs-5">
        Identifiant du contact :
        <strong>{{ contactId }}</strong>
      </p>

      <a routerLink="/contact" class="btn btn-primary">
        Retour au formulaire de contact
      </a>
    </div>
  `
})
export class ContactDetail implements OnInit {
  contactId = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.contactId = params.get('id') ?? '';
    });
  }
}