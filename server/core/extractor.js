var cheerio = require('cheerio')
var _ = require('lodash')
var fs = require('fs')

module.exports = {
    process: function (filepath, debug) {


        var data = {
            content: null,
            translated: [],
            extracted: []
        }

        var raw = fs.readFileSync(filepath, 'utf-8')

        raw = raw.replace(/<script/g, '<object').replace(/<\/script/g, '</object')
        var $ = cheerio.load(raw, {
            decodeEntities: false
        })

        $('div, a, button, label').each(function (idx, element) {

            var $el = $(element)
            if (!$el.attr('th:utext') && hasTextNode($el)) {
                wrapTextNode($el, $)
            }
        })

        $('span, i').each(function (idx, element) {
            var $el = $(element)
            if (isSpanSuspicious($el)) {
                if ($el.find('i, a').length) {
                    wrapTextNode($el, $)
                } else {
                    $el.attr('extractor', getExtractorId())
                }
            }
        })


        $('h1, h2, h3, h4, h5, h6, p, [extractor]').each(function (idx, element) {
            var $el = $(element)

            if (hasNoTextNodes($el)) {

            } else {
                if (!$el.attr('extractor'))
                    $el.attr('extractor', getExtractorId())

                if ($el.attr('th:utext')) {
                    var key = $el.attr('th:utext').replace(/(\#{|})/g, '')
                    data.translated.push({
                        key: key,
                        eid: $el.attr('extractor'),
                        value: $el.html()
                    })
                } else {
                    data.extracted.push({
                        eid: $el.attr('extractor'),
                        value: $el.html()
                    })
                }
            }
        })

        data.content = $('body').html()

        if (debug)
            filepath = filepath.replace(/\/html\//, '/uploads/')


        var output = $.html().replace(/<object/g, '<script').replace(/<\/object/g, '</script')

        output = output.replace(/<html[^>]+?>/,'<html xmlns="http://www.w3.org/1999/xhtml"\n\
      xmlns:th="http://www.thymeleaf.org"\n\
      xmlns:tiles="http://www.thymeleaf.org">')
        _.each(['input', 'hr', 'br', 'link', 'meta', 'img'], function (tagName) {
            var r = new RegExp("<" + tagName + "([^>]*?)>", 'g')
            output = output.replace(r, "<" + tagName + "$1/>")
        })

        fs.writeFileSync(filepath, output)

        return data;
    }
}

var eCounter = 0
function getExtractorId() {
    return 'extractor' + ++eCounter;
}

function hasTextNode($el) {
    var result = false
    $el.contents().each(function (idx, node) {
        if (node.type == 'text' && node.data.trim()) {
            if(_.startsWith(node.data.trim(), '{{') && _.endsWith(node.data.trim(), '}}') ){

            } else{
                result = true
            }
        }
    })
    return result
}

function hasNoTextNodes($el) {
    return !_.any($el.contents(), function (n) {
        return n.type == "text" && n.data.trim() && n.data.trim()
    })
}

function isSpanSuspicious($el) {
    var result = false
    if (!$el.attr('th:utext') && !$el.attr('extractor') && hasTextNode($el)) {

        result = true
    }

    return result
}

function wrapTextNode($el, $) {
    $el.contents().each(function (i, node) {
        if (node.type == 'text' && node.data.trim()) {
            var text = node.data.trim()
            if (!_.endsWith(text, '}}') && !_.startsWith(text, '{{')) {
                $(this).replaceWith('<span extractor="' + getExtractorId() + '">' + node.data.trim() + '</span>')
            }
        }
    })
}