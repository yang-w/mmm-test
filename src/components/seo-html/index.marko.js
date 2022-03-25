// Compiled using marko@4.23.16 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/@ebay/ebayui-core$7.3.1/src/components/seo-html/index.marko",
    marko_component = require("./component"),
    marko_renderer = require("marko/src/runtime/components/renderer"),
    marko_str = require("marko/src/runtime/helpers/to-string"),
    helpers_escape_xml = require("marko/src/runtime/html/helpers/escape-xml"),
    marko_escapeXml = helpers_escape_xml.x,
    marko_attr = require("marko/src/runtime/html/helpers/attr"),
    marko_classAttr = require("marko/src/runtime/html/helpers/class-attr");

function render(input, out, __component, component, state) {
  var data = input;

  var model = component.model;

  if (model && model.html) {
    out.w("<div" +
      marko_classAttr([
        "seo-content",
        "seo-multimedia-html",
        "b-module",
        "seo-mmm-test",
        {
            "show-less": model.isSmall && (!state.isExpanded)
          }
      ]) +
      "><div class=content>" +
      marko_str(model.html) +
      "</div>");

    if (model.isSmall) {
      out.w("<div class=footer><div class=transparent></div><button class=\"footer__btn footer__btn--viewAll\" aria-expanded=false" +
        marko_attr("aria-label", model.viewMoreAccessibilityText) +
        ">" +
        marko_escapeXml(model.viewMore) +
        "<svg aria-hidden=true class=svg-icon height=16 width=16><use xlink:href=#svg-icon-chevron-down></use></svg></button><button class=\"footer__btn footer__btn--viewLess\" aria-expanded=true" +
        marko_attr("aria-label", model.viewLessAccessibilityText) +
        ">" +
        marko_escapeXml(model.viewLess) +
        "<svg aria-hidden=true class=svg-icon height=16 width=16><use xlink:href=#svg-icon-chevron-up></use></svg></button></div>");
    }

    out.w("</div>");
  }
}

marko_template._ = marko_renderer(render, {
    ___type: marko_componentType
  }, marko_component);

marko_template.meta = {
    deps: [
      "package: ./browser.json",
      "./style.less"
    ],
    id: "/@ebay/ebayui-core$7.3.1/src/components/seo-html/index.marko",
    component: "./"
  };
