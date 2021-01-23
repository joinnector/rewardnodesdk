import * as app_type from "../../types/app_type";

export const SERVICE_NAME = "nectorsdk";
export const HMAC_ALGO = "sha256";
export const HASH_ALGO = "sha256";

export const API_PROD_BASE_URL = "https://platform.nector.io";
export const API_DEV_BASE_URL = "https://devplatform.nector.io";


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

			has_signature: true,
		},
		get: {
			endpoint: "/coupons/{id}",
			prefix: "/api/v2/merchant",

		},
		fetch: {
			endpoint: "/coupons",
			prefix: "/api/v2/merchant",

		}
	},
	currency: {
		get: {
			endpoint: "/currencies/{id}",
			prefix: "/api/v2/merchant",

		},
		fetch: {
			endpoint: "/currencies",
			prefix: "/api/v2/merchant",

		}
	},
	deal: {
		reward: {
			endpoint: "/dealrewards",
			prefix: "/api/v2/merchant",

			has_signature: true,
		},
		get: {
			endpoint: "/deals/{id}",
			prefix: "/api/v2/merchant",

		},
		fetch: {
			endpoint: "/deals",
			prefix: "/api/v2/merchant",

		}
	},
	lead: {
		create: {
			endpoint: "/leads",
			prefix: "/api/v2/merchant",

			has_signature: true,
		},
		get: {
			endpoint: "/leads/{id}",
			prefix: "/api/v2/merchant",

		},
		save: {
			endpoint: "/leads/{id}",
			prefix: "/api/v2/merchant",

			has_signature: true,
		}
	},
	notification: {
		get: {
			endpoint: "/notifications/{id}",
			prefix: "/api/v2/merchant",

		},
		fetch: {
			endpoint: "/notifications",
			prefix: "/api/v2/merchant",

		}
	},
	review: {
		create: {
			endpoint: "/reviews",
			prefix: "/api/v2/merchant",

			has_signature: true,
		},
		get: {
			endpoint: "/reviews/{id}",
			prefix: "/api/v2/merchant",

		},
		save: {
			endpoint: "/reviews/{id}",
			prefix: "/api/v2/merchant",

			has_signature: true,
		},
		delete: {
			endpoint: "/reviews/{id}",
			prefix: "/api/v2/merchant",

		},
		fetch: {
			endpoint: "/reviews",
			prefix: "/api/v2/merchant",

		}
	},
	setting: {
		get: {
			endpoint: "/settings/{id}",
			prefix: "/api/v2/merchant",

		},
	},
	swap: {
		create: {
			endpoint: "/swaps",
			prefix: "/api/v2/merchant",

			has_signature: true,
		},
		get: {
			endpoint: "/swaps/{id}",
			prefix: "/api/v2/merchant",

		},
		fetch: {
			endpoint: "/swaps",
			prefix: "/api/v2/merchant",

		}
	},
	task: {
		get: {
			endpoint: "/tasks/{id}",
			prefix: "/api/v2/merchant",

		},
		fetch: {
			endpoint: "/tasks",
			prefix: "/api/v2/merchant",

		}
	},
	taskactivity: {
		create: {
			endpoint: "/taskactivities",
			prefix: "/api/v2/merchant",

			has_signature: true,
		},
		get: {
			endpoint: "/taskactivities/{id}",
			prefix: "/api/v2/merchant",

		},
		fetch: {
			endpoint: "/taskactivities",
			prefix: "/api/v2/merchant",

		}
	},
	wallet: {
		create: {
			endpoint: "/wallets",
			prefix: "/api/v2/merchant",

			has_signature: true,
		},
		get: {
			endpoint: "/wallets/{id}",
			prefix: "/api/v2/merchant",

		},
		fetch: {
			endpoint: "/wallets",
			prefix: "/api/v2/merchant",

		}
	},
	wallettransaction: {
		create: {
			endpoint: "/wallettransactions",
			prefix: "/api/v2/merchant",

			has_signature: true,
		},
		get: {
			endpoint: "/wallettransactions/{id}",
			prefix: "/api/v2/merchant",

		},
		fetch: {
			endpoint: "/wallettransactions",
			prefix: "/api/v2/merchant",

		}
	}
};