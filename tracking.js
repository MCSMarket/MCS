class HolisticTracking {

	constructor(dynamicData) {
		window.dataLayer = window.dataLayer || [];
		this.dynamicData = dynamicData;

		this.addEventListeners();
		this.getChannelGrouping();
		this.landingPageView();
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
			"eventAction": "company_overlay"
		});

		// Press Release Click Event
		this.clickEvents('[data-id="pressrelease"]', {
			"eventCategory": "Analyse",
			"eventAction": "press_release_teaser_click"
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
					"event_audience": "low_intent",
				});
			});
		});
	}

	copyEvents(type, labelType = 'ISIN') {
		const buttons = document.querySelectorAll(`a[data-copy="${type}"]`);
		console.log(type, labelType, this.dynamicData[type])
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
		window.dataLayer.push(data);
		console.log(window.dataLayer);
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
	console.log("UPDATED SUCCESSFULLY")
	if (typeof dynamicData == "undefined") {
		const dynamicData = false;
		const HolisticTrackingInstance = new HolisticTracking(false);
	} else {
		const HolisticTrackingInstance = new HolisticTracking(dynamicData);
	}
});
