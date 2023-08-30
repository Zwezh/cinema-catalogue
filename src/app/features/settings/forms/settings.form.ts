import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { SettingsDto } from '@appDTOs';

import { SettingsFormModel, SettingsValueModel } from '../models';

export class SettingsForm extends FormGroup<SettingsFormModel> {
  override value: SettingsValueModel;
  constructor(settings: SettingsDto) {
    super({
      id: new FormControl<string>(settings?.id, Validators.required),
      extension: new FormControl<string>(settings?.extension, Validators.required),
      genresForFilters: new FormArray<FormControl<string>>(convertFilterListToControls(settings)),
      language: new FormControl<string>(settings?.language, Validators.required),
      quality: new FormControl<string>(settings?.quality, Validators.required)
    });
    this.controls.language.disable();
  }

  addGenre(value?: string): void {
    this.controls.genresForFilters.push(new FormControl(value, Validators.required));
  }

  removeGenreById(index: number): void {
    this.controls.genresForFilters.removeAt(index);
  }
}

const convertFilterListToControls = (settings: SettingsDto): FormControl[] => {
  return settings?.genresForFilters?.map((genre: string) => new FormControl(genre, Validators.required)) || [];
};
