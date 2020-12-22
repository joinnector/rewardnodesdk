const component_helper = require("./component_helper");

module.exports = {
	initialize_test: function () {
		return Promise.resolve();
	},
	create_signature: function (body, secret) {
		return component_helper.security_wrapper.get_wrapper().process_hmac_signature(body, secret);
	}
};