import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DetailReceptionDetailComponent } from './detail-reception-detail.component';

describe('DetailReception Management Detail Component', () => {
  let comp: DetailReceptionDetailComponent;
  let fixture: ComponentFixture<DetailReceptionDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailReceptionDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ detailReception: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(DetailReceptionDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(DetailReceptionDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load detailReception on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.detailReception).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
