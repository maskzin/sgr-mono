import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { AffectationService } from '../service/affectation.service';

import { AffectationComponent } from './affectation.component';

describe('Affectation Management Component', () => {
  let comp: AffectationComponent;
  let fixture: ComponentFixture<AffectationComponent>;
  let service: AffectationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [AffectationComponent],
    })
      .overrideTemplate(AffectationComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AffectationComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(AffectationService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.affectations?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
