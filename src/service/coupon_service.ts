import base_sdk_service from "./base_sdk_service";

class CouponService extends base_sdk_service {
	constructor(name: string) {
		super(name);
	}
}

const coupon_service = new CouponService("coupon");
export default coupon_service;