import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IReception } from '../reception.model';
import { ReceptionService } from '../service/reception.service';
import { ReceptionDeleteDialogComponent } from '../delete/reception-delete-dialog.component';

@Component({
  selector: 'jhi-reception',
  templateUrl: './reception.component.html',
})
export class ReceptionComponent implements OnInit {
  receptions?: IReception[];
  isLoading = false;

  constructor(protected receptionService: ReceptionService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.receptionService.query().subscribe({
      next: (res: HttpResponse<IReception[]>) => {
        this.isLoading = false;
        this.receptions = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IReception): number {
    return item.id!;
  }

  delete(reception: IReception): void {
    const modalRef = this.modalService.open(ReceptionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.reception = reception;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
