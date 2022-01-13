import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MarqueDetailComponent } from './marque-detail.component';

describe('Marque Management Detail Component', () => {
  let comp: MarqueDetailComponent;
  let fixture: ComponentFixture<MarqueDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarqueDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ marque: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(MarqueDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(MarqueDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load marque on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.marque).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
