
declare module "winston-logsene" {
	interface ConstructorOptions {
		url: string;
		token: string;
		[name: string]: any;
	}

	class Logsene {
		constructor(obj: ConstructorOptions)
	}
}