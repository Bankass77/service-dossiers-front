import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { DossierService } from '../../services/dossier-service';
import { DossierModel } from '../../models/dossier.model';
import {TableModule} from 'primeng/table';

@Component({
  selector: 'app-dossier-list',
  imports: [TableModule],
  templateUrl: './dossier-list.html',
  styleUrl: './dossier-list.scss',
})
export class DossierList implements OnInit {

  private readonly dossierService = inject(DossierService);

  dossiers = signal<DossierModel[]>([]);
  loading = signal(true);
  private readonly changeDetector = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.dossierService.getDossiers().subscribe({
      next: (dossiers) => {
        console.log('Dossiers reçus par Angular :', dossiers);

        this.dossiers.set(dossiers);
        this.loading.set(false);
        this.changeDetector.markForCheck();
      },
      error: (error) => {
        console.error('Erreur lors du chargement des dossiers', error);
        this.loading.set(false);
      }
    });
  }
}