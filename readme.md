# Globales Trackingsetup

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