package com.team11.backend;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonElement;
import com.team11.backend.DatabaseHandler;

/**
 * This class contains all dashboard logic
 */
public class DashboardLogic {
	private static final String FIELD158 = "FIELD158";

	public DashboardLogic() {

	}

	public static JsonObject getDashboard(JsonObject requestJson) {
		JsonObject responseJson = new JsonObject();
		responseJson = RequestHandler.getStatusFailed();
		return responseJson;
	}
	
	public static JsonObject importOutput(JsonObject requestJson) {
		boolean success = true;
		JsonObject responseJson = new JsonObject();
		
		JsonArray arrayJson = requestJson.getAsJsonArray();
		JsonObject itemJson = new JsonObject();
				
		// Store column headers into an array list
		// JSON range for InventoryOutput array elements: FIELD 1-158
		ArrayList<String> headers = new ArrayList<String>();
		itemJson = arrayJson.get(0).getAsJsonObject();
		
		for (int column = 1; column <= arrayJson.size(); column++) {
			String field = "FIELD" + Integer.toString(column);
			String fieldHeader = itemJson.get(field).getAsString;
			headers.add(fieldHeader);
		}
		
		// Data extraction and query insertion
		// Data starts at index 1 of arrayJson
		for (int i = 1; i < arrayJson.size(); i++) {
			itemJson = arrayJson.get(i).getAsJsonObject();
			
			// Get InventoryOutput table data
			String funds = itemJson.get("FIELD1").getAsString();
			String focus = itemJson.get("FIELD2").getAsString();
			String outcome = itemJson.get("FIELD3").getAsString();
			String programAndar = itemJson.get("FIELD7").getAsString();
			int yearlyAllocation = itemJson.get("FIELD9").getAsInt();
			String grantStart = itemJson.get("FIELD10").getAsString(); 
			String grantEnd = itemJson.get("FIELD11").getAsString();
			String description = itemJson.get("FIELD12").getAsString();
			String planner = itemJson.get("FIELD13").getAsString();
			
			// Fixes any formatting for InventoryOutput variables
			grantStart = grantStart.subString(0,4) + "-" + grantStart.subString(4,6) + "-" + grantStart.subString(6,8);
			grantEnd = grantEnd.subString(0,4) + "-" + grantEnd.subString(4,6) + "-" + grantEnd.subString(6,8);
			
			// TODO 
			DatabaseHandler.insertInventoryOutput(funds, focus, outcome, programAndar, yearlyAllocation,grantStart, grantEnd, description, planner);
			
			// Variable to help check what data we're looking at
			// First data category starts at FIELD14
			String dataCategory;
			String fieldName;
			String temp;
			int fieldNum = 14;
			
			dataCategory = checkCategory(itemJson, fieldNum, dataCategory);
			fieldNum++;
			
			// NOTE: This procedure must match the csv column ordering
			// Get variables and inserts into "Target Population" table
			while (dataCategory.equals("Target Population")) {
				fieldName = "FIELD" + Integer.toString(fieldNum);
				temp = itemJson.get(fieldName).getAsString();
				
				if (temp.equals("1")) {
					String populationItem = headers[fieldNum];
					DatabaseHandler.insertTargetPopulation(programAndar, populationItem);
				}
				
				fieldNum++;
				dataCategory = checkCategory(itemJson, fieldNum, dataCategory);
			}
			fieldNum++;
			
			// Get variables and inserts into "Program Element" and "Program SubElement" tables
			while (dataCategory.equals("Program Elements")) {
				// Stores program element
				String programCategory = checkProgram(headers, fieldNum, programCategory);
				fieldName = "FIELD" + Integer.toString(fieldNum);
				temp = itemJson.get(fieldName).getAsInt();
				DatabaseHandler.insertProgramElement(programAndar, programCategory, temp);
				fieldNum++;
				
				// Stores subelement values
				fieldName = "FIELD" + Integer.toString(fieldNum);
				temp = itemJson.get(fieldName).getAsString();
				
				while (!temp.equals("100") && !temp.equals("200") && !temp.equals("300")){
					DatabaseHandler.inserProgramSubElement(programAndar, temp);
					
					fieldNum++;
					
					fieldName = "FIELD" + Integer.toString(fieldNum);
					temp = itemJson.get(fieldName).getAsString();
				}
				
				dataCategory = checkCategory(itemJson, fieldNum, dataCategory);
			}
			fieldNum++;
			
			// Get variables and inserts into "Geo Area" and "Muncipality" tables
			while (dataCategory.equals("Geographic Focus Area")) {
				//TODO
				
				fieldNum++;
				dataCategory = checkCategory(itemJson, fieldNum, dataCategory);
			}
			fieldNum++;
			
			// Get variables and inserts into "Donor Engagement" table
			while (dataCategory.equals("Donor Engagement")) {
				fieldName = "FIELD" + Integer.toString(fieldNum);
				temp = itemJson.get(fieldName).getAsString();
				
				if (temp.equals("1")) {
					String donorEngagement = headers[fieldNum];
					DatabaseHandler.insertDonorEngagement(programAndar, donorEngagement);
				}
				
				fieldNum++;
				dataCategory = checkCategory(itemJson, fieldNum, dataCategory);
			}
			fieldNum++;
			
			// Get variables and inserts into "Outputs" table
			while (dataCategory.equals("Outputs") && fieldNum <= headers.size()) {
				fieldName = "FIELD" + Integer.toString(fieldNum);
				String value = itemJson.get(fieldName).getAsString();
				
				if (!value.equals("")) {
					String donorEngagement = headers[fieldNum];
					DatabaseHandler.insertOutput(programAndar, donorEngagement, Integer.parseInt(value));
				}
				
				dataCategory = checkCategory(itemJson, fieldNum, dataCategory);
			}
		}
		
		responseJson = RequestHandler.getStatusSuccess();
		return responseJson;
	}
	
	public static JsonObject importPrograms(JsonObject requestJson) {
		boolean success = true;
		JsonObject responseJson = new JsonObject();
		if (!requestJson.has(DATA)){
			responseJson = RequestHandler.getStatusFailed();
			return responseJson;
		}
		JsonObject data = requestJson.get(DATA).getAsJsonObject();
		
		//TODO: Parse the request JSON data and insert into database with queries in DatabaseHandler
		// JSON range for InventoryOutput: FIELD 1-158
		
		
		
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
	private static String checkCategory(JSONObject itemJson, int fieldNum, String currCategory){
		String field = "FIELD" + Integer.toString(fieldNum);
		String fieldInfo = itemJson.get(field).getAsString;
		
		if (currCategory.equals(fieldInfo)){
			return currCategory;
		} else {
			switch (fieldInfo) {
			case "Target Population":
			case "Program Elements":
			case "Geographic Focus Area":
			case "Donor Engagement":
			case "Outputs":
				return fieldInfo;
			default:
				return currCategory;
			}
		}
	}
	
	private static String checkProgram(ArrayList<String> headers, int fieldNum, String currElement){

		if (currElement.equals(headers[fieldNum-1])){
			return currElement;
		} else {
			switch (fieldInfo) {
			case "Learning Support ":
			case "Social and Emotional Health ":
			case "Connections/Healthy Relationships":
			case "Physical Health and Recreational Activities":
			case "Life Skills":
			case "System Change":
			case "Address Program Barriers/Access":
			case "Food Redistribution":
			case "Information and Referral":
				return fieldInfo;
			default:
				return currElement;
			}
		}
	}
}
