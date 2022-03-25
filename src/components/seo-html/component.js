const _ = {
    get: require('lodash/get')
};
const cheerio = require('cheerio');
const mock = require('../../mock-data/index');

module.exports = class {
    onCreate(input) {
        const html = input.html;
        const viewText = mock;

        if (html) {
            const $ = cheerio.load(html, { xmlMode: true, decodeEntities: false, selfClosingTags: false });
            this.model = {
                html: $.html(),
                isSmall: input.deviceInfo.isSmall,
                viewMore: _.get(viewText, 'viewMore.textSpans[0].text', ''),
                viewMoreAccessibilityText: _.get(viewText, 'viewMore.accessibilityText', ''),
                viewLess: _.get(viewText, 'viewLess.textSpans[0].text', ''),
                viewLessAccessibilityText: _.get(viewText, 'viewLess.accessibilityText', '')
            };
        }
        // TODO: component is not mounted, btn click not triggered. force module expanded as default.
        
        // this.state = {
        //     isExpanded: _.get(input, 'viewModel.expanded', false)
        // };
        this.state = {
            isExpanded: true
        };
    }
    onMount() {
        console.log(`---- todo, mounted ------`);
    }
    showMore(event) {
        this.state.isExpanded = true;
        const blurb = event.target.closest('.seo-multimedia-html');
        const viewLessBtn = blurb.getElementsByClassName('footer__btn--viewLess');
        blurb.classList.remove('show-less');
        blurb.classList.add('show-more');
        viewLessBtn[0].focus();
    }
    showLess(event) {
        this.state.isExpanded = false;
        const blurb = event.target.closest('.seo-multimedia-html');
        const viewMoreBtn = blurb.getElementsByClassName('footer__btn--viewAll');
        blurb.classList.add('show-less');
        blurb.classList.remove('show-more');
        viewMoreBtn[0].focus();
    }
};
