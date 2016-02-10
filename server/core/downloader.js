var fs = require('fs')
var _ = require('lodash')
var AdmZip = require('adm-zip');
var mustache = require('mustache')

module.exports.process = function (filepath, data) {
    var newFilepath = filepath.replace(/\.html/,'.extracted.html')

    var raw = fs.readFileSync(filepath, "utf-8")



    _.each(data.extracted, function (e) {
        var r = getExtractorRegExp(e)
        if (!e.deleted && e.key) { //1 replace markers with translation keys
            raw = raw.replace(r, ' th:utext="#{' + e.key + '}"')
        } else { // 2  erase markers
            raw = raw.replace(r, '')
        }
    })

    // 3 erase already translated markers
    _.each(data.translated, function (e) {
        raw.replace(getExtractorRegExp(e), '')
    })

    fs.writeFileSync(newFilepath, raw)

    var messagesFilepath = filepath + '.properties'

    fs.writeFileSync(messagesFilepath, getMessagesContent(data.extracted))

    var zip = new AdmZip();
    zip.addLocalFile(newFilepath);

    zip.addLocalFile(messagesFilepath);

    zip.writeZip(filepath + ".zip");
}

function getExtractorRegExp(e) {
    return new RegExp(' ?extractor="' + e.eid + '"', 'g')
}

function getMessagesContent(extracted) {

    var template = '{{#.}}{{{key}}}={{{value}}}\n{{/.}}'
    return mustache.render(template, extracted.filter(function(e){
        return !e.deleted && !!e.key
    }).map(function (e) {
        var value = e.value.replace(/\n/g,'\\r\\n').trim()

        return {
            key: e.key,
            value: value
        }
    }));


}