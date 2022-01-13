import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'article',
        data: { pageTitle: 'sgrApp.article.home.title' },
        loadChildren: () => import('./article/article.module').then(m => m.ArticleModule),
      },
      {
        path: 'fournisseur',
        data: { pageTitle: 'sgrApp.fournisseur.home.title' },
        loadChildren: () => import('./fournisseur/fournisseur.module').then(m => m.FournisseurModule),
      },
      {
        path: 'employee',
        data: { pageTitle: 'sgrApp.employee.home.title' },
        loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule),
      },
      {
        path: 'categorie',
        data: { pageTitle: 'sgrApp.categorie.home.title' },
        loadChildren: () => import('./categorie/categorie.module').then(m => m.CategorieModule),
      },
      {
        path: 'division',
        data: { pageTitle: 'sgrApp.division.home.title' },
        loadChildren: () => import('./division/division.module').then(m => m.DivisionModule),
      },
      {
        path: 'reception',
        data: { pageTitle: 'sgrApp.reception.home.title' },
        loadChildren: () => import('./reception/reception.module').then(m => m.ReceptionModule),
      },
      {
        path: 'affectation',
        data: { pageTitle: 'sgrApp.affectation.home.title' },
        loadChildren: () => import('./affectation/affectation.module').then(m => m.AffectationModule),
      },
      {
        path: 'detail-reception',
        data: { pageTitle: 'sgrApp.detailReception.home.title' },
        loadChildren: () => import('./detail-reception/detail-reception.module').then(m => m.DetailReceptionModule),
      },
      {
        path: 'marque',
        data: { pageTitle: 'sgrApp.marque.home.title' },
        loadChildren: () => import('./marque/marque.module').then(m => m.MarqueModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
