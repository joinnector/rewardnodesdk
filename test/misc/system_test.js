const component_helper = require("../component_helper");
const fixture_helper = require("../fixture_helper");

describe("System", function () {
	before(function (done) {
		fixture_helper.initialize_test().then(() => done());
	});

	describe("Open Health System", function () {
		it("it should return success", function (done) {
			component_helper.request.get("/api/open/systemhealths")
				.set("x-source", "web")
				.end(function (err, res) {
					// console.log(res.body, err)
					res.status.should.equal(200);
					res.headers["content-type"].should.match(/json/);
					res.body.meta.should.be.a("object");
					res.body.meta.code.should.equal(200);
					res.body.meta.status.should.equal("success");
					res.body.data.should.be.a("object");
					done();
				});
		});
	});

	describe("Open Info System", function () {
		it("it should return success", function (done) {
			component_helper.request.get("/api/open/systeminfos")
				.set("x-source", "web")
				.end(function (err, res) {
					// console.log(res.body, err)
					res.status.should.equal(200);
					res.headers["content-type"].should.match(/json/);
					res.body.meta.should.be.a("object");
					res.body.meta.code.should.equal(200);
					res.body.meta.status.should.equal("success");
					res.body.data.should.be.a("object");
					done();
				});
		});
	});

	describe("Desync Attack", function () {
		it("it should fail if request - both content length and transfer encoding sent", function (done) {
			component_helper.request.get("/api/open/systeminfos")
				.set("x-source", "web")
				.set("Content-Length", 32)
				.set("Transfer-Encoding", "chunked")
				.end(function (err, res) {
					// console.log(res.body, err)
					res.status.should.equal(400);
					res.headers["connection"].should.equal("close");
					done();
				});
		});
	});
});