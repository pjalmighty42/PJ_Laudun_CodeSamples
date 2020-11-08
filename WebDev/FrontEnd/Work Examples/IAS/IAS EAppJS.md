# Insurance Administrative Solutions
### EAppJS Javascript/JQuery Library work

#### Explaination
This was was a framework that was created while working at Insurance Administrative Solutions as a front-end/ReactJS, UI/UX, developer. This was library was created as a result of the company needing business-facing application for data-entry of various umbrella clients/companies under their company. 

#### Issue
This needed to work with older technology stack (ASP MVC 4), as such I couldn't use a more modern approach like I did for their ReactJS client-facing application.

#### Requirements
Because of this, this solution need to:
1. Mimmick the dynamic nature of the ReactJS client-side 
2. Use the same API for questions on the form as for the ReactJS client-side
3. But be a strictly JS/JQuery-based solution because of the limitation of the tech-stack

#### Solution
The solution that I came up with was to figure out and mimmic the basic premise of how React functions. To basically take in the API list of any size of controls (a JSON list), and dynamically allow for the creation of the various controls to show on the fly. This is a posting of this for my portfolio/resume. Feel free to look it over! It is unfinished at the moment, but I am actually doing some of the updates that I wanted to do to this (before I was let go).

##### Key Points
- This application will take an AJAX (JQuery AJAX) call from a Controller Action, and get a list of JSON objects.
- I will take the passed in list and go to the "ControlObjectsMainController" function within "ControlObjects.js"
- This basically work as a switch-board that takes the object and based on the type (controlType var) and the sub-type (dataType) decypher and output a control to the page
- Like React, I have a variation of it, as the list of html data created (the HTML output of the controls), will be appended to whatever is the passed in bodyID using JQuery.
- Initally was started as a way to make basic control inputs available (I.E.- Inputs, Radios, Dropdowns), but the company at the time wanted to use it for other projects (which fell through with new leadership, so I'm posting this here for my portfolio/resume).

#### Technologies Used
- ES 6+
- JQuery
- Bootstrap
- SCSS/SASS for the CSS
- Built within a .Net enviorment
