import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesListPageComponent } from 'src/app/modules/movies/pages/movies-list-page/movies-list-page.component';

describe('MoviesListPageComponent', () => {
  let component: MoviesListPageComponent;
  let fixture: ComponentFixture<MoviesListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoviesListPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviesListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
