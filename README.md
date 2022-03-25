# SEO MMM Testing

## Prerequisites

### Xcode
Node installation has some dependencies which can be fulfilled by installing Xcode and the command line tools that are packaged with it. Go to the App Store to install Xcode. When it's done, you can install the tools via preferences > downloads.

### Node
You can install from [Node.js release downloads](https://nodejs.org/en/download/).

### Package Manager: Yarn
`npm install yarn --global`

## Getting Started

```sh
# Install dependencies
$ yarn

# start the server
$ yarn start
```

## Development

### Coding Guideline

Please follow the guideline [here](https://docs.google.com/document/d/1OToQ--0A6gTPO4veQaWXA-uOs87pAHER_V5R6BQSzl0/edit?usp=sharing).

### Running Project

The testing file should be put under `src/test-data`, and make sure its named as `test.html`.

There are couple of sample pages for both dWeb and mWeb testing. 

Once server is running, you can access it at 

- [dWeb layout](http://localhost:3000/dweb)
- [dWeb no LHN layout](http://localhost:3000/dweb-nolhn)
- [mWeb layout](http://localhost:3000/mweb)
 
- Editorial module testing
	- [dWeb layout](http://localhost:3000/editorial-dweb)
	- [mWeb layout](http://localhost:3000/editorial-mweb)

- Baymax 3 testing
	- [mWeb layout](http://localhost:3000/baymax-mweb)
	
### Testing Steps

1. Running the test before uploading files to z-store, make sure content looks good on both dweb and mweb sample pages: the new module is added at the bottom of the page. 
2. Upload content to z-store production and BN lookup in preproduction. 

	- Verify the result on pp.
	- Please compare pp page with production, <b>make sure all of the other modules on the page function properly</b>, in case the css/html of mmm has conflict with other modules, which causing the page breaks.

## Debugging content

1. Make sure content is uploaded to z-store properly.

	### Postman
	Please import `postman/MMM.postman_collection.json` to Postman. You'll see couple of requests in the collection.
	
	![postman screenshot](./postman/postman.png)
	
	- Grab GUID from `bn lookup svc Prod` call (`SEO_TEXT_BLURB.value`)

		![postman screenshot](./postman/bnlookupsvc.png)
		
		For <b>hero product specs</b>, please use `bn lookup svc Prod - hero product specs` call.
		![postman screenshot](./postman/heroproductspecs.png)
		
	- Fetch html content from `Z-Store Prod` call by GUID (paste GUID in request url)
		![postman screenshot](./postman/zstoreprod.png)
		
2. If the html content from z-store looks as expected, due to the cache in seoexpsvc, there might be delay in the final response. Next, verify the response from seoexpsvc by using `TaoTao PP`. 

	Please update `browse_node_id` in the req body, along with `x-ebay-c-marketplace-id` and `Accept-Language` in the req header accordingly.

	![postman screenshot](./postman/seoexpsvcresponse.png)
	
## Pool setup
 
- BroweFE PP ([b125](https://deploy.altus.vip.ebay.com/dashboard/instancesv2.jsp?method=serviceInstances&appserviceid=%2FENVjjqdsjii128f10vq%2Flexbrwfe125-app__ENVjjqdsjii128f10vq))
	- `nodejs.config.lexbrwfe.browseexperienceserviceprogressiverender` should point to `lexexpsvc122.lexexpsvc.pp.vip.ebay.com`
 
- BrowseBE PP: ([lexexpsvc122.lexexpsvc.pp.vip.ebay.com](https://deploy.altus.vip.ebay.com/dashboard/instancesv2.jsp?method=serviceInstances&appserviceid=%2FENV8rcf4iou7x8%2Flexexpsvc122-app__ENV8rcf4iou7x8))
	- `org.ebayopensource.ginger.client.seo.multimedia.preprod.SeoMultiMediaSvcClient` should point to seoexpsvc pp (`http://seoexpsvc.pp.vip.ebay.com`)
 
- seoexpsvc PP: ([seoexpsvc.pp.vip.ebay.com](https://cmpaas.cloud.ebay.com/dashboard/instancesv2.jsp?method=serviceInstances&appserviceid=%2FENVjiaugj7r9z86n%2Fseoexpsvc108-app__ENVjiaugj7r9z86n))
	- `org.ebayopensource.ginger.client.domain.preprod.BnLookup`: it should point to bnlookup pp (`http://snbgnisvc.pp.stratus.ebay.com`) or prod (`http://snbgnisvc.vip.ebay.com`), depending on where content is uploaded to.
	- `org.ebayopensource.ginger.client.zoom.preprod.ZStore` should point to zstore prod (`https://zstoreservice.vip.ebay.com`)