var downloader = require('./downloader')

var data = {
    "originalname": "admin.html",
    "translated": [],
    "extracted": [
        {"eid": "extractor1", "value": "ADMIN PAGE", "key": "admin.page.title"},
        {

        "eid": "extractor2",
        "value": "\n            The page has yet to be implemented!\n        ",
        "key": "page.not.implemented"
    }]
}
downloader.process('/home/griga/Projects/extractor/uploads/admin.html', data)