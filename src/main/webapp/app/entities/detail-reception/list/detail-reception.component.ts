import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDetailReception } from '../detail-reception.model';
import { DetailReceptionService } from '../service/detail-reception.service';
import { DetailReceptionDeleteDialogComponent } from '../delete/detail-reception-delete-dialog.component';

@Component({
  selector: 'jhi-detail-reception',
  templateUrl: './detail-reception.component.html',
})
export class DetailReceptionComponent implements OnInit {
  detailReceptions?: IDetailReception[];
  isLoading = false;

  constructor(protected detailReceptionService: DetailReceptionService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.detailReceptionService.query().subscribe({
      next: (res: HttpResponse<IDetailReception[]>) => {
        this.isLoading = false;
        this.detailReceptions = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IDetailReception): number {
    return item.id!;
  }

  delete(detailReception: IDetailReception): void {
    const modalRef = this.modalService.open(DetailReceptionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.detailReception = detailReception;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
