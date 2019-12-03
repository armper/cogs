import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { CogsTestModule } from '../../../test.module';
import { CogBroadcastRightsUpdateComponent } from 'app/entities/cog-broadcast-rights/cog-broadcast-rights-update.component';
import { CogBroadcastRightsService } from 'app/entities/cog-broadcast-rights/cog-broadcast-rights.service';
import { CogBroadcastRights } from 'app/shared/model/cog-broadcast-rights.model';

describe('Component Tests', () => {
  describe('CogBroadcastRights Management Update Component', () => {
    let comp: CogBroadcastRightsUpdateComponent;
    let fixture: ComponentFixture<CogBroadcastRightsUpdateComponent>;
    let service: CogBroadcastRightsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CogsTestModule],
        declarations: [CogBroadcastRightsUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(CogBroadcastRightsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CogBroadcastRightsUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CogBroadcastRightsService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new CogBroadcastRights(123);
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
        const entity = new CogBroadcastRights();
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
