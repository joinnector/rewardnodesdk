const component_helper = require("../component_helper");
const fixture_helper = require("../fixture_helper");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const basicuser = "270f5aff-4f4d-4448-8e6d-e2a3273677d7";
const basicpass = "0b8f79ea0bfae24b20f8b7aed22dc07fe8c0b0da";
const authorization = "Basic MjcwZjVhZmYtNGY0ZC00NDQ4LThlNmQtZTJhMzI3MzY3N2Q3OjBiOGY3OWVhMGJmYWUyNGIyMGY4YjdhZWQyMmRjMDdmZThjMGIwZGE=";


describe("Email", function () {
	before(function (done) {
		fixture_helper.initialize_test().then(() => done());
	});

	describe("Vpc Create EmailTemplate", function () {
		it("it should fail if invalid header - invalid authorization", function (done) {
			component_helper.request.post("/api/vpc/emailtemplates")
				.set("x-source", "unix")
				.set("authorization", "Basic abcd")
				.set("x-signature", "abcd")
				.send({ template_name: "REQUEST_MEDIUM_VERIFY_OTP" })
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
			component_helper.request.post("/api/vpc/emailtemplates")
				.set("x-source", "abcd")
				.set("authorization", authorization)
				.set("x-signature", "abcd")
				.send({ template_name: "REQUEST_MEDIUM_VERIFY_OTP" })
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
			component_helper.request.post("/api/vpc/emailtemplates")
				.set("x-source", "unix")
				.set("authorization", authorization)
				.set("x-signature", "abcd")
				.send({ template_name: "REQUEST_MEDIUM_VERIFY_OTP" })
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
			const signature = fixture_helper.create_signature(component_helper.collection_helper.process_serialize_data({ template_name: "abcd" }), basicpass);
			component_helper.request.post("/api/vpc/emailtemplates")
				.set("x-source", "unix")
				.set("authorization", authorization)
				.set("x-signature", signature)
				.send({ template_name: "abcd" })
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

		it("it should success for emailtemplates - item", function (done) {
			const signature = fixture_helper.create_signature(component_helper.collection_helper.process_serialize_data({ template_name: "REQUEST_MEDIUM_VERIFY_OTP" }), basicpass);
			component_helper.request.post("/api/vpc/emailtemplates")
				.set("x-source", "unix")
				.set("authorization", authorization)
				.set("x-signature", signature)
				.send({ template_name: "REQUEST_MEDIUM_VERIFY_OTP" })
				.end(function (err, res) {
					// console.log(res.body, err);
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

	describe("Vpc Create Email", function () {
		it("it should fail if invalid header - invalid authorization", function (done) {
			component_helper.request.post("/api/vpc/emails")
				.set("x-source", "unix")
				.set("authorization", "Basic abcd")
				.set("x-signature", "abcd")
				.send({ template_name: "abcd", destination: "test@gmail.com", email: {} })
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
			component_helper.request.post("/api/vpc/emails")
				.set("x-source", "abcd")
				.set("authorization", authorization)
				.set("x-signature", "abcd")
				.send({ template_name: "abcd", destination: "test@gmail.com", email: {} })
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
			component_helper.request.post("/api/vpc/emails")
				.set("x-source", "unix")
				.set("authorization", authorization)
				.set("x-signature", "abcd")
				.send({ template_name: "abcd", destination: "test@gmail.com", email: {} })
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
			const signature = fixture_helper.create_signature(component_helper.collection_helper.process_serialize_data({ template_name: "abcd", destination: "test@gmail.com", email: {} }), basicpass);
			component_helper.request.post("/api/vpc/emails")
				.set("x-source", "unix")
				.set("authorization", authorization)
				.set("x-signature", signature)
				.send({ template_name: "abcd", destination: "test@gmail.com", email: {} })
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
			const signature = fixture_helper.create_signature(component_helper.collection_helper.process_serialize_data({ template_name: "REQUEST_MEDIUM_VERIFY_OTP", destination: "", email: {} }), basicpass);
			component_helper.request.post("/api/vpc/emails")
				.set("x-source", "unix")
				.set("authorization", authorization)
				.set("x-signature", signature)
				.send({ template_name: "REQUEST_MEDIUM_VERIFY_OTP", destination: "", email: {} })
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

		it("it should fail if invalid payload - invalid email body - one", function (done) {
			const signature = fixture_helper.create_signature(component_helper.collection_helper.process_serialize_data({ template_name: "REQUEST_MEDIUM_VERIFY_OTP", destination: "ayush.as.shukla@gmail.com", email: {} }), basicpass);
			component_helper.request.post("/api/vpc/emails")
				.set("x-source", "unix")
				.set("authorization", authorization)
				.set("x-signature", signature)
				.send({ template_name: "REQUEST_MEDIUM_VERIFY_OTP", destination: "ayush.as.shukla@gmail.com", email: {} })
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

		it("it should fail if invalid payload - invalid email body - two", function (done) {
			const signature = fixture_helper.create_signature(component_helper.collection_helper.process_serialize_data({ template_name: "REQUEST_MEDIUM_VERIFY_OTP", destination: "ayush.as.shukla@gmail.com", email: { myotp: "123456" } }), basicpass);
			component_helper.request.post("/api/vpc/emails")
				.set("x-source", "unix")
				.set("authorization", authorization)
				.set("x-signature", signature)
				.send({ template_name: "REQUEST_MEDIUM_VERIFY_OTP", destination: "ayush.as.shukla@gmail.com", email: { myotp: "123456" } })
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

		it("it should success for emails - request email verify otp", function (done) {
			const email_scope = component_helper.emailnock()
				.post("/")
				.query(true)
				.reply(function (uri, body) {
					return [200];
				});

			const signature = fixture_helper.create_signature(component_helper.collection_helper.process_serialize_data({ template_name: "REQUEST_MEDIUM_VERIFY_OTP", destination: "ayush.as.shukla@gmail.com", email: { otp: "123456" } }), basicpass);
			component_helper.request.post("/api/vpc/emails")
				.set("x-source", "unix")
				.set("authorization", authorization)
				.set("x-signature", signature)
				.send({ template_name: "REQUEST_MEDIUM_VERIFY_OTP", destination: "ayush.as.shukla@gmail.com", email: { otp: "123456" } })
				.end(function (err, res) {
					// console.log(res.body, err)
					email_scope.isDone().should.be.true;
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