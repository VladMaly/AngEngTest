import { Button } from "./../../interfaces/button";
import {
  Component,
  OnInit,
  Input,
  ElementRef,
  ViewChild,
  HostListener
} from "@angular/core";

@Component({
  selector: "app-tooltip",
  templateUrl: "./tooltip.component.html",
  styleUrls: ["./tooltip.component.sass"]
})
export class TooltipComponent implements OnInit {
  @Input() button: Button;
  @Input() index: number;
  @Input() currIndex: number;
  // @Input() isPositionBelow: Boolean;
  @ViewChild("toolTip") toolTipView: ElementRef;
  isPositionBelow: boolean = false;
  currentScrollEvent = -1;

  constructor() {}

  ngOnInit() {
    console.log(this.isPositionBelow);
    console.log(this.index);
    console.log(this.currIndex);
  }
  ngOnChanges(changes) {
    if (changes && changes.currIndex) {
      this.isPositionBelow = false;
    }
  }
  // @HostListener("window:resize", ["$event"])
  @HostListener("window:scroll", ["$event"])
  onResizeOrScroll(event) {
    // if (this.elementInViewport(this.toolTipView.nativeElement)) {
    if (this.isInViewport(this.toolTipView.nativeElement)) {
      // this.isPositionBelow = false;
    } else {
      this.isPositionBelow = true;
    }
  }
  isInViewport(elem) {
    var bounding = elem.getBoundingClientRect();
    // console.log(bounding);
    return (
      bounding.top >= 0 &&
      bounding.left >= 0 &&
      bounding.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      bounding.right <=
        (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  // elementInViewport(el) {
  //   var top = el.offsetTop;
  //   var left = el.offsetLeft;
  //   var width = el.offsetWidth;
  //   var height = el.offsetHeight;

  //   while (el.offsetParent) {
  //     el = el.offsetParent;
  //     top += el.offsetTop;
  //     left += el.offsetLeft;
  //   }

  //   return (
  //     top >= window.pageYOffset &&
  //     left >= window.pageXOffset &&
  //     top + height <= window.pageYOffset + window.innerHeight &&
  //     left + width <= window.pageXOffset + window.innerWidth
  //   );
  // }
  clickEvent() {
    // console.log("Click event.");
    // console.log(this.toolTipView);
    // console.log(this.isInViewport(this.toolTipView.nativeElement));
    // console.log(this.toolTipView.nativeElement.offsetHeight);
    // console.log(this.toolTipView.nativeElement.offsetTop);
  }
}
