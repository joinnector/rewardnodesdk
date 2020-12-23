const component_helper = require("./component_helper");
const fixture_helper = require("./fixture_helper");

const create_test = (scope, payload) => {
	describe(component_helper.collection_helper.get_lodash().upperFirst(scope) + " Create", function () {
		before(function (done) {
			fixture_helper.initialize_test()
				.then(() => done());
		});

		it(`it should success for ${component_helper.collection_helper.get_lodash().lowerCase(scope)} - item`, function (done) {
			const factory = component_helper.app[`get_${component_helper.collection_helper.get_lodash().lowerCase(scope)}_service`]();
			factory.create(payload)
				.then(result => {
					// console.log(result.status);
					result.status.should.equal(200);
					result.headers["content-type"].should.match(/json/);
					result.data.meta.should.be.a("object");
					result.data.meta.code.should.equal(200);
					result.data.meta.status.should.equal("success");
					result.data.data.should.be.a("object");
					done();
				})
				.catch(exe => {
					// console.log(exe.response.data);
				});
		});
	});
};


exports.create_test = create_test;