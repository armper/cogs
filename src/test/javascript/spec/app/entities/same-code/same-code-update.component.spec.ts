import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { CogsTestModule } from '../../../test.module';
import { SameCodeUpdateComponent } from 'app/entities/same-code/same-code-update.component';
import { SameCodeService } from 'app/entities/same-code/same-code.service';
import { SameCode } from 'app/shared/model/same-code.model';

describe('Component Tests', () => {
  describe('SameCode Management Update Component', () => {
    let comp: SameCodeUpdateComponent;
    let fixture: ComponentFixture<SameCodeUpdateComponent>;
    let service: SameCodeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CogsTestModule],
        declarations: [SameCodeUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(SameCodeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SameCodeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SameCodeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new SameCode(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new SameCode();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
