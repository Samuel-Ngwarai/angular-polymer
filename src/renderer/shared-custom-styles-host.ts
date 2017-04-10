import {Inject, Injectable, OnDestroy} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';

const Polymer: any = (<any>window).Polymer;

@Injectable()
export class SharedCustomStylesHost implements OnDestroy() {
    private _stylesSet = new Set<string>();
    private _customStyleNodes = new Set<Node>();

    constructor(@Inject(DOCUMENT) private _doc: any) {
    }

    addStyles(styles: string[]): void {
        styles.forEach(style => {
          if (!this._stylesSet.has(style)) {
              this._stylesSet.add(style);
              this._addStyleToDocument(style);
          }
        });
    }

    private _addStyleToDocument(style: string) {
        const customStyleEl = <Element>(<any>this._doc).createElement('style', 'custom-style');
        customStyleEl.textContent = style;
        Polymer.dom(this._doc.head).appendChild(customStyleEl);
        this._customStyleNodes.add(customStyleEl);
    }

    ngOnDestroy(): void {
        this._customStyleNodes.forEach(styleNode => Polymer.dom(Polymer.dom(styleNode).parentNode).removeChild(styleNode));
    }
}
