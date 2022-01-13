import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IFournisseur } from '../fournisseur.model';
import { FournisseurService } from '../service/fournisseur.service';
import { FournisseurDeleteDialogComponent } from '../delete/fournisseur-delete-dialog.component';

@Component({
  selector: 'jhi-fournisseur',
  templateUrl: './fournisseur.component.html',
})
export class FournisseurComponent implements OnInit {
  fournisseurs?: IFournisseur[];
  isLoading = false;

  constructor(protected fournisseurService: FournisseurService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.fournisseurService.query().subscribe({
      next: (res: HttpResponse<IFournisseur[]>) => {
        this.isLoading = false;
        this.fournisseurs = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IFournisseur): number {
    return item.id!;
  }

  delete(fournisseur: IFournisseur): void {
    const modalRef = this.modalService.open(FournisseurDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.fournisseur = fournisseur;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
