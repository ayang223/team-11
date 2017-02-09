package com.team11.backend;

import com.google.gson.JsonObject;

/**
 * This class takes a request and does the required actions
 */
public class RequestHandler {

	public RequestHandler() {

	}

	public static JsonObject handleRequest(JsonObject requestJson) {
		//TODO: Parse the request and create a responseJson after steps are completed
		JsonObject responseJson = requestJson;
		responseJson.addProperty("Went through RequestHandler:", true);
		return responseJson;
	}
	
}
