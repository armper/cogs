import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CogsTestModule } from '../../../test.module';
import { CogBroadcastRightsDeleteDialogComponent } from 'app/entities/cog-broadcast-rights/cog-broadcast-rights-delete-dialog.component';
import { CogBroadcastRightsService } from 'app/entities/cog-broadcast-rights/cog-broadcast-rights.service';

describe('Component Tests', () => {
  describe('CogBroadcastRights Management Delete Component', () => {
    let comp: CogBroadcastRightsDeleteDialogComponent;
    let fixture: ComponentFixture<CogBroadcastRightsDeleteDialogComponent>;
    let service: CogBroadcastRightsService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CogsTestModule],
        declarations: [CogBroadcastRightsDeleteDialogComponent]
      })
        .overrideTemplate(CogBroadcastRightsDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CogBroadcastRightsDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CogBroadcastRightsService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
