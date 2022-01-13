import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { MarqueService } from '../service/marque.service';

import { MarqueComponent } from './marque.component';

describe('Marque Management Component', () => {
  let comp: MarqueComponent;
  let fixture: ComponentFixture<MarqueComponent>;
  let service: MarqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [MarqueComponent],
    })
      .overrideTemplate(MarqueComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(MarqueComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(MarqueService);

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
    expect(comp.marques?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
