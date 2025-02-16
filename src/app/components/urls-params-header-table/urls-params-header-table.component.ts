import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIcon } from '@ng-icons/core';
import {
  EmitData,
  RequestHeaderType,
  RequestParamsHeader,
} from '../../pages/api-request/api-request.component';

import { HlmCheckboxComponent } from '@spartan-ng/ui-checkbox-helm';

@Component({
  selector: 'app-urls-params-header-table',
  imports: [NgIcon, CommonModule, FormsModule, HlmCheckboxComponent],
  templateUrl: './urls-params-header-table.component.html',
})
export class UrlsParamsHeaderTableComponent {
  @Input() data: RequestParamsHeader[] = [];
  @Input() title: string = '';
  @Input() type: RequestHeaderType = 'param';
  @Output() dataChange = new EventEmitter<EmitData>();

  isGlobalChecked: boolean = false;

  changeGlobalCheckHandler(): void {
    if (this.isGlobalChecked) {
      this.data.forEach((param) => (param.checked = true));
    } else {
      this.data.forEach((param) => (param.checked = false));
    }
    this.dataChange.emit(this.emitData());
  }

  changeLocalCheckHandler(paramItem: RequestParamsHeader): void {
    this.dataChange.emit(this.emitData());
  }

  updateParamHeaderItem(
    paramItem: RequestParamsHeader,
    paramItemIndex: number
  ): void {
    this.data[paramItemIndex].checked = true;
    if (paramItemIndex === this.data.length - 1) {
      this.data.push({
        checked: false,
        key: '',
        value: '',
      });
    }
    this.dataChange.emit(this.emitData());
  }

  removeParamHeaderItem(paramItemIndex: number): void {
    if (this.data.length === 1) return;
    this.data.splice(paramItemIndex, 1);
    this.dataChange.emit(this.emitData());
  }

  emitData(): EmitData {
    if (this.type === 'param') {
      return {
        queryParam: this.generateUrl(),
        data: this.data,
      };
    } else {
      return {
        queryParam: '',
        data: this.data,
      };
    }
  }

  generateUrl(): string {
    const urlParams = new URLSearchParams();
    let foundCheck = false;

    this.data.forEach((param) => {
      if (param.checked) {
        foundCheck = true;
        urlParams.append(param.key, param.value);
      }
    });

    if (foundCheck) {
      return `?${urlParams.toString()}`;
    }

    return '';
  }
}
