import { AfterViewInit, Directive, ElementRef, HostListener, Input, Renderer2 } from "@angular/core";

@Directive({
    selector: '[highlight]'
})

export class HighlightDirective implements AfterViewInit {

    @Input() color = 'yellow'; 

    constructor(private el: ElementRef, private renderer: Renderer2){}

    ngAfterViewInit(): void {
        this.setBackGroundColor(this.color);
    }

    setBackGroundColor(color: string): void {
        this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', color);
    }

    @HostListener('mouseenter') onMouseEnter(): void {
        this.setBackGroundColor('lightgreen');

    }

    @HostListener('mouseleave') onMouseLeave(): void {
        this.setBackGroundColor(this.color);
    }

    @HostListener('click') onClick(): void {
        this.color = 'lightgreen';

    }

}