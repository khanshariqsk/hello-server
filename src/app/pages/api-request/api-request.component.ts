import { Component } from '@angular/core';

import { NgIcon, provideIcons } from '@ng-icons/core';

import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';

import { BrnMenuTriggerDirective } from '@spartan-ng/brain/menu';
import {
  HlmMenuComponent,
  HlmMenuItemDirective,
} from '@spartan-ng/ui-menu-helm';

import { lucideChevronDown, lucideTrash2 } from '@ng-icons/lucide';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UrlsParamsHeaderTableComponent } from '../../components/urls-params-header-table/urls-params-header-table.component';
import { EditorComponent } from '../../components/editor/editor.component';

type RequestType =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'PATCH'
  | 'DELETE'
  | 'HEAD'
  | 'OPTIONS';

type RequestTypeObj = {
  method: RequestType;
  color: string;
};

type TabName = 'Params' | 'Headers' | 'Body';

interface Tab {
  name: TabName;
  count: number;
  active: boolean;
}

export interface RequestParamsHeader {
  key: string;
  value: string;
  checked: boolean;
}

export type RequestHeaderType = 'param' | 'header';

export interface EmitData {
  queryParam: string;
  data: RequestParamsHeader[];
}

@Component({
  selector: 'app-api-request',
  imports: [
    BrnMenuTriggerDirective,
    HlmMenuComponent,
    HlmMenuItemDirective,
    HlmButtonDirective,
    NgIcon,
    CommonModule,
    HlmInputDirective,
    FormsModule,
    UrlsParamsHeaderTableComponent,
    EditorComponent,
  ],
  providers: [provideIcons({ lucideChevronDown, lucideTrash2 })],
  templateUrl: './api-request.component.html',
})
export class ApiRequestComponent {
  requestTypesObj: RequestTypeObj[] = [
    { method: 'GET', color: '#28a745' },
    { method: 'POST', color: '#f0ad4e' },
    { method: 'PUT', color: '#007bff' },
    { method: 'PATCH', color: '#6f42c1' },
    { method: 'DELETE', color: '#d9534f' },
    { method: 'HEAD', color: '#5bc0de' },
    { method: 'OPTIONS', color: '#fd7e14' },
  ];

  tabData: Tab[] = [
    { name: 'Params', count: 0, active: false },
    { name: 'Headers', count: 0, active: false },
    { name: 'Body', count: 0, active: true },
  ];

  paramsData: RequestParamsHeader[] = [{ key: '', value: '', checked: false }];

  headersData: RequestParamsHeader[] = [{ key: '', value: '', checked: false }];

  currentRequestTypeObj: RequestTypeObj = this.requestTypesObj[0];

  urlInputValue: string = 'http://localhost:4200/api-request';

  activeTabItem: Tab = this.tabData[2];

  updateRequestType(requestTypeObj: RequestTypeObj): void {
    this.currentRequestTypeObj = requestTypeObj;
  }

  handleTabChange(tabName: string): void {
    this.tabData.forEach((tab) => {
      if (tab.name === tabName) {
        tab.active = true;
        this.activeTabItem = tab;
      } else {
        tab.active = false;
      }
    });
  }

  updateParamData(updatedData: EmitData): void {
    this.urlInputValue =
      this.getBaseUrlFromUrl(this.urlInputValue) + updatedData.queryParam;

    this.paramsData = updatedData.data;
  }
  updateHeaderData(updatedData: EmitData): void {
    this.headersData = updatedData.data;
  }

  getBaseUrlFromUrl(fullUrl: string): string {
    const url = new URL(fullUrl);
    return url.origin + url.pathname;
  }

  onUrlChange(): void {
    const url = new URL(this.urlInputValue);
    const updatedParamsData: RequestParamsHeader[] = [];

    url.searchParams.forEach((value, key) => {
      updatedParamsData.push({
        key,
        value,
        checked: true,
      });
    });

    const lastParamData: RequestParamsHeader | undefined =
      this.paramsData.pop();
    if (lastParamData && !lastParamData?.checked) {
      updatedParamsData.push(lastParamData);
    }

    this.paramsData = updatedParamsData;
  }
}
