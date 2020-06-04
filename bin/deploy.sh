#!/usr/bin/env zsh

# Sync to bucket
gsutil -m rsync -d -x "^\.|.*md$|.*js$|.*json$" ./dist gs://zcastles.thisadrian.com
;gsutil -m rsync -d -r -x "^\." ./dist/css gs://zcastles.thisadrian.com/css
;gsutil -m rsync -d -r -x "^\." ./dist/js gs://zcastles.thisadrian.com/js
;gsutil -m rsync -d -r -x "^\." ./dist/static gs://zcastles.thisadrian.com/static

# Set cache control
;gsutil -m setmeta -r -h "Cache-Control:no-cache, max-age=0, must-revalidate" gs://zcastles.thisadrian.com
;gsutil -m setmeta -r -h "Cache-Control:no-cache, max-age=0, must-revalidate" gs://zcastles.thisadrian.com/css
;gsutil -m setmeta -r -h "Cache-Control:no-cache, max-age=0, must-revalidate" gs://zcastles.thisadrian.com/js
;gsutil -m setmeta -r -h "Cache-Control:no-cache, max-age=0, must-revalidate" gs://zcastles.thisadrian.com/static
