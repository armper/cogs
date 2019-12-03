import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { CogsSharedModule } from 'app/shared/shared.module';
import { CogsCoreModule } from 'app/core/core.module';
import { CogsAppRoutingModule } from './app-routing.module';
import { CogsHomeModule } from './home/home.module';
import { CogsEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    CogsSharedModule,
    CogsCoreModule,
    CogsHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    CogsEntityModule,
    CogsAppRoutingModule
  ],
  declarations: [JhiMainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [JhiMainComponent]
})
export class CogsAppModule {}
