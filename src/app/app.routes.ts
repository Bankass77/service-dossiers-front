import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { DossierDetail } from './features/dossiers/components/dossier-detail/dossier-detail/dossier-detail';

export const routes: Routes = [
    {
    path: 'dossiers/:id',
    component: DossierDetail
    }
];
