# Globales Trackingsetup

## Consent Mode V2 (Globales Script):
In den Header Code folgendes Snippet einfügen:

```html
<script data-cookieconsent="ignore">
    window.dataLayer = window.dataLayer || [];
    function gtag() {
        dataLayer.push(arguments);
    }
    gtag("consent", "default", {
        ad_personalization: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        analytics_storage: "denied",
        functionality_storage: "denied",
        personalization_storage: "denied",
        security_storage: "granted",
        wait_for_update: 500,
    });
    gtag("set", "ads_data_redaction", true);
</script>
```

## Dynamische Daten:
Auf den CMS Templates werden über das Code-Snippet "dynamicData" die Daten zum Unternehmen an die Page übergeben.

## Events:
### CopyEvents:
isin, wkn, symbol und brand werden über die dynamischen Daten an die Events übergeben

``` javascript
copyEventData(value, brand, action, placement, labelType = 'ISIN') {

		return {
			'event': 'dynamic_event',
			'event_name': action,
			'eventCategory': 'MicroConversion',
			'eventAction': action,
			[labelType]: value,
			'placement': placement,
			'brand': brand,
			'event_cluster': 'copy',
			'event_audience': 'high_intent',	
			
		};
	}

```

## Channelzuordnung:
Über die Queryparameter werden die Parameter `` utm_source, utm_campaign, msclkid, gclid und campaignid `` abgefragt und entsprechen den Kanälen zugeordnet. Sofern eine Zuordnung durchgeführt werden konnte, werden die Daten über den Key ``channelInfos`` in den localStorage gespeichert


Scripts zum Einbinden: 

``https://cdn.jsdelivr.net/gh/mmg-marketmedium/HolisticTracking@latest/tracking.min.js``

``https://cdn.jsdelivr.net/gh/2do-digital/HolisticTracking@latest/tracking.min.js``
=> aktuell bei MCS eingebunden

``https://cdn.jsdelivr.net/gh/MCSMarket/MCS@latest/tracking.min.js``


Link zum Purgen des CDN Caches: https://www.jsdelivr.com/tools/purge