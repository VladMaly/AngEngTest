import { Component, HostListener } from "@angular/core";
import { Button } from "./../interfaces/button";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.sass"]
})
export class AppComponent {
  buttonList: Button[] = [
    {
      buttonText: "Button A",
      buttonToolTipText: "This is Button A"
    },
    {
      buttonText: "Button B"
    }
  ];
  currentSelectedIndex: number;
  appContainer: string = "app-container";
  classesToLookFor: string[] = ["btn", "overhead-tooltip"];

  constructor() {
    this.resetSelected();
  }
  @HostListener("document:keydown", ["$event"])
  onKeydownHandler(event: KeyboardEvent) {
    if (event.key === "Escape") {
      this.resetSelected();
    }
  }
  @HostListener("click", ["$event.target"])
  onClick(elm: HTMLElement) {
    // console.log("Click");
    // console.log(elm);
    let elmCopy = elm;
    // check if elm is not empty
    if (elmCopy) {
      let isFoundClass = false;
      let isTraversedUpFinished = false;
      while (!isTraversedUpFinished) {
        // check if element indeed as classes.
        if (elmCopy.classList && elmCopy.classList.length > 0) {
          this.classesToLookFor.forEach(className => {
            if (elmCopy.classList.contains(className)) {
              isFoundClass = true;
              isTraversedUpFinished = true;
            }
          });
        }
        // Base case. Stop iterating upwards when have encountered the top most element present in angular app.
        if (elmCopy.classList.contains(this.appContainer)) {
          isTraversedUpFinished = true;
        }
        // Iterate upwards by replacing with the parent element, continue to check for classes.
        elmCopy = elmCopy.parentElement;
      }
      if (!isFoundClass) {
        this.resetSelected();
      }
      // ELSE do nothing here, let click even flow through.
    } else {
      this.resetSelected();
    }
  }
  resetSelected() {
    this.currentSelectedIndex = -1;
  }
  buttonClick(index: number) {
    // console.log(index);
    this.currentSelectedIndex = index;
  }
}
