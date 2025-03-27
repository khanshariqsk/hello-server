import { createRoot, Root } from 'react-dom/client';
import React from 'react';

import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import JsonEditor from './JsonEditor';

@Component({
  selector: 'editor',
  imports: [],
  templateUrl: './editor.component.html',
})
export class EditorComponent {
  private reactRoot: Root | null = null;
  private container: HTMLElement | null = null;

  containerClassName: string = '';
  constructor(private elementRef: ElementRef) {
    this.containerClassName = this.generateRandomClassName(
      'json-editor-container'
    );
  }

  ngAfterViewInit() {
    this.renderReactComponent();
  }

  generateRandomClassName(prefix: string = 'myclass'): string {
    const randomString =
      Math.random().toString(36).substring(2, 8) +
      Math.random().toString(36).substring(2, 8);

    return `${prefix}-${randomString}`;
  }

  renderReactComponent(): void {
    this.container = this.elementRef.nativeElement.querySelector(
      `#${this.containerClassName}`
    );
    if (this.container) {
      this.reactRoot = createRoot(this.container);
      this.reactRoot.render(this.createReactElement());
    }
  }

  createReactElement() {
    return React.createElement(JsonEditor);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['src'] && !changes['src']?.firstChange) {
      if (this.reactRoot) {
        this.reactRoot.render(this.createReactElement());
      }
    }
  }

  ngOnDestroy() {
    if (this.reactRoot) {
      this.reactRoot.unmount();
    }
  }
}
