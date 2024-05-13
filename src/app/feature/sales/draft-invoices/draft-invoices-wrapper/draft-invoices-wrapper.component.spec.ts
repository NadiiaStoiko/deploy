import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DraftInvoicesWrapperComponent } from './draft-invoices-wrapper.component';

describe('DraftInvoicesWrapperComponent', () => {
  let component: DraftInvoicesWrapperComponent;
  let fixture: ComponentFixture<DraftInvoicesWrapperComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DraftInvoicesWrapperComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DraftInvoicesWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
