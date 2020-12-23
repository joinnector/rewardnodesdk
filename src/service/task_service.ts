import base_sdk_service from "./base_sdk_service";

class TaskService extends  base_sdk_service {
	constructor(name: string) {
		super(name);
	}
}

const task_service = new TaskService("task");
export default task_service;