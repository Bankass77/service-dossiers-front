import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';

import { DossierService } from '../../../services/dossier-service';
import { DossierModel } from '../../../models/dossier.model';
import { DossierUpdateModel } from '../../../models/dossier-update-model';
import { StatutDossier } from '../../../models/statut-dossier';

@Component({
  selector: 'app-dossier-detail',
  imports: [
    ButtonModule,
    CardModule,
    TagModule,
    InputTextModule,
    SelectModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './dossier-detail.html',
  styleUrl: './dossier-detail.scss',
})
export class DossierDetail implements OnInit {

  private readonly route = inject(ActivatedRoute);
  private readonly dossierService = inject(DossierService);

  readonly dossierId = this.route.snapshot.paramMap.get('id');

  dossier = signal<DossierModel | null>(null);

  loading = signal(true);
  editing = signal(false);
  saving = signal(false);

  editForm: DossierUpdateModel = {
    titre: '',
    statut: ''
  };

  readonly status = Object.values(StatutDossier);

  ngOnInit(): void {

    if (!this.dossierId) {
      console.error("Identifiant du dossier absent de l'URL");
      this.loading.set(false);
      return;
    }

    this.dossierService.getDossierById(this.dossierId).subscribe({
      next: (dossier) => {
        this.dossier.set(dossier);
        this.loading.set(false);
      },

      error: (error) => {
        console.error(
          'Erreur lors du chargement du dossier',
          error
        );
        this.loading.set(false);
      }
    });
  }

  startEditing(): void {

    const dossier = this.dossier();

    if (!dossier) {
      return;
    }

    this.editForm = {
      titre: dossier.titre,
      statut: dossier.statut
    };

    this.editing.set(true);
  }

  cancelEditing(): void {
    this.editing.set(false);
  }

  save(): void {

    if (!this.dossierId) {
      console.error('ID du dossier absent');
      return;
    }

    this.saving.set(true);

    this.dossierService
      .updateDossierById(
        this.dossierId,
        this.editForm
      )
      .subscribe({
        next: (dossier) => {
          this.dossier.set(dossier);
          this.editing.set(false);
          this.saving.set(false);
        },

        error: (error) => {
          console.error(
            'Erreur lors de la mise à jour du dossier',
            error
          );
          this.saving.set(false);
        }
      });
  }
}