module MixEmpty {
    export class WeixinErweima {
        private _x:number = 0;
        private _y:number = 0;
        private _width:number = 0;
        private _height:number = 0;
        private _src:string = "";

        private _scaleMode:string;
        private _stageSize:any;
        private _stageW:number;
        private _stageH:number;
        private _windowW:number;
        private _windowH:number;
        private _displayH:number;
        private _displayW:number;
        private _designH:number;
        private _designW:number;

        private _iframeWrapper:HTMLDivElement = null;
        private _img:HTMLIFrameElement = null;

        public constructor(){
            this._scaleMode = MixApp.AppMain.Stage.scaleMode;

            var stageDelegateDom:HTMLElement = document.getElementById("StageDelegateDiv");
            var playerContainer:HTMLElement = stageDelegateDom.parentElement;

            var iframeWrapperDom = document.getElementById("iframe-wrapper");
            if (!iframeWrapperDom) {
                iframeWrapperDom = document.createElement("div");
                iframeWrapperDom.style.display = "inline";
                iframeWrapperDom.style.visibility = "hidden";
                iframeWrapperDom.attributes['style'].value += 'position:absolute;-webkit-overflow-scrolling: touch;overflow-y: scroll;';//解决iframe在ios下的显示问题
                iframeWrapperDom.id = "iframe-wrapper";
                stageDelegateDom.appendChild(iframeWrapperDom);
            }
            this._iframeWrapper = <HTMLDivElement>iframeWrapperDom;
            this._iframeWrapper.style.display = "inline";


            var iframe = document.createElement("img"), t = new Date().getTime();
            iframe.id = "webview-img-" + t;
            iframe.name = "webview-img-" + t;
//            iframe.scrolling = "no";
            iframe.style.position = "absolute";
            iframe.style.top = "0";
            iframe.style.left = "0";
            //iframe.style.opacity = "0";
            iframe.style.display = 'inline';
            iframe.style.visibility = 'hidden';
//            iframe.frameBorder = '0';
            iframe.border = "0";
            this._iframeWrapper.appendChild(iframe);

            this._img = <HTMLIFrameElement>document.getElementById("webview-img-" + t);

            this._stageW = MixApp.AppMain.Stage.stageWidth;
            this._stageH = MixApp.AppMain.Stage.stageHeight;
            this._windowW = window.innerWidth;
            this._windowH = window.innerHeight;
            this._designH = parseInt(playerContainer.attributes['data-content-height'].value);
            this._designW = parseInt(playerContainer.attributes['data-content-width'].value);

            this._stageSize = new egret.sys.ScreenAdapter().calculateStageSize(MixApp.AppMain.Stage.scaleMode, this._windowW, this._windowH, this._designW, this._designH);
            this._displayH = this._stageSize.displayHeight;
            this._displayW = this._stageSize.displayWidth;

            //console.log("windowW:" + this._windowW);
            //console.log("stageW:" + this._stageW);
            //console.log("disPlayW:" + this._displayW);
            //console.log("windowH:" + this._windowH);
            //console.log("stageH:" + this._stageH);
            //console.log("displayH:" + this._displayH);
            //console.log("size:" , this._stageSize);
        }

        public show():void {
            if(this.isDestroy){
                this._iframeWrapper.appendChild(this._img);
            }

            this._img.style.visibility = 'visible';
            this._iframeWrapper.style.visibility = 'visible';
        }

        private isDestroy:boolean;
        public destroy():void {
            if (this._img) {
                this._img.style.visibility = 'hidden';
                this._iframeWrapper.style.visibility = "hidden";
                this._iframeWrapper.removeChild(this._img);
                this.isDestroy = true;
            }
        }

        public get width():number {
            return this._width;
        }

        public set width(value:number) {
            this._width = value;
            var pro:number = value/this._stageW;
            var wid:number = Math.floor(pro*this._displayW);

            this._iframeWrapper.style.width = wid + "px";
            this._img.style.width = wid + "px";
        }

        public get height():number {
            return this._height;
        }

        public set height(value:number) {
            this._height = value;
            var pro:number = value/this._stageH;
            var height:number = pro*this._displayH;
            this._iframeWrapper.style.height = height + "px";
            this._img.style.height = height + "px";
        }

        public set x(value:number) {
            this._x = value;
            if (this._scaleMode == egret.StageScaleMode.FIXED_WIDTH || this._scaleMode == egret.StageScaleMode.FIXED_HEIGHT) {
                this._iframeWrapper.style.left = this._x / this._stageW * this._windowW + "px";
            }
            if (this._scaleMode == egret.StageScaleMode.SHOW_ALL || this._scaleMode == egret.StageScaleMode.NO_BORDER) {
                if (this._windowW == this._displayW) {
                    this._iframeWrapper.style.left = this._x / this._stageW * this._windowW + "px";
                } else {
                    this._iframeWrapper.style.left = this._x / this._stageW * this._displayW + "px";
                }
            }
        }

        public set y(value:number) {
            this._y = value;
            if (this._scaleMode == egret.StageScaleMode.FIXED_WIDTH || this._scaleMode == egret.StageScaleMode.FIXED_HEIGHT) {
                this._iframeWrapper.style.top = this._y / this._stageH * this._windowH + "px";
            }
            if (this._scaleMode == egret.StageScaleMode.SHOW_ALL || this._scaleMode == egret.StageScaleMode.NO_BORDER) {
                if (this._windowH == this._displayH) {
                    this._iframeWrapper.style.top = this._y / this._stageH * this._windowH + "px";
                } else {
                    this._iframeWrapper.style.top = this._y / this._stageH * this._displayH + "px";
                }
            }
        }

        public get x():number {
            return this._x;
        }

        public get y():number {
            return this._y;
        }

        public get src():string {
            return this._src;
        }

        public set src(value:string) {
            this._src = value;
            this._img.src = this._src;
        }
    }
}