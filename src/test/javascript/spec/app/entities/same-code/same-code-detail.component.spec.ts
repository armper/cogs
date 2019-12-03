import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CogsTestModule } from '../../../test.module';
import { SameCodeDetailComponent } from 'app/entities/same-code/same-code-detail.component';
import { SameCode } from 'app/shared/model/same-code.model';

describe('Component Tests', () => {
  describe('SameCode Management Detail Component', () => {
    let comp: SameCodeDetailComponent;
    let fixture: ComponentFixture<SameCodeDetailComponent>;
    const route = ({ data: of({ sameCode: new SameCode(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CogsTestModule],
        declarations: [SameCodeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(SameCodeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SameCodeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.sameCode).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
