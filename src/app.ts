// client
import security_wrapper from "./wrapper/security_wrapper";
import winston_wrapper from "./wrapper/winston_wrapper";
import axios_wrapper from "./wrapper/axios_wrapper";

security_wrapper.init();
winston_wrapper.init();
axios_wrapper.init();

exports.security_wrapper = security_wrapper;
exports.winston_wrapper = winston_wrapper;