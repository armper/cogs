import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CogsTestModule } from '../../../test.module';
import { SameCodeDeleteDialogComponent } from 'app/entities/same-code/same-code-delete-dialog.component';
import { SameCodeService } from 'app/entities/same-code/same-code.service';

describe('Component Tests', () => {
  describe('SameCode Management Delete Component', () => {
    let comp: SameCodeDeleteDialogComponent;
    let fixture: ComponentFixture<SameCodeDeleteDialogComponent>;
    let service: SameCodeService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CogsTestModule],
        declarations: [SameCodeDeleteDialogComponent]
      })
        .overrideTemplate(SameCodeDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SameCodeDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SameCodeService);
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
