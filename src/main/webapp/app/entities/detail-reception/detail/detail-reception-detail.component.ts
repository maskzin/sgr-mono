import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDetailReception } from '../detail-reception.model';

@Component({
  selector: 'jhi-detail-reception-detail',
  templateUrl: './detail-reception-detail.component.html',
})
export class DetailReceptionDetailComponent implements OnInit {
  detailReception: IDetailReception | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ detailReception }) => {
      this.detailReception = detailReception;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
