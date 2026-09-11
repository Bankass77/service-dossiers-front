import { Injectable,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DossierModel } from '../models/dossier.model';
import { DossierUpdateModel } from '../models/dossier-update-model';

@Injectable({
  providedIn: 'root',
})
export class DossierService {
  private readonly http= inject(HttpClient);
  private readonly apiUrl='/api/bff/dossiers';
  
  getDossiers(): Observable<DossierModel[]>{
    return this.http.get<DossierModel[]>(this.apiUrl);
  }


  // on recupère un dossier par son id
  getDossierById(id: string):Observable<DossierModel>{

    return this.http.get<DossierModel>(`${this.apiUrl}/${id}`)
  }


  //on met à jour un dossier
  updateDossierById(id: string, dossier: DossierUpdateModel): Observable<DossierModel>{

    return this.http.put<DossierModel>(`${this.apiUrl}/${id}`, dossier);
  }
}
