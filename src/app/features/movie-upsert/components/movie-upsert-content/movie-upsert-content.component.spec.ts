import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieUpsertContentComponent } from './movie-upsert-content.component';

describe('MovieUpsertContentComponent', () => {
  let component: MovieUpsertContentComponent;
  let fixture: ComponentFixture<MovieUpsertContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieUpsertContentComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MovieUpsertContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
