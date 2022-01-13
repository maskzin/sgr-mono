import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { ReceptionService } from '../service/reception.service';

import { ReceptionComponent } from './reception.component';

describe('Reception Management Component', () => {
  let comp: ReceptionComponent;
  let fixture: ComponentFixture<ReceptionComponent>;
  let service: ReceptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ReceptionComponent],
    })
      .overrideTemplate(ReceptionComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ReceptionComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(ReceptionService);

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
    expect(comp.receptions?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
