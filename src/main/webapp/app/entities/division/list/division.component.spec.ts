import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { DivisionService } from '../service/division.service';

import { DivisionComponent } from './division.component';

describe('Division Management Component', () => {
  let comp: DivisionComponent;
  let fixture: ComponentFixture<DivisionComponent>;
  let service: DivisionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [DivisionComponent],
    })
      .overrideTemplate(DivisionComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DivisionComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(DivisionService);

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
    expect(comp.divisions?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
