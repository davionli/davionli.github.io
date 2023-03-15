/*
 * File: my_game_draw.js 
 * This is the logic of our game. 
 */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

import MyGame from "./my_game_init.js";
import engine from "../engine/index.js";

MyGame.prototype.drawWorld = function(cam) {
        cam.setViewAndCameraMatrix();

        this.mBg.draw(cam);
}

MyGame.prototype.draw = function() {
        // Step A: clear the canvas
        engine.clearCanvas([1, 1, 1, 1]); // clear to light gray
        this.drawWorld(this.mCamera);
        //this.mZoomCams.draw();
        for (let i = 0; i < this.mPropertyRenderable.length; i++)
            this.mPropertyRenderable[i].draw(this.mCamera);
        this.mDialogSet[this.mCurDialog].draw(this.mCamera);
        if (this.mOptionSet[this.mCurDialog] !== null) {
            for (let i = 0; i < this.mOptionSet[this.mCurDialog].length; i++) {
                this.mOptionSet[this.mCurDialog][i].draw();
            }
        }
    }

export default MyGame;