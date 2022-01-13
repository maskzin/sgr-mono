import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IDetailReception } from '../detail-reception.model';
import { DetailReceptionService } from '../service/detail-reception.service';

@Component({
  templateUrl: './detail-reception-delete-dialog.component.html',
})
export class DetailReceptionDeleteDialogComponent {
  detailReception?: IDetailReception;

  constructor(protected detailReceptionService: DetailReceptionService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.detailReceptionService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
