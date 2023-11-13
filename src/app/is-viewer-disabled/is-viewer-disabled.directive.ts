import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

@Directive({
  selector: '[isViewerDisabled]',
  providers: [MatTooltip],
})
export class IsViewerDisabledDirective {
  @Input() set isViewerDisabled(isDisabled: boolean) {
    isDisabled ? this.disableButton() : this.enableButton();
  }

  @Input() viewerTooltip: string = '';

  @HostListener('mouseover') mouseover() {
    this.matTooltip.show();
  }

  @HostListener('mouseleave') mouseleave() {
    this.matTooltip.hide();
  }

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private matTooltip: MatTooltip
  ) {
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'pointer-events',
      'visible'
    );
  }

  private enableButton(): void {
    this.matTooltip.disabled = true;
    this.renderer.removeAttribute(this.elementRef.nativeElement, 'disabled');
    this.renderer.removeStyle(this.elementRef.nativeElement, 'cursor');
  }

  private disableButton(): void {
    this.matTooltip.disabled = false;
    this.matTooltip.message = this.viewerTooltip;

    this.renderer.setAttribute(
      this.elementRef.nativeElement,
      'disabled',
      'true'
    );

    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'cursor',
      'not-allowed'
    );
  }
}
