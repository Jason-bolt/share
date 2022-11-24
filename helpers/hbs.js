const moment = require("moment");

module.exports = {
    formatDate: function (date, format) {
        return moment(date).format(format)
    },

    selectIncluded: (attribute, tags) => {
        if (tags.includes(attribute)){
            return 'selected'
        }else {
            return ''
        }
    }
}