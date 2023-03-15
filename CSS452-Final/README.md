# CSS452 Final Project - API Documentation
This project is for the CSS 452 Final Project.

# Project Information
Project name: API Library for Dialogue Adventure System 
Authors: Barack, Davion
Advisor: Professor Kelvin
Date: March 14th, 2023

# Project Purpose
Our API library is designed to support game developers to design their dialogue games conveniently and fast. They basically needn’t make any modifications to the MyGame template which we provide. 

We support the automatic drawing of the dialogue system. We also enable game developers to provide different options for the game players. When players choose different options, the story can flow in different directions, hero attributes can be changed, or some special effect will happen.

All the work for the game developers is only to provide the picture resources in a JSON file. In this way, we humongously decrease the hardness to design a dialogue system. And the game developers can put most of their energy into writing the story, which is the core of this type of game.

# Dialogue Advanture System

Version 2.0 improved many features basing on the version 1.0. 
The major improvement is that it increases the flexiblitiy of the API.
1. Users can generate as many properties as they like instead of fiexed four properties.
2. Users can generate as many options as they like instead of fixed three options.
3. Users can hihglight words in the text with any colors using a six-digit hex number.
4. Users can adjust the speed of playing for the text.
5. We add a paragraph renderable to implement the features in 3 and 4. 
6. Users can easily add functions to modify some attributes in the engine and link with options. So players can execute the function by clicking options.
6. We made the project more organized for users.


## Dialog Class

**constructor()**<br>
Create the class and set all fields to null
```
constructor() {
    this.mDialogCam = null;
    this.mCamBg = null;
    this.mNameCam = null;
    this.mNameBg = null;
    this.mNameRenderable = null;
    this.mAvatar = null;
    this.mTextRenderable = null;
    this.mNextDialog = null;
    this.mHasEndTag = false;
}
```

**init(dc)**<br>
Create a Dialog camera for displying dialogs.

**draw(cam)**<br>
Draw the whole dialog class and all components inside the class, including avatar texture, dialog frame, name tag, and dialog texts.

**update(myGame)**<br>
Update game state when options and forwarding are trigged. Execute options' corresponding functions.

**setAvatar(avatar)**<br>
Set texture for dialog character.

**setName(name)**<br>
Set name for dialog speaker.

**setNameTexture(tex)**<br>
Set name camera background texture.

**resizeNameTexture()**<br>
Resize name camera background texture to fix its new size after changing it.

**setBackgroundTexture(bgTex)**<br>
Set background texture.

**setEndTag(b)**<br>
Set a end tag to a certain dialog to define the end of game. It stops the game going to the next dialog.

**setParagraph(p)**<br>
Set dialog text to a paragraph renderable.

**setWidth(w)**<br>
Set width for dialog frame camera.

**setViewport(vp)**<br>
Set viweport for dialog frame camera.

**setCenter(center)**<br>
Set center for dialog frame camera.

**getCam()**<br>
Return dialog frame camera.

**getParagraph()**<br>
Return paragraph renerable.

**getBg()**<br>
Return background texture renderable.

**getAvatar()**<br>
Return avatar texture renderable.

## Option Class

**constructor()**<br>
```
constructor() {
    this.mTag = null;
    this.mOptionCam = null;
    this.mTextRenderable = null;
    this.mCamBg = null;
    this.mFuncName = [];
    this.mArguments = [];
    this.mAllowedClicked = null;
    this.mOptionGroup = null;
}

```
**init(center, width, vp)**<br>
Initialize option cameras.

**setExecute(ex)**<br>
Set execute command to array.

**draw()**<br>
Draw options.

**update(myGame)**<br>
Update and call execute() function to execute command when options are clicked.

**execute(myGame)**<br>
Execute all functions for the clicked option.

**setCurDialog(myGame, arg)**<br>
Jump to another dialog by seting current dialog pointer.

**modifyPropertyByName(myGame, arg)**<br>
Modify values for property by passing its name and changing value.

**modifyPropertyByIndex(myGame, index, value)**<br>
Modify values for property by passing its index and changing value.

**setPropertyByName(myGame, name, value)**<br>
Set values for property by passing its name and value.

**setPropertyByIndex(myGame, index, value)**<br>
Set values for property by passing its index and  value.

**setOptionGroup(gp)**<br>
Set option group.

**setClickRemaining(x)**<br>
Set allowing clicking times.

**setBackgroundTexture(bgTex)**<br>
Set option background texture.

**setParagraph(p)**<br>
Set option text.

**getCam()**<br>
Return option camera.

**getTag()**<br>
Return option text string.

## JSON File Format

**Game**<br>
Game title, not necessary.

**Property**<br>
Array that contains all properies

**SceneSet**<br>
Array that contains all dialogs

**DialogIndex**<br>
Index of dialog.

**DialogCam**<br>
Parameters for dialog camera

**DialogTexture**<br>
Path of dialog frame texture.

**AvatarTexture**<br>
Path of avatar texture.

**NameString**<br>
Name string.

**DialogText**<br>
Dialog text content.

**Option**<br>
A couple options contents. If no options needed, do not set this field.

**Content**<br>
Array that contains all options.

**Tag**<br>
Display text for the option.

**Execute**<br>
Functions that trigged by the option.

**Position**<br>
First option's camera position.

**Layout**<br>
Layout for options to render.

**Spacing**<br>
Space between two options renderable.

**Relationship**<br>
Relationship of the option group. "Together" means users can only choose one option among all options. "Separate" means each option is independent.

**Example**
```json
{
    "Game": "CSS 452 Demo1",
    "Property": [
        {
            "Attribute": "Correct",
            "Value": 0
        },
        {
            "Attribute": "Wrong",
            "Value": 0
        }
    ],
    "SceneSet": [
        {
            "DialogIndex": 0,
            "Dialog": {
                "DialogCam": {
                    "Center": [50, 20],
                    "Width": 100,
                    "Viewport": [120, 20, 1500, 300]
                },
                "DialogTexture": "assets/texture1.png",
                "AvatarTexture": "assets/texture2.png",
                "NameString": "You",
                "DialogText": "Text"
            }
        },
        {   
            "DialogIndex": 1,
            "Dialog": {
                "DialogCam": {
                    "Center": [50, 20],
                    "Width": 100,
                    "Viewport": [120, 20, 1500, 300]
                },
                "DialogTexture": "assets/texture1.png",
                "AvatarTexture": "assets/texture2.png",
                "NameString": "Mr. Question",
                "DialogText": "Text"
            },
            "Option": {
                "Content": [
                    {
                        "Tag": "<#ffffff#>Yes",
                        "Execute": [["setCurDialog", [5]],["modifyPropertyByName", ["Correct", 1]]]
                    }
                ],
                "Position": [[0, 0], 20, [100, 800, 350, 100]],
                "Layout": "Vertical",
                "Spacing": 120,
                "Relationship": "Together"
            }
        }
    ]
}

```