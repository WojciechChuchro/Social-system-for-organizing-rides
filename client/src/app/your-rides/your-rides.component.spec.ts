import { ComponentFixture, TestBed } from '@angular/core/testing'

import { YourRidesComponent } from './your-rides.component'

describe('YourRidesComponent', () => {
  let component: YourRidesComponent
  let fixture: ComponentFixture<YourRidesComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YourRidesComponent]
    })
    fixture = TestBed.createComponent(YourRidesComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
