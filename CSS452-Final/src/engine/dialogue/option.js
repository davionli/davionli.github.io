import engine from "../index.js";

class Option {
    constructor() {
        this.mTag = null;
        this.mOptionCam = null;
        this.mTextRenderable = null;
        this.mCamBg = null;
        this.mFuncName = null;
        this.mArguments = null;
        this.mAllowedClicked = null;
        this.mOptionGroup = null;
    }

    init(center, width, vp) {
        // let center = dc.Center;
        // let width = dc.Width;
        // let vp = dc.Viewport;
        this.mOptionCam = new engine.Camera( 
            vec2.fromValues(center[0], center[1]),
            width,                       
            vp           
        );
        this.mOptionCam.setBackgroundColor([1, 1, 0, 1]);
        this.mAllowedClicked = 1;
    }

    draw() {
        if (this.mAllowedClicked > 0) {
            this.mOptionCam.setViewAndCameraMatrix();
            this.mCamBg.draw(this.mOptionCam);
            this.mTextRenderable.draw(this.mOptionCam);
        }
    }

    update(myGame) {
        if(engine.input.isButtonClicked(engine.input.eMouseButton.eLeft)) {
            if (this.mOptionCam.isMouseInViewport() && this.mAllowedClicked > 0){
                if (this.mOptionGroup !== null) {
                    for (let i = 0; i < this.mOptionGroup.length; i++)
                        this.mOptionGroup[i].mAllowedClicked = 0;
                }
                else
                    this.mAllowedClicked--;
                this.execute(myGame);
            }
        }
    }

    execute(myGame) {
        let command = "this." + this.mFuncName;
        console.log(command, this.mArguments);
        // console.log(myGame.mCurDialog);
        eval(command)(myGame, this.mArguments);
        // this.executeFunctionByName(command, this.mArguments);
        // this.executeFunctionByName(this.mFuncName, this.mArguments);
    }

    setCurDialog(myGame, arg) {
        console.log("set current dialog to", arg);
        myGame.mCurDialog = arg[0];
    }

    modifyPropertyByName(myGame, arg) {
        console.log(arg);
        let index = myGame.mPropertyAttribute.indexOf(arg[0]);
        console.log(index);
        myGame.mProperty[index] += arg[1];
    }

    modifyPropertyByIndex(myGame, index, value) {
        myGame.mProperty[index] += value;
    }

    setPropertyByName(myGame, name, value) {
        let index = myGame.mPropertyAttribute.indexOf(name);
        myGame.mProperty[index] = value;
    }

    setPropertyByIndex(myGame, index, value) {
        myGame.mProperty[index] = value;
    }

    setOptionGroup(gp) {
        this.mOptionGroup = gp;
    }

    setClickRemaining(x) { this.mAllowedClicked = x;}

    setBackgroundTexture(bgTex) {
        this.mCamBg = new engine.TextureRenderable(bgTex); 
        this.mCamBg.getXform().setPosition(this.mOptionCam.getWCCenter()[0], this.mOptionCam.getWCCenter()[1]);
        this.mCamBg.getXform().setSize(this.mOptionCam.getWCWidth(), this.mOptionCam.getWCHeight());
    }

    setParagraph(p) {
        this.mTag = p;
        this.mTextRenderable = new engine.ParagraphRenderable(p);
        this.mTextRenderable.init();
        this.mTextRenderable.setColor([0, 0, 0, 1]);
        this.mTextRenderable.setTextHeight(2);
        this.mTextRenderable.setPosition(-5, 0);
        this.mTextRenderable.setLengthLimit(92);
        this.mTextRenderable.setPlayInterval(0);
    }

    setExecute(ex) {
        this.mFuncName = ex[0];
        this.mArguments = ex[1];
    }

    getCam() {
        return this.mOptionCam;
    }
    getTag() { return this.mTextRenderable; }
}
export default Option;