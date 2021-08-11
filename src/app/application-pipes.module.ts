import { FilterPipe } from './filter.pipe';
import { NgModule } from '@angular/core';
import { FactPipe } from './fact.pipe';


@NgModule({
    imports: [
      // dep modules
    ],
    declarations: [
      FilterPipe,
      FactPipe
    ],
    exports: [
      FilterPipe,
      FactPipe
    ]
  })
  export class ApplicationPipesModule {}
