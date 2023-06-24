import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailsRawContentComponent } from './movie-details-raw-content.component';

describe('MovieDetailsRawContentComponent', () => {
  let component: MovieDetailsRawContentComponent;
  let fixture: ComponentFixture<MovieDetailsRawContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MovieDetailsRawContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieDetailsRawContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
