import { Injectable,inject } from '@angular/core';
import { DossierList } from '../components/dossier-list/dossier-list';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DossierModel } from '../models/dossier.model';

@Injectable({
  providedIn: 'root',
})
export class DossierService {
  private readonly http= inject(HttpClient);
  private readonly apiUrl='/api/bff/dossiers';
  
  getDossiers(): Observable<DossierModel[]>{
    return this.http.get<DossierModel[]>(this.apiUrl);
  }
}
