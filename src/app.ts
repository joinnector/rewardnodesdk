// client
import security_wrapper from "./wrapper/security_wrapper";
import winston_wrapper from "./wrapper/winston_wrapper";
import axios_wrapper from "./wrapper/axios_wrapper";

// services
import coupon_service from "./service/coupon_service";
import currency_service from "./service/currency_service";
import deal_service from "./service/deal_service";
import lead_service from "./service/lead_service";
import notification_service from "./service/notification_service";
import review_service from "./service/review_service";
import setting_service from "./service/setting_service";
import swap_service from "./service/swap_service";
import task_service from "./service/task_service";
import taskactivity_service from "./service/taskactivity_service";
import wallet_service from "./service/wallet_service";
import wallettransaction_service from "./service/wallettransaction_service";

class NectorSDK {
	constructor(key: string, secret: string) {
		this.init_wrappers(key, secret);
	}

	init_wrappers(key: string, secret: string): void {
		security_wrapper.init();
		winston_wrapper.init();
		axios_wrapper.init(key, secret);
	}

	get_coupon_service(): typeof coupon_service {
		return coupon_service;
	}

	get_currency_service(): typeof currency_service {
		return currency_service;
	}

	get_deal_service(): typeof deal_service {
		return deal_service;
	}

	get_lead_service(): typeof lead_service {
		return lead_service;
	}

	get_notification_service(): typeof notification_service {
		return notification_service;
	}

	get_review_service(): typeof review_service {
		return review_service;
	}

	get_subscription_service(): typeof setting_service {
		return setting_service;
	}

	get_swap_service(): typeof swap_service {
		return swap_service;
	}

	get_task_service(): typeof task_service {
		return task_service;
	}

	get_taskactivity_service(): typeof taskactivity_service {
		return taskactivity_service;
	}
	
	get_wallet_service(): typeof wallet_service {
		return wallet_service;
	}

	get_wallettransaction_service(): typeof wallettransaction_service {
		return wallettransaction_service;
	}
}

export default NectorSDK;