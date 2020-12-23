import * as app_type from "../../types/app_type";

export const SERVICE_NAME = "nectorsdk";
export const HMAC_ALGO = "sha256";
export const HASH_ALGO = "sha256";

export const API_BASE_URL = "https://platform.nector.io";

export const API_BASE_HEADER: app_type.ObjectAnyAttributes = {
	"accept": "application/json",
	"content-type": "application/json",
	"x-source": "web"
};

export const API_MAP: app_type.ObjectAnyAttributes = {
	coupon: {
		create: {
			endpoint: "/coupons",
			prefix: "/api/v2/merchant",
			has_authorization: true,
			has_signature: true,
		},
		get: {
			endpoint: "/coupons/{id}",
			prefix: "/api/v2/merchant",
			has_authorization: true,
		},
		save: {
			endpoint: "/coupons/{id}",
			prefix: "/api/v2/merchant",
			has_authorization: true,
			has_signature: true,
		},
		list: {
			endpoint: "/coupons",
			prefix: "/api/v2/merchant",
			has_authorization: true,
		}
	},
	currency: {
		get: {
			endpoint: "/currencies/{id}",
			prefix: "/api/v2/merchant",
			has_authorization: true,
		},
		list: {
			endpoint: "/currencies",
			prefix: "/api/v2/merchant",
			has_authorization: true,
		}
	},
	deal: {
		reward: {
			endpoint: "/dealrewards",
			prefix: "/api/v2/merchant",
			has_authorization: true,
			has_signature: true,
		},
		get: {
			endpoint: "/deals/{id}",
			prefix: "/api/v2/merchant",
			has_authorization: true,
		},
		list: {
			endpoint: "/deals",
			prefix: "/api/v2/merchant",
			has_authorization: true,
		}
	},
	lead: {
		create: {
			endpoint: "/leads",
			prefix: "/api/v2/merchant",
			has_authorization: true,
			has_signature: true,
		},
		get: {
			endpoint: "/leads/{id}",
			prefix: "/api/v2/merchant",
			has_authorization: true,
		},
		save: {
			endpoint: "/leads/{id}",
			prefix: "/api/v2/merchant",
			has_authorization: true,
			has_signature: true,
		},
		list: {
			endpoint: "/leads",
			prefix: "/api/v2/merchant",
			has_authorization: true,
		}
	},
	notification: {
		get: {
			endpoint: "/notifications/{id}",
			prefix: "/api/v2/merchant",
			has_authorization: true,
		},
		list: {
			endpoint: "/notifications",
			prefix: "/api/v2/merchant",
			has_authorization: true,
		}
	},
	review: {
		create: {
			endpoint: "/reviews",
			prefix: "/api/v2/merchant",
			has_authorization: true,
			has_signature: true,
		},
		get: {
			endpoint: "/reviews/{id}",
			prefix: "/api/v2/merchant",
			has_authorization: true,
		},
		save: {
			endpoint: "/reviews/{id}",
			prefix: "/api/v2/merchant",
			has_authorization: true,
			has_signature: true,
		},
		delete: {
			endpoint: "/reviews/{id}",
			prefix: "/api/v2/merchant",
			has_authorization: true,
		},
		list: {
			endpoint: "/reviews",
			prefix: "/api/v2/merchant",
			has_authorization: true,
		}
	},
	setting: {
		get: {
			endpoint: "/settings/{id}",
			prefix: "/api/v2/merchant",
			has_authorization: true,
		},
	},
	swap: {
		create: {
			endpoint: "/swaps",
			prefix: "/api/v2/merchant",
			has_authorization: true,
			has_signature: true,
		},
		get: {
			endpoint: "/swaps/{id}",
			prefix: "/api/v2/merchant",
			has_authorization: true,
		},
		list: {
			endpoint: "/swaps",
			prefix: "/api/v2/merchant",
			has_authorization: true,
		}
	},
	task: {
		get: {
			endpoint: "/tasks/{id}",
			prefix: "/api/v2/merchant",
			has_authorization: true,
		},
		list: {
			endpoint: "/tasks",
			prefix: "/api/v2/merchant",
			has_authorization: true,
		}
	},
	taskactivity: {
		create: {
			endpoint: "/taskactivities",
			prefix: "/api/v2/merchant",
			has_authorization: true,
			has_signature: true,
		},
		get: {
			endpoint: "/taskactivities/{id}",
			prefix: "/api/v2/merchant",
			has_authorization: true,
		},
		list: {
			endpoint: "/taskactivities",
			prefix: "/api/v2/merchant",
			has_authorization: true,
		}
	},
	wallet: {
		create: {
			endpoint: "/wallets",
			prefix: "/api/v2/merchant",
			has_authorization: true,
			has_signature: true,
		},
		get: {
			endpoint: "/wallets/{id}",
			prefix: "/api/v2/merchant",
			has_authorization: true,
		},
		save: {
			endpoint: "/wallets/{id}",
			prefix: "/api/v2/merchant",
			has_authorization: true,
			has_signature: true,
		},
		list: {
			endpoint: "/wallets",
			prefix: "/api/v2/merchant",
			has_authorization: true,
		}
	},
	wallettransaction: {
		create: {
			endpoint: "/wallettransactions",
			prefix: "/api/v2/merchant",
			has_authorization: true,
			has_signature: true,
		},
		get: {
			endpoint: "/wallettransactions/{id}",
			prefix: "/api/v2/merchant",
			has_authorization: true,
		},
		save: {
			endpoint: "/wallettransactions/{id}",
			prefix: "/api/v2/merchant",
			has_authorization: true,
			has_signature: true,
		},
		list: {
			endpoint: "/wallettransactions",
			prefix: "/api/v2/merchant",
			has_authorization: true,
		}
	}
};