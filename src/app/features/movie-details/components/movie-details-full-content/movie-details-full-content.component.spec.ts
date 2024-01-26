import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailsFullContentComponent } from './movie-details-full-content.component';

describe('MovieDetailsFullContentComponent', () => {
  let component: MovieDetailsFullContentComponent;
  let fixture: ComponentFixture<MovieDetailsFullContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieDetailsFullContentComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MovieDetailsFullContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
