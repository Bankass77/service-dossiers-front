import { StatutDossier } from "./statut-dossier";

export interface DossierModel {
  id: string;
  numero: string;
  titre: string;
  statut: StatutDossier;
  dateCreation: string;

}

