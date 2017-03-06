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
		responseJson = generateDashboardData();
		return responseJson;
	}

	private static JsonObject generateDashboardData() {
		JsonObject dashboardJson = new JsonObject();
		dashboardJson.add("Program", DatabaseHandler.getProgram());
		dashboardJson.add("Location", DatabaseHandler.getLocation());
		dashboardJson.add("Agency", DatabaseHandler.getAgency());
		dashboardJson.add("InventoryOutput", DatabaseHandler.getInventoryOutput());
		dashboardJson.add("Target Population", DatabaseHandler.getTargetPopulation());
		dashboardJson.add("Program Element", DatabaseHandler.getProgramElement());
		dashboardJson.add("Program SubElement", DatabaseHandler.getProgramSubElement());
		dashboardJson.add("Element Directory", DatabaseHandler.getElementDirectory());
		dashboardJson.add("Geo Area", DatabaseHandler.getGeoArea());
		dashboardJson.add("Municipality", DatabaseHandler.getMunicipality());
		dashboardJson.add("Area Directory", DatabaseHandler.getAreaDirectory());
		dashboardJson.add("Donor Engagement", DatabaseHandler.getDonorEngagement());
		dashboardJson.add("Outputs", DatabaseHandler.getOutputs());
		return dashboardJson;
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
		
		for (int column = 1; column <= arrayJson.get(0).getAsJsonArray().size(); column++) {
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
				
				while (!temp.equals("100") && !temp.equals("200") && !temp.equals("300") && dataCategory.equals("Program Elements")){
					DatabaseHandler.insertProgramSubElement(programAndar, temp);
					
					fieldNum++;
					
					fieldName = "FIELD" + Integer.toString(fieldNum);
					temp = itemJson.get(fieldName).getAsString();
					
					dataCategory = checkCategory(itemJson, fieldNum, dataCategory);
				}
			}
			fieldNum++;
			
			// Get variables and inserts into "Geo Area" and "Muncipality" tables
			while (dataCategory.equals("Geographic Focus Area")) {
				String geoArea = checkGeoArea(headers, fieldNum, programCategory);
				String currArea;
				fieldName = "FIELD" + Integer.toString(fieldNum);
				int level = itemJson.get(fieldName).getAsInt();
				
				fieldNum++;
				
				insertGeoArea(programAndar, geoArea, level);
				while (currArea.equals(geoArea) && dataCategory.equals("Geographic Focus Area")){
					String muncipality = headers[fieldNum-1];
					int focusPercent = itemJson.get(fieldName).getAsInt();
					
					insertMuncipality(programAndar, muncipality, focusPercent)
					
					fieldNum++;
					geoArea = checkGeoArea(headers, fieldNum, programCategory);
					dataCategory = checkCategory(itemJson, fieldNum, dataCategory);
				} 
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
		if (!requestJson.has(DATA)) {
			responseJson = RequestHandler.getStatusFailed();
			return responseJson;
		}
		JsonObject data = requestJson.get(DATA).getAsJsonObject();

		// TODO: Parse the request JSON data and insert into database with
		// queries in DatabaseHandler
		// JSON range for Postal codes: FIELD 1-?

		JsonArray arrayJson = requestJson.getAsJsonArray();
		JsonObject itemJson = new JsonObject();

		String fieldName;
		String value;

		for (int row = 1; row <= arrayJson.size(); row++) {
			itemJson = arrayJson.get(row).getAsJsonObject();

			int agencyAndar = itemJson.get("FIELD1").getAsInt();
			String agencyName = itemJson.get("FIELD2").getAsString();
			int programAndar = itemJson.get("FIELD3").getAsInt();
			String programName = itemJson.get("FIELD4").getAsString();
			String website = itemJson.get("FIELD5").getAsString();
			String description = itemJson.get("FIELD6").getAsString();

			int numLocations;

			for (int column = 7; column <= arrayJson.get(row).getAsJsonArray().size(); column = column + 2) {
				fieldName = "FIELD" + Integer.toString(column);
				locationName = itemJson.get(fieldName).getAsString();
				fieldName = "FIELD" + Integer.toString(column + 1);
				locationPostal = itemJson.get(fieldName).getAsString();

				if (!locationName.equals("") || !locationPostal.equals("")) {
					numLocations++;
				}
			}

			// These query have to happen before the location queries
			DatabaseHandler.insertProgram(programAndar, agencyAndar, programName, website, description, numLocations);
			// Why do we need a main postal???
			DatabaseHandler.insertAgency(agencyAndar, agencyName);

			for (int column = 7; column <= arrayJson.get(row).getAsJsonArray().size(); column = column + 2) {
				fieldName = "FIELD" + Integer.toString(column);
				locationName = itemJson.get(fieldName).getAsString();
				fieldName = "FIELD" + Integer.toString(column + 1);
				locationPostal = itemJson.get(fieldName).getAsString();

				if (!locationName.equals("") || !locationPostal.equals("")) {
					DatabaseHandler.insertLocation(programAndar, locationName, locationPostal);
				}
			}
		}
	}

	// TODO: Add any dashboard logic (combining information from different
	// tables, etc.)
	private static String checkCategory(JSONObject itemJson, int fieldNum, String currCategory) {
		String field = "FIELD" + Integer.toString(fieldNum);
		String fieldInfo = itemJson.get(field).getAsString;

		if (currCategory.equals(fieldInfo)) {
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

	private static String checkProgram(ArrayList<String> headers, int fieldNum, String currArea) {

		if (currArea.equals(headers[fieldNum - 1])) {
			return currArea;
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
				return currArea;
			}
		}
	}

	private static String checkGeoArea(ArrayList<String> headers, int fieldNum, String currElement) {

		if (currArea.equals(headers[fieldNum - 1])) {
			return currArea;
		} else {
			switch (fieldInfo) {
			case "First Nation Territories":
			case "Fraser Valley Regional District":
			case "Metro Vancouver Regional District":
			case "Squamish-Lillooet Regional District":
			case "Sunshine Coast Regional District":
			case "Other Areas":
				return fieldInfo;
			default:
				return currArea;
			}
		}
	}
}
