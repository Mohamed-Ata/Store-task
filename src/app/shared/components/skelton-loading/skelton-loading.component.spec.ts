import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeltonLoadingComponent } from './skelton-loading.component';

describe('SkeltonLoadingComponent', () => {
  let component: SkeltonLoadingComponent;
  let fixture: ComponentFixture<SkeltonLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeltonLoadingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SkeltonLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
