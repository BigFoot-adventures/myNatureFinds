import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appAppendHtml]'
})
export class AppendHtmlDirective {
  @Input() appAppendHtml: string|undefined;
  constructor(private el: ElementRef<HTMLDivElement>, private render: Renderer2) {}

  ngOnInit():void {
    if(this.appAppendHtml)
      this.el.nativeElement.innerHTML=this.appAppendHtml;
  }

}
