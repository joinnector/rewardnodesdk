import base_sdk_service from "./base_sdk_service";

class NotificationService extends  base_sdk_service {
	constructor(name: string) {
		super(name);
	}
}

const notification_service = new NotificationService("notification");
export default notification_service;