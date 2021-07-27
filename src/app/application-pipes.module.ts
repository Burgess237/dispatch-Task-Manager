import { FilterPipe } from './filter.pipe';
import { NgModule } from '@angular/core';


@NgModule({
    imports: [
      // dep modules
    ],
    declarations: [
      FilterPipe
    ],
    exports: [
      FilterPipe
    ]
  })
  export class ApplicationPipesModule {}
