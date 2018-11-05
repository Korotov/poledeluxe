import Swipe from './swiper.js';
export default class MobileMenu {
    constructor(options) {
        this.config = MobileMenu.mergeSettings(options);
        this.sidebarBox = typeof this.config.sidebarBox === 'string' ? document.querySelector(this.config.sidebarBox) : this.config.sidebarBox;
        this.sidebarBtn = typeof this.config.sidebarBtn === 'string' ? document.querySelector(this.config.sidebarBtn) : this.config.sidebarBtn;
        this.isOpen = this.sidebarBox.classList.contains(this.config.isActiveClassName);
    }

    static mergeSettings(options) {
        
        const settings = {
            sidebarBox : '.mobilemenu',
            sidebarBtn : '.hamburger',
            isActiveClassName: 'is-active',
            pageWrapper: '.wrapper',
        };

        const userSttings = options;
        for (const attrname in userSttings) {
          settings[attrname] = userSttings[attrname];
        }

        return settings;
    }
    open(){
        if (!this.isOpen) {
            this.sidebarBox.classList.add(this.config.isActiveClassName);
            this.sidebarBtn.classList.add(this.config.isActiveClassName);
            this.isOpen = true;
        }
    }    
    close(){
        if (this.isOpen) {
            this.sidebarBox.classList.remove(this.config.isActiveClassName);
            this.sidebarBtn.classList.remove(this.config.isActiveClassName);
            this.isOpen = false;
        }
    }
    toggle() {
        if (this.isOpen)
                this.close();
        else    this.open();

    }
    activate() {
        this.sidebarBtn.addEventListener('click', event => {this.toggle()});
        window.addEventListener('keydown', event => {
            if (this.isOpen && event.keyCode === 27) this.close();
        });
        let swiper = new Swipe('.wrapper');
        swiper.onLeft(() => {this.open()});
        swiper.onRight(() => {this.close()});
        swiper.run();
    }
}

