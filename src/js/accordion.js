export default class Accordion {
	constructor(settings) {
		this.config = Accordion.mergeSettings(settings);
		// Resolve selectors's types
    	this.buttonSelector = typeof this.config.buttonSelector === 'string' ? document.querySelectorAll(this.config.buttonSelector) : this.config.buttonSelector;
    	this.panelSelector = typeof this.config.panelSelector === 'string' ? document.querySelectorAll(this.config.panelSelector) : this.config.panelSelector;
	    // Early throw if selector doesn't exists
	    if (this.buttonSelector === null || this.panelSelector === null) {
	      throw new Error('Accordion: Something wrong with your selector(s) 😭');
		}
		// Apply accordion
		this.init();
	}

	static mergeSettings(options) {
		
		const settings = {
			buttonSelector : '.accordion',
			panelSelector : '.panel',
			visibleDisplay: 'block',
			animate: true,
		};

		const userSttings = options;
	    for (const attrname in userSttings) {
	      settings[attrname] = userSttings[attrname];
	    }

		return settings;
	}
	 /**
	   * Builds the markup and attaches listeners to required events.
	   */
	init() {
		let config = this.config;
		let btns = this.buttonSelector;
		let panels = this.panelSelector;
		for (let i = 0; i < btns.length; i++) {
		    btns[i].addEventListener("click", function() {
		        /* Toggle between adding and removing the "active" class,
		        to highlight the button that controls the panel */
		        this.classList.toggle("active");


		        /* Toggle between hiding and showing the active panel */
		        let panel = panels[i];
		        if (config.animate){
		        	if (panel.style.maxHeight) {
		        		panel.style.maxHeight = null;
		        	} else {
		        		panel.style.maxHeight = panel.scrollHeight + "px";
		        	}
		        }
		        else {	
			        if (panel.style.display != "none") {
			            panel.style.display = "none";
			        } else {
			            panel.style.display = config.visibleDisplay;
			        }
		    	}
		    });
		} 
	}
}
