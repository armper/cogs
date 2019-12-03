import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CogsTestModule } from '../../../test.module';
import { SameCodeComponent } from 'app/entities/same-code/same-code.component';
import { SameCodeService } from 'app/entities/same-code/same-code.service';
import { SameCode } from 'app/shared/model/same-code.model';

describe('Component Tests', () => {
  describe('SameCode Management Component', () => {
    let comp: SameCodeComponent;
    let fixture: ComponentFixture<SameCodeComponent>;
    let service: SameCodeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CogsTestModule],
        declarations: [SameCodeComponent],
        providers: []
      })
        .overrideTemplate(SameCodeComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SameCodeComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SameCodeService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new SameCode(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.sameCodes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
