# Bulk Image Downloader (working name)

### Bulk Image Downloader is an free, browser-based online tool to download images from a list of URLs. 
### It works right in the browser (will add PWA support)

## Features
- Load a bunch of images from provided list of image URLs (or try it by loading random images from picsum.photos)
- Download images one by one or just select images to download
- Edit filename before download
- Download all selected images as separate files or in a ZIP archive (which also includes images-metadata.json)

## Changelog

## [0.0.5] - 2022-07-10
#### Working prototype with basic functionality (and lot of untyped spaghetti code waiting for refactor)
### Added
- Basic UI (to be improved, rebranded)
- Input data validation (URLs validity check)
- Fetched data validation (by mime type and response code)
- Load images from list of URLs
- Load random images from picsum.photos
- Selected/deselect images
- Actions toolbar (Download separately/zipped, Selecte/Deselect all, Donwload separately/zip)
- Edit a image filename before download (double-click)