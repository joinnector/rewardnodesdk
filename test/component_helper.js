require("dotenv").config();
process.env["NODE_ENV"] = "test";

const supertest = require("supertest");
const nock = require("nock");
const awssdk = require("aws-sdk");

require("../dist/app");
const collection_helper = require("../dist/helper/collection_helper").default;
const constant_helper = require("../dist/helper/constant_helper").default;

const security_wrapper = require("../dist/wrapper/security_wrapper").default;

exports.sms_url = collection_helper.process_env_value(process.env[constant_helper.get_env_constant().GUPSHUP_URL]);
exports.region = collection_helper.process_env_value(process.env[constant_helper.get_env_constant().AWS_REGION]);

awssdk.config.update({
	region: exports.region,
	sslEnabled: true,
	accessKeyId: "accesskeyid",
	secretAccessKey: "secretaccesskey"
});

exports.host = collection_helper.process_env_value(process.env[constant_helper.get_env_constant().SERVICE_HOST]);
exports.port = collection_helper.process_env_value(process.env[constant_helper.get_env_constant().SERVICE_PORT]);
exports.request = supertest("http://" + exports.host + ":" + exports.port);
exports.collection_helper = collection_helper;
exports.constant_helper = constant_helper;

exports.emailnock = () => nock("https://email." + exports.region + ".amazonaws.com");
exports.smsnock = () => nock(new URL(exports.sms_url).origin);

exports.security_wrapper = security_wrapper;

afterEach(function () {
	nock.cleanAll();
});

after(function () {
	process.env["NODE_ENV"] = "development";
});