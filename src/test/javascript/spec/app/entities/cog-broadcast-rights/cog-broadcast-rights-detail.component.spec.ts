import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CogsTestModule } from '../../../test.module';
import { CogBroadcastRightsDetailComponent } from 'app/entities/cog-broadcast-rights/cog-broadcast-rights-detail.component';
import { CogBroadcastRights } from 'app/shared/model/cog-broadcast-rights.model';

describe('Component Tests', () => {
  describe('CogBroadcastRights Management Detail Component', () => {
    let comp: CogBroadcastRightsDetailComponent;
    let fixture: ComponentFixture<CogBroadcastRightsDetailComponent>;
    const route = ({ data: of({ cogBroadcastRights: new CogBroadcastRights(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CogsTestModule],
        declarations: [CogBroadcastRightsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CogBroadcastRightsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CogBroadcastRightsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.cogBroadcastRights).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
