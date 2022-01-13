import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { DetailReceptionService } from '../service/detail-reception.service';

import { DetailReceptionComponent } from './detail-reception.component';

describe('DetailReception Management Component', () => {
  let comp: DetailReceptionComponent;
  let fixture: ComponentFixture<DetailReceptionComponent>;
  let service: DetailReceptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [DetailReceptionComponent],
    })
      .overrideTemplate(DetailReceptionComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DetailReceptionComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(DetailReceptionService);

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
    expect(comp.detailReceptions?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
