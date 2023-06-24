import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieAddPageComponent } from './movie-add-page.component';

describe('MovieAddPageComponent', () => {
  let component: MovieAddPageComponent;
  let fixture: ComponentFixture<MovieAddPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieAddPageComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MovieAddPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
