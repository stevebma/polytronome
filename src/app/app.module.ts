import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { BarComponent } from './bar/bar.component';
import { BeatComponent } from './beat/beat.component';
import { LayerComponent } from './layer/layer.component';
import { NoteLengthChooserComponent } from './note-length-chooser/note-length-chooser.component';
import { TimeSignatureComponent } from './time-signature/time-signature.component';
import { LayerNotationComponent } from './layer-notation/layer-notation.component';
import { SingleNoteComponent } from './single-note/single-note.component';
import { VoicesComponent } from './voices/voices.component';

@NgModule({
  declarations: [
    AppComponent,
    BarComponent,
    BeatComponent,
    LayerComponent,
    NoteLengthChooserComponent,
    TimeSignatureComponent,
    LayerNotationComponent,
    SingleNoteComponent,
    VoicesComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
