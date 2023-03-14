/*
 * File: my_game_update.js 
 * This is the logic of our game. 
 */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

import engine from "../engine/index.js";
import MyGame from "./my_game_draw.js";

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame.prototype.update = function () {
    //Left mouse botton click

    // this.mCurDialog = Math.min(this.mDialogSet[this.mCurDialog].update(this.mCurDialog), this.mDialogSet.length-1);
    this.mDialogSet[this.mCurDialog].update(this);
    // if(engine.input.isButtonClicked(engine.input.eMouseButton.eLeft)) {
    //     console.log(this.mDialogCam.isMouseInViewport(), this.mCurDialog);
    //     if (this.mDialogCam.isMouseInViewport())
    //         this.mCurDialog++;
    // }

    for (let i = 0; i < this.mPropertyRenderable.length; i++) {
        let str = this.mPropertyAttribute[i] + ": " + this.mProperty[i];
        this.mPropertyRenderable[i].setText(str);
    }

    if (this.mOptionSet[this.mCurDialog] !== null) {
        for (let i = 0; i < this.mOptionSet[this.mCurDialog].length; i++) {
            this.mOptionSet[this.mCurDialog][i].update(this);
        }
    }
    
    // if(engine.input.isButtonClicked(engine.input.eMouseButton.eLeft)){
    //     if(this.mCounter < this.mDialogueSet.length){
    //         this.mDialogueSet[this.mCounter].mVisible = true;
    //         if(this.mCounter - 1 >= 0){
    //             this.mDialogueSet[this.mCounter - 1].mVisible = false;
    //         }

    //         this.mCounter += 1;
    //     }
    // }
}

export default MyGame;