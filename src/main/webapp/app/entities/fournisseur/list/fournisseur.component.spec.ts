import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { FournisseurService } from '../service/fournisseur.service';

import { FournisseurComponent } from './fournisseur.component';

describe('Fournisseur Management Component', () => {
  let comp: FournisseurComponent;
  let fixture: ComponentFixture<FournisseurComponent>;
  let service: FournisseurService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [FournisseurComponent],
    })
      .overrideTemplate(FournisseurComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FournisseurComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(FournisseurService);

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
    expect(comp.fournisseurs?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
