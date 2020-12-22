const component_helper = require("../component_helper");
const fixture_helper = require("../fixture_helper");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const basicuser = "270f5aff-4f4d-4448-8e6d-e2a3273677d7";
const basicpass = "0b8f79ea0bfae24b20f8b7aed22dc07fe8c0b0da";
const authorization = "Basic MjcwZjVhZmYtNGY0ZC00NDQ4LThlNmQtZTJhMzI3MzY3N2Q3OjBiOGY3OWVhMGJmYWUyNGIyMGY4YjdhZWQyMmRjMDdmZThjMGIwZGE=";


describe("Sms", function () {
	before(function (done) {
		fixture_helper.initialize_test().then(() => done());
	});

	describe("Vpc Create Sms", function () {
		it("it should fail if invalid header - invalid authorization", function (done) {
			component_helper.request.post("/api/vpc/sms")
				.set("x-source", "unix")
				.set("authorization", "Basic abcd")
				.set("x-signature", "abcd")
				.send({ template_name: "abcd", destination: "918850312495", sms: {} })
				.end(function (err, res) {
					// console.log(res.body, err)
					res.status.should.equal(401);
					res.headers["content-type"].should.match(/json/);
					res.body.meta.should.be.a("object");
					res.body.meta.code.should.equal(401);
					res.body.meta.status.should.equal("error");
					res.body.data.should.be.a("object");
					done();
				});
		});

		it("it should fail if invalid header - invalid source", function (done) {
			component_helper.request.post("/api/vpc/sms")
				.set("x-source", "abcd")
				.set("authorization", authorization)
				.set("x-signature", "abcd")
				.send({ template_name: "abcd", destination: "918850312495", sms: {} })
				.end(function (err, res) {
					// console.log(res.body, err)
					res.status.should.equal(400);
					res.headers["content-type"].should.match(/json/);
					res.body.meta.should.be.a("object");
					res.body.meta.code.should.equal(400);
					res.body.meta.status.should.equal("error");
					res.body.data.should.be.a("object");
					done();
				});
		});

		it("it should fail if invalid header - invalid signature", function (done) {
			component_helper.request.post("/api/vpc/sms")
				.set("x-source", "unix")
				.set("authorization", authorization)
				.set("x-signature", "abcd")
				.send({ template_name: "abcd", destination: "918850312495", sms: {} })
				.end(function (err, res) {
					// console.log(res.body, err);
					res.status.should.equal(403);
					res.headers["content-type"].should.match(/json/);
					res.body.meta.should.be.a("object");
					res.body.meta.code.should.equal(403);
					res.body.meta.status.should.equal("error");
					res.body.data.should.be.a("object");
					done();
				});
		});

		it("it should fail if invalid payload - invalid template name", function (done) {
			const signature = fixture_helper.create_signature(component_helper.collection_helper.process_serialize_data({ template_name: "abcd", destination: "918850312495", sms: {} }), basicpass);
			component_helper.request.post("/api/vpc/sms")
				.set("x-source", "unix")
				.set("authorization", authorization)
				.set("x-signature", signature)
				.send({ template_name: "abcd", destination: "918850312495", sms: {} })
				.end(function (err, res) {
					// console.log(res.body, err)
					res.status.should.equal(422);
					res.headers["content-type"].should.match(/json/);
					res.body.meta.should.be.a("object");
					res.body.meta.code.should.equal(422);
					res.body.meta.status.should.equal("error");
					res.body.data.should.be.a("object");
					done();
				});
		});

		it("it should fail if invalid payload - invalid destination", function (done) {
			const signature = fixture_helper.create_signature(component_helper.collection_helper.process_serialize_data({ template_name: "REQUEST_FORGOT_PASSWORD_OTP", destination: "", sms: {} }), basicpass);
			component_helper.request.post("/api/vpc/sms")
				.set("x-source", "unix")
				.set("authorization", authorization)
				.set("x-signature", signature)
				.send({ template_name: "REQUEST_FORGOT_PASSWORD_OTP", destination: "", sms: {} })
				.end(function (err, res) {
					// console.log(res.body, err)
					res.status.should.equal(400);
					res.headers["content-type"].should.match(/json/);
					res.body.meta.should.be.a("object");
					res.body.meta.code.should.equal(400);
					res.body.meta.status.should.equal("error");
					res.body.data.should.be.a("object");
					done();
				});
		});

		it("it should fail if invalid payload - invalid sms body - one", function (done) {
			const signature = fixture_helper.create_signature(component_helper.collection_helper.process_serialize_data({ template_name: "REQUEST_FORGOT_PASSWORD_OTP", destination: "918850312495", sms: {} }), basicpass);
			component_helper.request.post("/api/vpc/sms")
				.set("x-source", "unix")
				.set("authorization", authorization)
				.set("x-signature", signature)
				.send({ template_name: "REQUEST_FORGOT_PASSWORD_OTP", destination: "918850312495", sms: {} })
				.end(function (err, res) {
					// console.log(res.body, err)
					res.status.should.equal(422);
					res.headers["content-type"].should.match(/json/);
					res.body.meta.should.be.a("object");
					res.body.meta.code.should.equal(422);
					res.body.meta.status.should.equal("error");
					res.body.data.should.be.a("object");
					done();
				});
		});

		it("it should fail if invalid payload - invalid sms body - two", function (done) {
			const signature = fixture_helper.create_signature(component_helper.collection_helper.process_serialize_data({ template_name: "REQUEST_FORGOT_PASSWORD_OTP", destination: "918850312495", sms: { myotp: "123456" } }), basicpass);
			component_helper.request.post("/api/vpc/sms")
				.set("x-source", "unix")
				.set("authorization", authorization)
				.set("x-signature", signature)
				.send({ template_name: "REQUEST_FORGOT_PASSWORD_OTP", destination: "918850312495", sms: { myotp: "123456" } })
				.end(function (err, res) {
					// console.log(res.body, err)
					res.status.should.equal(422);
					res.headers["content-type"].should.match(/json/);
					res.body.meta.should.be.a("object");
					res.body.meta.code.should.equal(422);
					res.body.meta.status.should.equal("error");
					res.body.data.should.be.a("object");
					done();
				});
		});

		it("it should success for request sms verify otp template and send sms", function (done) {
			const sms_scope = component_helper.smsnock()
				.get(new URL(component_helper.sms_url).pathname)
				.query(true)
				.reply(function (uri, body) {
					return [200];
				});

			const signature = fixture_helper.create_signature(component_helper.collection_helper.process_serialize_data({ template_name: "REQUEST_FORGOT_PASSWORD_OTP", destination: "918850312495", sms: { otp: "123456" } }), basicpass);
			component_helper.request.post("/api/vpc/sms")
				.set("x-source", "unix")
				.set("authorization", authorization)
				.set("x-signature", signature)
				.send({ template_name: "REQUEST_FORGOT_PASSWORD_OTP", destination: "918850312495", sms: { otp: "123456" } })
				.end(function (err, res) {
					// console.log(res.body, err)
					sms_scope.isDone().should.be.true;
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
});