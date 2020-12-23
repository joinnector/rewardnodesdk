import base_sdk_service from "./base_sdk_service";

class ReviewService extends  base_sdk_service {
	constructor(name: string) {
		super(name);
	}
}

const review_service = new ReviewService("review");
export default review_service;