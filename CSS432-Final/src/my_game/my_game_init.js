/*
 * File: my_game_init.js 
 * This is the logic of our game. 
 */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

import engine from "../engine/index.js";

class MyGame extends engine.Scene {
    constructor() {
        super();

        //Load transparency
        this.kTrans = "assets/transparency.png";

        //Load resources 1
        this.kBg = "assets/bg_1.png";
        this.kAvatar = "assets/avatar_1.png";
        this.kTextBg = "assets/dialogueFrame_1.png";
        this.kNameBg = "assets/dialogueFrame_1.png";
        this.kNameText = "Kid";
        this.kDialogueText = "Welcome to the world of Qi.";

       //Load resources 2
       this.kBg2 = "assets/bg_2.png";
       this.kAvatar2 = "assets/avatar_2.png";
       this.kTextBg2 = "assets/dialogueFrame_2.png";
       this.kNameBg2 = "assets/dialogueFrame_2.png";
       this.kNameText2 = "Didi";
       this.kDialogueText2 = "I have waited for 100 years.";      
       
       //Load resources 3
       this.kBg3 = "assets/bg_3.png";
       this.kAvatar3 = "assets/avatar_3.png";
       this.kTextBg3 = "assets/dialogueFrame_3.png";
       this.kNameBg3 = "assets/dialogueFrame_3.png";
       this.kNameText3 = "Pikachu";
       this.kDialogueText3 = "Do you want to be my master?";          

        this.kJSONSceneFile = "./assets/The_Miraculous_Journey_of_a_Adventurer.json";
        this.kTestJson = "./assets/Test.json";

        // Init main camera
        this.mCamera = null;

        //Init dialogue counter
        this.mCounter = 0;

        //Init transparency
        this.mTrans = null;

        //Init dialogue system 1
        this.mBg = null;
        this.mAvatar = null;
        this.mTextBg = null;
        this.mNameBg = null;
        this.mDialogueText = null;
        this.mNameText = null;

        this.mDialogue = null;

        //Init dialogue system 2
        this.mBg2 = null;
        this.mAvatar2 = null;
        this.mTextBg2 = null;
        this.mNameBg2 = null;
        this.mDialogueText2 = null;
        this.mNameText2 = null;        
        
        this.mDialogue2 = null;

        //Init dialogue system 3
        this.mBg3 = null;
        this.mAvatar3 = null;
        this.mTextBg3 = null;
        this.mNameBg3 = null;
        this.mDialogueText3 = null;
        this.mNameText3 = null;        
        
        this.mDialogue3 = null;        

        //Init dialogue system set
        this.mDialogueSet = [];
        this.mDialogSet = [];
        this.mCurDialog = null;
        this.mOptionSet = [];
        this.mOption = null;
        
        this.mAttack = null;
        this.mDefend = null;
        this.mHealth = null;
        this.mQi = null;
        this.mPropertyAttribute = [];
        this.mProperty = [];
        this.mPropertyRenderable = [];
    }


    load() {
        //Load resources 1
        engine.texture.load(this.kBg);
        engine.texture.load(this.kAvatar);
        engine.texture.load(this.kTextBg);

        //Load resources 2
        engine.texture.load(this.kBg2);
        engine.texture.load(this.kAvatar2);
        engine.texture.load(this.kTextBg2);        
        
        //Load resources 3
        engine.texture.load(this.kBg3);
        engine.texture.load(this.kAvatar3);
        engine.texture.load(this.kTextBg3);   

        //Load Json file
        engine.json.load(this.kJSONSceneFile);
        engine.json.load(this.kTestJson);
        //Load transparency
        engine.texture.load(this.kTrans);
    }

    unload() {
        //Unload resources 1
        engine.texture.unload(this.kBg);
        engine.texture.unload(this.kAvatar);
        engine.texture.unload(this.kTextBg);

        //Unload resources 2
        engine.texture.unload(this.kBg2);
        engine.texture.unload(this.kAvatar2);
        engine.texture.unload(this.kTextBg2);

        //Unload resources 3
        engine.texture.unload(this.kBg3);
        engine.texture.unload(this.kAvatar3);
        engine.texture.unload(this.kTextBg3);

        //Unload Json
        engine.json.unload(this.kJSONSceneFile);
        engine.json.unload(this.kTestJson);

        //Unload transparency
        engine.json.unload(this.kTrans);
    }

    init() {
        this.mCamera = new engine.Camera(
            vec2.fromValues(89, 50),   
            // center of the camera is (89, 50)
            178,                       
            // width of camera is 178, height is 100
            [0, 0, 1780, 1000]           
            // left lower corner of viewport is (0,0)
            //viewport resolution is (1780, 1000)
        );
        this.mCamera.setBackgroundColor([1, 1, 1, 1]);

        //Large background image
        let bgR = new engine.TextureRenderable(this.kBg); 
        bgR.getXform().setSize(178, 100);
        bgR.getXform().setPosition(89, 50);
        this.mBg = new engine.GameObject(bgR);
        
        //Parse Json
        // let sceneInfo = engine.json.get(this.kJSONSceneFile);
        let sceneFile = engine.json.get(this.kTestJson);
        // this._parseDialogues(sceneInfo);
        
        this._parseScene(sceneFile);
        this.mCurDialog = 0;

    }


 

    _parseScene(sceneFile) {
        for (let i = 0; i < sceneFile.Property.length; i++) {
            this.mPropertyAttribute[i] = sceneFile.Property[i].Attribute;
            this.mProperty[i] = sceneFile.Property[i].Value;
            let str = this.mPropertyAttribute[i] + ": " + this.mProperty[i];
            this.mPropertyRenderable[i] = new engine.FontRenderable(str);
            this.mPropertyRenderable[i].setColor([1, 0, 0, 1]);
            this.mPropertyRenderable[i].getXform().setPosition(140, 95-5*i);
            this.mPropertyRenderable[i].setTextHeight(3);
        }
        console.log(this.mPropertyAttribute, this.mProperty);
        for (let i = 0; i < sceneFile.SceneSet.length; i++) {
            let dialogInfo = sceneFile.SceneSet[i].Dialog;
            let dialog = new engine.Dialog();
            dialog.init(dialogInfo.DialogCam);
            dialog.setBackgroundTexture(dialogInfo.DialogTexture);
            dialog.setAvatar(dialogInfo.AvatarTexture);
            dialog.setName(dialogInfo.NameString);
            // console.log(info.DialogText);
            dialog.setParagraph(dialogInfo.DialogText);
            this.mDialogSet.push(dialog);

            if (sceneFile.SceneSet[i].hasOwnProperty("Option")) {
                let optionInfo = sceneFile.SceneSet[i].Option;
                let layout = optionInfo.Layout === "Vertical" ? true : false;
                console.log(layout);
                let options = [];
                for (let j = 0; j < optionInfo.Content.length; j++) {
                    let delta = optionInfo.Spacing;
                    let center = optionInfo.Position[0];
                    let width = optionInfo.Position[1];
                    let vp = optionInfo.Position[2];
                    let _vp = [...vp];
                    console.log(vp);
                    if (layout) {
                        // console.log(vp[1],"-", j,"*",delta);
                        _vp[1] = vp[1] - (j * delta);
                    }
                    else 
                        _vp[0] = vp[0] + (j * delta);
                    // console.log(optionInfo.Content[j].Tag);
                    console.log(j, _vp);
                    let op = new engine.Option();
                    op.init(center, width, _vp);
                    op.setBackgroundTexture(this.kTextBg);
                    op.setParagraph(optionInfo.Content[j].Tag);
                    op.setExecute(optionInfo.Content[j].Execute);
                    options.push(op);
                    // console.log(op);
                }
                if (optionInfo.Relationship === "Together") {
                    for (let j = 0; j < options.length; j++)
                        options[j].setOptionGroup(options);
                }
                this.mOptionSet.push(options);
            }
            else
                this.mOptionSet.push(null);
        }
    }


       // _parseDialogues(sceneInfo){
    //     let i;
    //     let dialogueSet = [];

    //     for(i = 0; i< sceneInfo.DialogueSet.length; i++){
    //         dialogueSet[i] = new engine.Dialogue(this.kBg, this.kAvatar, this.kTextBg, this.kNameText, this.kDialogueText);

    //         dialogueSet[i].setLargeBg(sceneInfo.DialogueSet[i].LargeBg);
    //         dialogueSet[i].setAvatar(sceneInfo.DialogueSet[i].Avatar);
    //         dialogueSet[i].setTextBg(sceneInfo.DialogueSet[i].TextBg);
    //         dialogueSet[i].setNameBg(sceneInfo.DialogueSet[i].NameBg);
    //         dialogueSet[i].setNameText(sceneInfo.DialogueSet[i].NameText);
    //         dialogueSet[i].setDialogueText(sceneInfo.DialogueSet[i].DialogueText[0], sceneInfo.DialogueSet[i].DialogueText[1], sceneInfo.DialogueSet[i].DialogueText[2]);

    //         this.mDialogueSet.push(dialogueSet[i]);
    //     }
    // }
}

export default MyGame;