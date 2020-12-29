import custom_error from "./custom_error";

class CustomGenericError extends custom_error {
	message: string;
	code: number;

	constructor(message: string, code?: number) {
		super(message);

		this.name = this.constructor.name;
		this.message = message;
		this.code = code || 400;
	}

	// getters
	get_name(): string {
		return this.name;
	}

	get_message(): string {
		return this.message;
	}

	get_code(): string {
		return this.message;
	}
}

export default CustomGenericError;