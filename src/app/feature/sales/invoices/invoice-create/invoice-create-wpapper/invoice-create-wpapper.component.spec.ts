import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InvoiceCreateWpapperComponent } from './invoice-create-wpapper.component';

describe('InvoiceCreateWpapperComponent', () => {
  let component: InvoiceCreateWpapperComponent;
  let fixture: ComponentFixture<InvoiceCreateWpapperComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceCreateWpapperComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InvoiceCreateWpapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
