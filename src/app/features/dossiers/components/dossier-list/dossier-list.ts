import { Component, inject, OnInit } from '@angular/core';
import { DossierService } from '../../services/dossier-service';
import { DossierModel } from '../../models/dossier.model';

@Component({
  selector: 'app-dossier-list',
  imports: [],
  templateUrl: './dossier-list.html',
  styleUrl: './dossier-list.scss',
})
export class DossierList implements OnInit {

  private readonly dossierService = inject(DossierService)


  dossiers: DossierModel[] = [];

  ngOnInit(): void {

    this.dossierService.getDossiers().subscribe(
      {
        next: (dossiers) => {
          console.log('Dossiers reçus par Angular :',dossiers)
          this.dossiers = dossiers;
        },
        error: (error) => {
          console.error('Erreur lors du chargement des this.dossiers', error);
        }
      }
    );
  }

}
