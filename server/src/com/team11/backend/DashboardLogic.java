package com.team11.backend;

import com.google.gson.JsonObject;
import com.team11.backend.DatabaseHandler;

/**
 * This class contains all dashboard logic
 */
public class DashboardLogic {
	private static final String DATA = "data";

	public DashboardLogic() {

	}

	public static JsonObject getDashboard(JsonObject requestJson) {
		JsonObject responseJson = new JsonObject();
		responseJson = RequestHandler.getStatusFailed();
		return responseJson;
	}

	public static JsonObject importData(JsonObject requestJson) {
		boolean success = true;
		JsonObject responseJson = new JsonObject();
		if (!requestJson.has(DATA)){
			responseJson = RequestHandler.getStatusFailed();
			return responseJson;
		}
		JsonObject data = requestJson.get(DATA).getAsJsonObject();
		
		//TODO: Parse the request JSON data and insert into database with queries in DatabaseHandler
		
		if(!success) {
			responseJson = RequestHandler.getStatusFailed();
			return responseJson;
		} else {
			responseJson = RequestHandler.getStatusSuccess();
			return responseJson;
		}
	}

	// TODO: Add any dashboard logic (combining information from different
	// tables, etc.)
}
