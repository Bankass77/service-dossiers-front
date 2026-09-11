import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DossierList } from './features/dossiers/components/dossier-list/dossier-list';
import { DossierDetail } from './features/dossiers/components/dossier-detail/dossier-detail/dossier-detail';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,DossierList, DossierDetail],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('service-dossiers-front');
}
