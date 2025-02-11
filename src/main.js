import Toastify from '../lib/toastify.js';
import ToastifyCSS from '../lib/toastify.css' with { type: "css" };

document.adoptedStyleSheets = [ ToastifyCSS ];

var menuObj = null;
var currentPath = null;

class Menu {
    constructor() {
        this.listener = null;
        this.popupListener = null;
        this.ele = null;
    };

    async createToast(text, onClick = function(){}) {
        this.createCSS();

        Toastify({
            text,
            duration: 3000,
            close: false,
            gravity: "top",
            position: "center",
            stopOnFocus: true,
            style: {
              background: "#fff",
              color: "rgb(91 91 91)",
              fontWeight: "lighter",
              letterSpacing: "-0.05em",
              borderRadius: "10px",
            },
            onClick 
        }).showToast();
    };

    async createPrompt(msg = "Enter text", placeholder = "", defaultValue = "") {
        // TODO
        this.createCSS();

        if ( document.querySelector("#popup") ) return defaultValue;

        // Menu creation
        const menuContainer = document.createElement("div");
        menuContainer.style.position = "fixed";
        menuContainer.style.top = "0";
        menuContainer.style.left = "0";
        menuContainer.style.width = "100%";
        menuContainer.style.height = "100%";
        menuContainer.style.background = "rgb(0 0 0 / 70%)";

        menuContainer.style.opacity = "0";
        menuContainer.style.transition = "all 0.2s";

        const menu = document.createElement("div");
        menu.id = "popup";
        menu.style.position = "fixed";
        menu.style.top = "50%";
        menu.style.left = "50%";
        menu.style.transform = "translate(-50%, -50%)";
        menu.style.width = "450px";
        menu.style.height = "250px";

        menu.style.borderRadius = "10px";
        menu.style.background = "#fff";

        const header = document.createElement("div");
        header.style.textAlign = "center";
        header.style.width = "100%";
        header.style.height = "50px";
        header.style.fontSize = "50px";
        header.style.color = "rgb(91 91 91)";
        header.style.fontWeight = "lighter";
        header.style.textTransform = "uppercase";
        header.style.letterSpacing = "-0.05em";
        header.style.marginTop = "20px";
        header.style.marginBottom = "20px";
        header.innerText = "prompt";

        const message = document.createElement("div");
        message.style.textAlign = "center";
        message.style.width = "100%";
        message.style.height = "50px";
        message.style.fontSize = "20px";
        message.style.color = "rgb(91 91 91)";
        message.style.fontWeight = "lighter";
        message.style.textTransform = "uppercase";
        message.style.letterSpacing = "-0.05em";
        message.style.marginTop = "20px";
        message.style.marginBottom = "20px";
        message.innerText = msg;

        menu.appendChild(header);
        menu.appendChild(message);

        menuContainer.appendChild(menu);
        document.body.appendChild(menuContainer);

        setTimeout(() => menuContainer.style.opacity = "1", 100);
        WebStation.music.playSFX("select.mp3");
    };

    async createConfirm(msg = "Are you sure?", agreeTxt = "Ok", declineTxt = "Cancel") {
        this.createCSS();

        if ( document.querySelector("#popup") ) return declineTxt;

        // Menu creation
        const menuContainer = document.createElement("div");
        menuContainer.style.position = "fixed";
        menuContainer.style.top = "0";
        menuContainer.style.left = "0";
        menuContainer.style.width = "100%";
        menuContainer.style.height = "100%";
        menuContainer.style.background = "rgb(0 0 0 / 70%)";

        menuContainer.style.opacity = "0";
        menuContainer.style.transition = "all 0.2s";

        const menu = document.createElement("div");
        menu.id = "popup";
        menu.style.position = "fixed";
        menu.style.top = "50%";
        menu.style.left = "50%";
        menu.style.transform = "translate(-50%, -50%)";
        menu.style.width = "450px";
        menu.style.height = "250px";

        menu.style.borderRadius = "10px";
        menu.style.background = "#fff";

        const header = document.createElement("div");
        header.style.textAlign = "center";
        header.style.width = "100%";
        header.style.height = "50px";
        header.style.fontSize = "50px";
        header.style.color = "rgb(91 91 91)";
        header.style.fontWeight = "lighter";
        header.style.textTransform = "uppercase";
        header.style.letterSpacing = "-0.05em";
        header.style.marginTop = "20px";
        header.style.marginBottom = "20px";
        header.innerText = "confirm";

        const message = document.createElement("div");
        message.style.textAlign = "center";
        message.style.width = "100%";
        message.style.height = "50px";
        message.style.fontSize = "20px";
        message.style.color = "rgb(91 91 91)";
        message.style.fontWeight = "lighter";
        message.style.textTransform = "uppercase";
        message.style.letterSpacing = "-0.05em";
        message.style.marginTop = "20px";
        message.style.marginBottom = "20px";
        message.innerText = msg;

        const footer = document.createElement("div");
        footer.style.display = "flex";
        footer.style.gap = "20px";
        footer.style.justifyContent = "center";
        footer.style.textAlign = "center";
        footer.style.width = "100%";
        footer.style.height = "20px";
        footer.style.fontSize = "20px";
        footer.style.color = "rgb(123 123 123)";
        footer.style.fontWeight = "lighter";
        footer.style.textTransform = "uppercase";
        footer.style.letterSpacing = "-0.05em";
        footer.style.marginTop = "35px";
        footer.style.position = "fixed";
        footer.style.bottom = "15px";
        footer.id = "help-bar-item";
        footer.innerHTML = `<div>
        <object type="image/svg+xml" data="/api/theme/assets/help/button_a.svg"
        onload="this.parentNode.replaceChild(this.contentDocument.documentElement, this);">
        </object>
        <a>${agreeTxt}</a>
    </div>
    
    <div>
        <object type="image/svg+xml" data="/api/theme/assets/help/button_b.svg"
        onload="this.parentNode.replaceChild(this.contentDocument.documentElement, this);">
        </object>
        <a>${declineTxt}</a>
    </div>`;

        menu.appendChild(header);
        menu.appendChild(message);
        menu.appendChild(footer);

        menuContainer.appendChild(menu);
        document.body.appendChild(menuContainer);

        setTimeout(() => menuContainer.style.opacity = "1", 100);
        WebStation.music.playSFX("select.mp3");

        var scope = this;
        return new Promise((resolve, reject) => {
            scope.popupListener = (e) => {
                if ( e.code == "KeyZ" ) {
                    WebStation.music.playSFX("select.mp3");
                    menuContainer.style.opacity = "0";
                    setTimeout(() => document.querySelector("#popup").parentElement.remove(), 300);
                    resolve(true);
                };
                if ( e.code == "KeyX" ) {
                    WebStation.music.playSFX("back.mp3");
                    menuContainer.style.opacity = "0";
                    setTimeout(() => document.querySelector("#popup").parentElement.remove(), 300);
                    resolve(false);
                };
    
                removeEventListener("keydown", scope.popupListener);
            };
            addEventListener("keydown", scope.popupListener);
        });
    };

    async createAlert(msg = "Are you sure?", okTxt = "Ok") {
        this.createCSS();

        if ( document.querySelector("#popup") ) return true;

        // Menu creation
        const menuContainer = document.createElement("div");
        menuContainer.style.position = "fixed";
        menuContainer.style.top = "0";
        menuContainer.style.left = "0";
        menuContainer.style.width = "100%";
        menuContainer.style.height = "100%";
        menuContainer.style.background = "rgb(0 0 0 / 70%)";

        menuContainer.style.opacity = "0";
        menuContainer.style.transition = "all 0.2s";

        const menu = document.createElement("div");
        menu.id = "popup";
        menu.style.position = "fixed";
        menu.style.top = "50%";
        menu.style.left = "50%";
        menu.style.transform = "translate(-50%, -50%)";
        menu.style.width = "450px";
        menu.style.height = "250px";

        menu.style.borderRadius = "10px";
        menu.style.background = "#fff";

        const header = document.createElement("div");
        header.style.textAlign = "center";
        header.style.width = "100%";
        header.style.height = "50px";
        header.style.fontSize = "50px";
        header.style.color = "rgb(91 91 91)";
        header.style.fontWeight = "lighter";
        header.style.textTransform = "uppercase";
        header.style.letterSpacing = "-0.05em";
        header.style.marginTop = "20px";
        header.style.marginBottom = "20px";
        header.innerText = "alert";

        const message = document.createElement("div");
        message.style.textAlign = "center";
        message.style.width = "100%";
        message.style.height = "50px";
        message.style.fontSize = "20px";
        message.style.color = "rgb(91 91 91)";
        message.style.fontWeight = "lighter";
        message.style.textTransform = "uppercase";
        message.style.letterSpacing = "-0.05em";
        message.style.marginTop = "20px";
        message.style.marginBottom = "20px";
        message.innerText = msg;

        const footer = document.createElement("div");
        footer.style.textAlign = "center";
        footer.style.width = "100%";
        footer.style.height = "20px";
        footer.style.fontSize = "20px";
        footer.style.color = "rgb(123 123 123)";
        footer.style.fontWeight = "lighter";
        footer.style.textTransform = "uppercase";
        footer.style.letterSpacing = "-0.05em";
        footer.style.marginTop = "35px";
        footer.style.position = "fixed";
        footer.style.bottom = "15px";
        footer.id = "help-bar-item";
        footer.innerHTML = `<div>
        <object type="image/svg+xml" data="/api/theme/assets/help/button_a.svg"
        onload="this.parentNode.replaceChild(this.contentDocument.documentElement, this);">
        </object>
        <a>${okTxt}</a>
    </div>`;

        menu.appendChild(header);
        menu.appendChild(message);
        menu.appendChild(footer);

        menuContainer.appendChild(menu);
        document.body.appendChild(menuContainer);

        setTimeout(() => menuContainer.style.opacity = "1", 100);
        WebStation.music.playSFX("select.mp3");

        var scope = this;
        return new Promise((resolve, reject) => {
            scope.popupListener = (e) => {
                if ( e.code == "KeyZ" ) {
                    WebStation.music.playSFX("select.mp3");
                    menuContainer.style.opacity = "0";
                    setTimeout(() => document.querySelector("#popup").parentElement.remove(), 300);
                    resolve(true);
                };
    
                removeEventListener("keydown", scope.popupListener);
            };
            addEventListener("keydown", scope.popupListener);
        });
    };

    createItem(option, item) {
        const value = item.value;
        const name = document.createElement("div");
        name.innerText = item.name;

        name.style.fontSize = "25px";
        name.style.color = "rgb(135 135 135)";
        name.style.fontWeight = "lighter";
        name.style.textTransform = "uppercase";
        name.style.letterSpacing = "-0.05em";
        name.style.marginLeft = "10px";

        option.appendChild(name);

        const type = item.type;

        switch ( type ) {
            case "link":
                var action = document.createElement("i");
                action.className = `actionIcon fa-solid fa-chevron-right`;

                action.style.marginLeft = "auto";
                action.style.marginRight = "10px";
                action.style.color = "rgb(135 135 135)";
                action.style.fontSize = "25px";

                option.appendChild(action);
                break;
            case "switch":
                var action = document.createElement("i");
                action.className = `actionIcon fa-regular ${value == true ? "fa-square-check" : "fa-square"}`;

                action.style.marginLeft = "auto";
                action.style.marginRight = "10px";
                action.style.color = "rgb(135 135 135)";
                action.style.fontSize = "25px";

                option.appendChild(action);
                break;
            case "selection":
                var leftArrow = document.createElement("i");
                leftArrow.className = `actionIcon fa-solid fa-caret-left`;

                leftArrow.style.marginLeft = "auto";
                leftArrow.style.color = "rgb(135 135 135)";
                leftArrow.style.fontSize = "25px";

                option.appendChild(leftArrow);

                var currentSel = document.createElement("i");
                currentSel.className = `actionIcon`;

                currentSel.style.marginLeft = "10px";
                currentSel.style.marginRight = "10px";
                currentSel.style.color = "rgb(135 135 135)";
                currentSel.style.fontSize = "25px";

                currentSel.innerText = Object.keys(value)[ Object.values(value).indexOf(true) ];

                option.appendChild(currentSel);

                var rightArrow = document.createElement("i");
                rightArrow.className = `actionIcon fa-solid fa-caret-right`;

                rightArrow.style.marginRight = "10px";
                rightArrow.style.color = "rgb(135 135 135)";
                rightArrow.style.fontSize = "25px";

                option.appendChild(rightArrow);
                break;
            case "function":
                break;
        };
    };

    createCSS() {
        // Selection CSS
        if ( !document.querySelector("head #menu-css") ) {
            const menuCSS = document.createElement("style");
            menuCSS.id = "menu-css";
            menuCSS.innerText = `#menu .selected {
                background: rgb(135 135 135) !important;
            }
            
            #menu .selected > div, #menu .selected .actionIcon {
                color: #fff !important;
            }

            #popup #help-bar-item > div {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 5px;
                height: 100%;
            }

            #popup #help-bar-item > div > svg {
                height: 20px;
                width: 20px;
                filter: invert(1) opacity(0.5);
            }

            #popup #help-bar-item > div > a {
                color: rgb(91, 91, 91);
                font-weight: lighter;
                letter-spacing: -0.05em;
                text-transform: uppercase;
                font-size: 20px;
            }`;

            document.head.appendChild(menuCSS);
        };
    };

    getChildren(path, optionsObj) {
        let currentChildren = optionsObj.filter((e, index) => index > 1);
        let headerTxt = optionsObj[0];
        let footerTxt = optionsObj[1];

        let pathArr = path.split('/');
        //for (let i = 1; i < pathArr.length; i++) {
        for (const i in pathArr) {
            if( pathArr[i] ){
                for (const folder in optionsObj) {
                    if( optionsObj[folder].name == pathArr[i] ){
                        headerTxt = optionsObj[folder].children[0];
                        footerTxt = optionsObj[folder].children[1];
                        currentChildren = optionsObj[folder].children.filter((e, index) => index > 1);
                        break;
                    };
                };
            };
        };

        return {
            currentChildren,
            headerTxt,
            footerTxt
        };
    };

    createMenu(hide, optionsObj, path = "/", selectI = 0) {
        this.createCSS();

        if ( document.querySelector("#menu") ) document.querySelector("#menu").parentElement.remove();

        menuObj = optionsObj;
        currentPath = path;

        // Menu creation
        const menuContainer = document.createElement("div");
        menuContainer.style.position = "fixed";
        menuContainer.style.top = "0";
        menuContainer.style.left = "0";
        menuContainer.style.width = "100%";
        menuContainer.style.height = "100%";
        menuContainer.style.background = "rgb(0 0 0 / 70%)";

        menuContainer.style.opacity = hide ? "0" : "1";
        menuContainer.style.transition = "all 0.2s";

        const menu = document.createElement("div");
        menu.id = "menu";
        menu.style.position = "fixed";
        menu.style.top = "50%";
        menu.style.left = "50%";
        menu.style.transform = "translate(-50%, -50%)";
        menu.style.width = "650px";
        menu.style.height = "500px";

        menu.style.borderRadius = "10px";
        menu.style.background = "#fff";

        // Custom options
        const options = document.createElement("div");
        options.style.width = "100%";
        options.style.height = "350px";

        const { currentChildren, headerTxt, footerTxt } = this.getChildren(path, optionsObj);

        const header = document.createElement("div");
        header.style.textAlign = "center";
        header.style.width = "100%";
        header.style.height = "50px";
        header.style.fontSize = "50px";
        header.style.color = "rgb(91 91 91)";
        header.style.fontWeight = "lighter";
        header.style.textTransform = "uppercase";
        header.style.letterSpacing = "-0.05em";
        header.style.marginTop = "20px";
        header.style.marginBottom = "20px";
        header.innerText = headerTxt || "menu";

        for (const optionObj of currentChildren) {
            const option = document.createElement("div");
            option.setAttribute("path", path);

            option.style.display = "flex";
            option.style.alignItems = "center";
            option.style.width = "100%";
            option.style.height = "48px";
            if( currentChildren.indexOf(optionObj) == 0 ) option.style.borderTop = "1px solid rgb(223 223 223)";
            option.style.borderBottom = "1px solid rgb(223 223 223)";

            if ( currentChildren.indexOf(optionObj) == selectI ) option.classList.add("selected");

            this.createItem(option, optionObj);

            options.appendChild(option);
        };

        const footer = document.createElement("div");
        footer.style.textAlign = "center";
        footer.style.width = "100%";
        footer.style.height = "20px";
        footer.style.fontSize = "20px";
        footer.style.color = "rgb(123 123 123)";
        footer.style.fontWeight = "lighter";
        footer.style.textTransform = "uppercase";
        footer.style.letterSpacing = "-0.05em";
        footer.style.marginTop = "35px";
        footer.innerText = footerTxt || "";

        // Final step
        menu.appendChild(header);
        menu.appendChild(options);
        menu.appendChild(footer);
        menuContainer.appendChild(menu);
        document.body.appendChild(menuContainer);

        this.ele = menuContainer;

        hide == true ? WebStation.music.playSFX("select.mp3") : null;
    };

    open() {
        WebStation.blockControls = true;
        this.ele.style.opacity = "1";
        this.listener = (e) => {
            if ( e.code == "Space" ) this.close();

            this.handleKeys(e);
        };
        addEventListener("keydown", this.listener);
    };

    close() {
        if ( this.listener !== null ) removeEventListener("keydown", this.listener);
        this.ele.style.opacity = "0";
        WebStation.blockControls = false;
    };

    handleKeys(e) {
        var selected = document.querySelector("#menu .selected");
        var menuList = Array.prototype.slice.call( document.querySelector("#menu").childNodes[1].childNodes );
        var currentI = menuList.indexOf(selected);
        
        switch ( e.code ) {
            case "ArrowUp":
                if ( !selected.previousElementSibling ) return;
                selected.previousElementSibling.classList.add("selected");
                selected.classList.remove("selected");
                WebStation.music.playSFX("navigate.mp3");
                break;
            case "ArrowDown":
                if ( !selected.nextElementSibling ) return;
                selected.nextElementSibling.classList.add("selected");
                selected.classList.remove("selected");
                WebStation.music.playSFX("navigate.mp3");
                break;

            case "ArrowLeft":
                var { currentChildren, headerTxt, footerTxt } = this.getChildren(currentPath, menuObj);
                var currentJson = currentChildren.find(e => e.name == selected.firstElementChild.innerText.toLowerCase());
                
                var type = currentJson.type;

                if ( type == "selection") {
                    WebStation.music.playSFX("navigate.mp3");
                    var currentSelectedIndex = Object.values(currentJson.value).indexOf(true);
                    var newIndex = currentSelectedIndex - 1;

                    if ( newIndex < 0 ) newIndex = Object.keys(currentJson.value).length - 1;
                    if ( newIndex > Object.keys(currentJson.value).length - 1 ) newIndex = 0;

                    var nameForCurrentIndex = Object.keys(currentJson.value)[currentSelectedIndex];
                    var nameForNewIndex = Object.keys(currentJson.value)[newIndex];
                    
                    currentJson.value[ nameForCurrentIndex ] = false;
                    currentJson.value[ nameForNewIndex ] = true;

                    this.createMenu(false, menuObj, currentPath, currentI)
                };
                break;
            case "ArrowRight":
                var { currentChildren, headerTxt, footerTxt } = this.getChildren(currentPath, menuObj);
                var currentJson = currentChildren.find(e => e.name == selected.firstElementChild.innerText.toLowerCase());
                
                var type = currentJson.type;

                if ( type == "selection") {
                    WebStation.music.playSFX("navigate.mp3");
                    var currentSelectedIndex = Object.values(currentJson.value).indexOf(true);
                    var newIndex = currentSelectedIndex + 1;

                    if ( newIndex < 0 ) newIndex = Object.keys(currentJson.value).length - 1;
                    if ( newIndex > Object.keys(currentJson.value).length - 1 ) newIndex = 0;

                    var nameForCurrentIndex = Object.keys(currentJson.value)[currentSelectedIndex];
                    var nameForNewIndex = Object.keys(currentJson.value)[newIndex];
                    
                    currentJson.value[ nameForCurrentIndex ] = false;
                    currentJson.value[ nameForNewIndex ] = true;

                    this.createMenu(false, menuObj, currentPath, currentI)
                };
                break;
            case "KeyZ":
                var { currentChildren, headerTxt, footerTxt } = this.getChildren(currentPath, menuObj);
                var currentJson = currentChildren.find(e => e.name == selected.firstElementChild.innerText.toLowerCase());
                
                var type = currentJson.type;
                
                switch ( type ) {
                    case "link":
                        WebStation.music.playSFX("select.mp3");
                        this.createMenu(false, menuObj, currentPath + selected.firstElementChild.innerText.toLowerCase() + "/")
                        break;
                    case "switch":
                        if ( currentJson.value == true ) currentJson.value = false;
                        else if ( currentJson.value == false ) currentJson.value = true;
                        WebStation.music.playSFX("checkbox.mp3");
                        this.createMenu(false, menuObj, currentPath, currentI)
                        break;
                    case "selection":
                        break;
                    case "function":
                        WebStation.music.playSFX("select.mp3");
                        currentJson.value();
                        break;
                };
                break;
            case "KeyX":
                WebStation.music.playSFX("back.mp3");
                if ( currentPath == "/" ) {
                    this.close();
                } else {
                    let pathArr = currentPath.slice(0, -1).split("/");
                    pathArr.pop();
                    this.createMenu(false, menuObj, `${ pathArr.join("/") }/`);
                };
                break;
        };
    };
};

export default Menu;
