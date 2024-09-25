class HolisticTracking {

	constructor(dynamicData = false, trackingData = false) {
		window.dataLayer = window.dataLayer || [];
		this.dynamicData = window.dynamicData || {};
		this.trackingData = trackingData;
		this.devMode = window.devMode || false;

		this.addEventListeners();
		this.getChannelGrouping();
		this.landingPageView();
		this.newsletterRegistration();
		this.companyPageView();
	}

	// Event Listeners

	addEventListeners() {
		// ISIN Copy Button
		this.copyEvents('isin', 'ISIN');

		// WKN Copy Button
		this.copyEvents('wkn', 'WKN');

		// Symbol Copy Button
		this.copyEvents('symbol', 'Symbol');

		// Company Copy Button
		this.copyEvents('brand', 'brand');

		// Overlay Click Event
		this.clickEvents('#overlay', {
			"eventCategory": "Analyse",
			"eventAction": "company_overlay",
			"audience": "mid_intent"
		});

		// Press Release Click Event
		this.clickEvents('[data-id="pressrelease"]', {
			"eventAction": "press_release_teaser_click",
			"brand": this.dynamicData.brand,
			"audience": "mid_intent"
		})

		// Article Click Event
		this.clickEvents('[data-articlelink]', {
			"eventAction": "article_teaser_click",
			"brand": this.dynamicData.brand,
			"audience": "low_intent"
		})

		// Research Click Event
		this.clickEvents('[data-id="research"]', {
			"eventAction": "research_teaser_click",
			"brand": this.dynamicData.brand,
			"audience": "mid_intent"
		})

		// Company Link Click Event
		this.clickEvents('[data-id="companylink"]', {
			"eventAction": "company_portrait_click",
			"brand": this.dynamicData.brand,
			"audience": "high_intent"
		})

		// Investorenpräsentation Click event
		this.clickEvents('[data-id="presentation"]', {
			"eventAction": "unternhemenspraesentation",
			"brand": this.dynamicData.brand,
			"audience": "high_intent"
		})
		// Investorenpräsentation Click event
		this.clickEvents('[linktype="presentation"]', {
			"eventAction": "unternhemenspraesentation",
			"brand": this.dynamicData.brand,
			"audience": "high_intent"
		})

		// Breadcrumb Click Event
		this.plainClickEvents('[data-breadcrumb]', {
			"event": "dynamic_event",
			"event_name": "breadcrumb_click",
			"level": this.dynamicData.breadcrumb,
			"event_cluster": "click",
			"categroy": this.dynamicData.category,	
			"brand": this.dynamicData.brand,
			"event_audience": "low_intent"
		}, 'level', 'data-breadcrumb')

		// NavBar Click Event
		this.navClickEvents('nav a')

		this.clickOutEvents('[data-clickout=""]', {
			"eventAction": "click_out",
			"audience": "low_intent"
		})

		this.clickOutEvents('[data-clickout="finanz-link"]', {
			"eventAction": "click_out_finanzseite",
			"audience": "high_intent"
		})

		this.clickOutEvents('[data-clickout="broker-link"]', {
			"eventAction": "click_out_broker",
			"audience": "high_intent"
		})

		this.clickOutEvents('[data-clickout="social-link"]', {
			"eventAction": "click_out_social",
			"audience": "high_intent"
		})
	}

	// Comnpay Landing Page View

	landingPageView() {

		if (!this.dynamicData) return;

		const data = {
			'event': 'dynamic_event',
			'event_name': 'company_angezeigt',
			'name': this.dynamicData.company,
			'WKN': this.dynamicData.wkn,
			'kurs': this.dynamicData.currentShare,
			'branche': this.dynamicData.branche,
			'brand': this.dynamicData.brand,
			'event_cluster': 'info',
		}

		this.pushEvent(data)

	}
	// Compay Portrait View

	companyPageView() {

		if (!this.dynamicData || !this.dynamicData.isCompany) return;

		const data = {
			'event': 'dynamic_event',
			'event_name': 'company_portrait_angezeigt',
			'company': this.dynamicData.company,
			'WKN': this.dynamicData.wkn,
			'brand': this.dynamicData.brand,
			'event_cluster': 'behavior',
			'event_audience': 'mid_intent',
		}

		this.pushEvent(data)

	}

	// Newsletter Registration

	newsletterRegistration() { 

		if (!this.trackingData) return
		
		this.pushEvent({
			'event': 'dynamic_event',
			'event_name': this.trackingData.event,
			'brand': this.trackingData.brand,
			'event_cluster': 'newsletter',
			'event_audience': 'high_intent',
		})

	}

	// Nav Click Event

	navClickEvents(selector) { 
		const items = document.querySelectorAll(`${selector}`);
		items.forEach(link => {
			link.addEventListener('click', (e) => {				
				this.pushEvent({
					"event": "dynamic_event",
					"event_name": "navbar_click",
					"brand": this.dynamicData.brand,
					"event_cluster": "click",
					"event_audience": "mid_intent",
					"url": e.target.href,	
					"click_text": e.target.innerText,
				})					
				
			})
		})
	
	}

	directClickEvents(data) {
		this.pushEvent({
			"event": "dynamic_event",
			"event_name": data.eventAction,
			"brand": data.brand,
			"company": this.dynamicData.company,
			"WKN": this.dynamicData.wkn,
			"event_cluster": "click",
			"event_audience": data.audience ? data.audience : "low_intent",
		})
	 }


	clickOutEvents(selector, data) { 
		const items = document.querySelectorAll(`${selector}`);
		items.forEach(link => {
			link.addEventListener('click', (e) => {
				this.pushEvent({
					"event": "dynamic_event",
					"event_name": data.eventAction,
					"brand": this.dynamicData.brand,
					"company": this.dynamicData.company,
					"placement": link.dataset.placement,
					"WKN": this.dynamicData.wkn,
					"event_cluster": "click",
					"event_audience": data.audience ? data.audience : "low_intent",
				})
			})
		})
	}

	// Plain Click Event

	plainClickEvents(selector, data, extraData = false, extraDataValue = false) { 
		const items = document.querySelectorAll(`${selector}`);
		items.forEach(link => {
			link.addEventListener('click', (e) => {
				if (extraData === false) {
					this.pushEvent(data)
					
				} else { 
					this.pushEvent({
						...data,
						[extraData]: link.getAttribute(extraDataValue),
					})
					
				}
			})
		})
	
	}

	// Click Events

	clickEvents(selector, data) {
		const clickTriggers = document.querySelectorAll(`${selector}`);
		clickTriggers.forEach(trigger => {
			trigger.addEventListener('click', (e) => {
				this.pushEvent({
					"event": "dynamic_event",
					"event_name": data.eventAction,
					"brand": data.brand,
					"company": this.dynamicData.company,
					"WKN": this.dynamicData.wkn,
					"url": e.target.href,
					"event_cluster": "click",
					"event_audience": data.audience ? data.audience : "low_intent",
				});
			});
		});
	}

	copyEvents(type, labelType = 'ISIN') {
		const buttons = document.querySelectorAll(`a[data-copy="${type}"]`);
		buttons.forEach(button => {
			button.addEventListener('click', (e) => {
				this.pushEvent(this.copyEventData(this.dynamicData[type], this.dynamicData.brand, `copy_${type}`, button.dataset.place, labelType));
			});
		});
	}

	

	copyEventData(value, brand, action, placement, labelType = 'ISIN') {

		return {
			'event': 'dynamic_event',
			'event_name': action,
			[labelType]: value,
			'placement': placement,
			'brand': brand,
			'event_cluster': 'copy',
			'event_audience': 'high_intent',	
			
		};
	}

	// Push DataLayer Event

	pushEvent(data) {
		if (this.devMode) return;
		window.dataLayer.push(data);
	}

	getUrlParams(paramName) {
		let urlParams = new URLSearchParams(window.location.search);
		return urlParams.get(paramName);
	}

	setLocalStorage(key, value) {
		localStorage.setItem(key, value);
	}

	// Channel Grouping

	getChannelGrouping() {

		const channelInfos = {
			channel: null,
			campaignId: null,
		}

		const setChannelInfos = (channel, campaignId) => {
			channelInfos.channel = channel;
			channelInfos.campaignId = campaignId;
		}

		const utm_source = this.getUrlParams('utm_source') || undefined;
		const utm_campaign = this.getUrlParams('utm_campaign') || undefined;
		const msclkid = this.getUrlParams('msclkid') || undefined;
		const gclid = this.getUrlParams('gclid') || undefined;
		const url_campaignId = this.getUrlParams('campaignid') || undefined;


		if (utm_source === 'bing' && url_campaignId != '' && typeof url_campaignId !== "undefined") {
			setChannelInfos('bing', url_campaignId);
		}

		else if (
			(msclkid == '' || typeof msclkid == "undefined") &&
			utm_source !== 'facebook' &&
			gclid != '' &&
			typeof gclid !== "undefined" &&
			(url_campaignId == '' || typeof url_campaignId == "undefined")
		) {
			setChannelInfos('google', "");
		}

		else if (utm_source === 'facebook' && url_campaignId != '' && typeof url_campaignId !== "undefined") {
			setChannelInfos('facebook', url_campaignId);
		}

		else if (utm_source === 'linkedin' && url_campaignId != '' && typeof url_campaignId !== "undefined") {
			setChannelInfos('linkedin', url_campaignId);
		}

		else if (utm_source === 'dv360' && utm_campaign != '' && typeof utm_campaign !== "undefined") {
			setChannelInfos('dv360', utm_campaign);
		}

		else if (utm_source === 'pinterest' && url_campaignId != '' && typeof url_campaignId !== "undefined") {
			setChannelInfos('pinterest', url_campaignId);
		}

		else if (utm_source === 'reddit' && url_campaignId != '' && typeof url_campaignId !== "undefined") {
			setChannelInfos('reddit', url_campaignId);
		}
		else { 
			return
		}

		this.setLocalStorage('channelInfos', JSON.stringify(channelInfos))


	}

}

window.addEventListener('DOMContentLoaded', (event) => {


	
	if(typeof trackingData == "undefined") {
		trackingData = false;
	}
	if (typeof window.dynamicData == "undefined") {
		window.dynamicData = false;
		const HolisticTrackingInstance = new HolisticTracking(false, trackingData);
	} else {
		
		const HolisticTrackingInstance = new HolisticTracking(dynamicData, trackingData);
	}
});
