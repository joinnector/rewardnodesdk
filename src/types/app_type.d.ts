// system import
import string_template from "string-template";
import lodash from "lodash";
import moment from "moment";
import winston from "winston";
import * as axios from "axios";

// app import
import http_method_type_enum from "../enum/http_method_type_enum";
import winston_level_enum from "../enum/winston_level_enum";
import access_source_enum from "../enum/access_source_enum";

// types
// global
export type BooleanNullUnion = boolean | null;
export type StringNullUnion = string | null;
export type ObjectNullUnion = ObjectAnyAttributes | null;
export type StringArrayNullUnion = string[] | null;
export type StringNumberBooleanUnion = string | number | boolean;
export type StringNumberUnion = string | number;
export type StringNullUndefinedUnion = string | null | undefined;
export type AnyAttributes = string | string[] | ObjectAnyAttributes | ObjectAnyAttributes[];

export type WinstonLevelUnion = winston_level_enum.INFO | winston_level_enum.WARN | winston_level_enum.ERROR;
export type HttpMethodUnion = http_method_type_enum.GET | http_method_type_enum.POST | http_method_type_enum.PUT | http_method_type_enum.DELETE | http_method_type_enum.HEAD | http_method_type_enum.OPTIONS;
export type AccessSourceUnion = access_source_enum.MOBILE | access_source_enum.UNIX | access_source_enum.WEB;
export type ContentTypeUnion = "application/json" | "application/x-www-form-urlencoded";

export type DoneFunction = (error?: Error, value?: any) => void;
export type CallbackFunction = (value?: any) => void;

export type MomentInstance = moment.Moment;
export type LodashInstance = typeof lodash;
export type TemplatorInstance = string_template

export type AxiosClientInstance = axios.AxiosInstance;
export type AxiosClientRequestConfig = axios.AxiosRequestConfig;
export type AxiosClientResponse = axios.AxiosResponse;
export type AxiosClientError = axios.AxiosError;

export type WinstonLogger = winston.Logger;

// interfaces
// global
export interface ObjectAnyAttributes {
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	[name: string]: any;
};

export interface WinstonInstance {
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	process_ie_log(level: WinstonLevelUnion, title: string, message?: AnyAttributes, stack?: AnyAttributes, param?: AnyAttributes): void;
}

export interface SecurityInstance {
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	process_hmac_signature(value: string, secret: string): string;
	process_sha256_hash(value: string): string;
}
export interface AxiosInstance {
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	process_axios_get(url: string, headers: AxiosHeader, params: ObjectAnyAttributes): Promise<any>;
	process_axios_put(url: string, headers: AxiosHeader, params: ObjectAnyAttributes, body: ObjectAnyAttributes): Promise<any>;
	process_axios_delete(url: string, headers: AxiosHeader, params: ObjectAnyAttributes): Promise<any>;
	process_axios_post(url: string, headers: AxiosHeader, params: ObjectAnyAttributes, body: ObjectAnyAttributes): Promise<any>;
}

export interface ErrorInfo {
	title: string;
	message: string;
	stack: string;
}

export interface CustomError {
	meta: ObjectAnyAttributes;
	data: ObjectAnyAttributes;
}

export interface CustomValue {
	meta: ObjectAnyAttributes;
	data: ObjectAnyAttributes;
}

export interface AxiosHeader {
	"accept": "application/json";
	"content-type": ContentTypeUnion;
	"x-source": AccessSourceUnion;
	[name: string]: any;
}
export interface SecurityBasicAuthObject {
	name: string;
	pass: string;
}

export interface PagingAttributes {
	limit: number;
	page: number;
	sort?: string;
	sort_op?: "ASC" | "DESC" | "+" | "-";
}