import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CogsTestModule } from '../../../test.module';
import { CogBroadcastRightsComponent } from 'app/entities/cog-broadcast-rights/cog-broadcast-rights.component';
import { CogBroadcastRightsService } from 'app/entities/cog-broadcast-rights/cog-broadcast-rights.service';
import { CogBroadcastRights } from 'app/shared/model/cog-broadcast-rights.model';

describe('Component Tests', () => {
  describe('CogBroadcastRights Management Component', () => {
    let comp: CogBroadcastRightsComponent;
    let fixture: ComponentFixture<CogBroadcastRightsComponent>;
    let service: CogBroadcastRightsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CogsTestModule],
        declarations: [CogBroadcastRightsComponent],
        providers: []
      })
        .overrideTemplate(CogBroadcastRightsComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CogBroadcastRightsComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CogBroadcastRightsService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new CogBroadcastRights(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.cogBroadcastRights[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
