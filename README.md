# eBird Crawler

## end result
This program is for _birders_. Basically, they want to crawl [this eBird website](https://ebird.org/) and iterate through all of the "checklists" pages. On each page is KML (map data) that we want to extract. Once we've extracted all of the KML data, we want to concatenate it into a single large map.

## current state
I (Andrew) started writing a script that uses puppeteer to log in to the eBird site using my credentials. Puppeteer is a "browser orchestrator". Right now we navigate to the main eBird page, click login, input my credentials, and navigate to the MyEBird page.

I've set up some rough project structure, but feel free to copy paste or rewrite this stuff into functions that suit your programming style (/what makes sense to you).

My credentials are hard-coded in the code right now -- obviously not ideal. Proposed solution for this below.

## ideal result
This should be a CLI app, calling it could look like:
`node index.js --username=drewtcraft --password=DogGodDog`
Super bonus points if the app is packaged into an `.exe` or other executable file so the user does not need git or node installed and can just do something like:
`custom-ebird-crawler.exe get-kml-files --username=drewtcraft --password=DogGodDog`

### task one: crawl and extract
So we'll crawl the web page using `puppeteer`. Each page's KML data should be written to a file using `fs`. I don't know what the KML data looks like, but it's whatever is being used to render the embedded map. This part will require a little research. When this script is run, we'll want to make sure to delete any existing local KML files, or otherwise write the files into distinct directories (e.g. `kml-files/2023_06_01_<timestamp etc>/map_0.kml`).

### task two: unify (and convert?)
Once we have all the KML data saved locally, we just need to find a way to mash them all together. This step will also require some research for a relevant NPM package, as you probably won't want to try to parse and unify the KML data yourself. Alternatively, it looks like there are packages for converting KML to another format called GeoJSON, which is actually pretty easy to parse and has lots of supporting libraries, so it may be better to convert the KML to GeoJSON, then concatenate. The end result for this task should be a file.

### task three: display
Once all the data is put together in a single file, the user will want to see and probably share the map. There are definitely websites that will take a GeoJSON payload and render a map. It would be nice if it could provide a URL to an embedded map for them, but this may not be feasible without running our own server. It may be enough to generate a large static image of the complete map. I will consult the birder!

## stuff/tech you might need to research
- building CLI applications
  - taking command line arguments etc.
- `puppeteer` library basics (I had never used it before either but I left good comments and it's actually pretty straightforward)
- the `fs` library (short for filesystem)
  - it is important to know how to write to and read from files in any programming language. If you haven't had to do this yet this will be great practice.
- KML
- (optional depending on how the KML research goes) GeoJSON
