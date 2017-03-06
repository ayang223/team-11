package com.team11.backend;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.team11.backend.RequestHandler;

import java.sql.PreparedStatement;

/**
 * This class handles all queries to the database
 */
public class DatabaseHandler {
	// JDBC driver and database name
	static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";
	static final String DB_URL = "jdbc:mysql://localhost:3306/United_Way_Andar_DB";
	// Database credentials
	static final String USER = "root";
	static final String PASS = "root";
	// Database column numbers
	static final int FIRST = 1;
	static final int SECOND = 2;
	static final int THIRD = 3;
	static final int FOURTH = 4;
	static final int FIFTH = 5;
	static final int SIXTH = 6;
	static final int SEVENTH = 7;
	static final int EIGHTH = 8;
	static final int NINTH = 9;
	static final int TENTH = 10;
	
	public DatabaseHandler() {

	}
	
	// InventoryOutput Queries
	public static boolean insertInventoryOutput(String funds, String focus, String outcome, int programAndar, String yearlyAllocation, String grantStart, String grantEnd, String description, String planner) {
		//TODO
	}
	
	public static boolean insertTargetPopulation(int programAndar, String population) {
		//TODO
	}
	
	public static boolean insertProgramElement(int programAndar, String element, int level) {
		//TODO
	}
	
	public static boolean insertProgramSubElement(int programAndar, String subElement) {
		//TODO
	}
	
	public static boolean insertGeoArea(int programAndar, String area, int level) {
		//TODO
	}
	
	public static boolean insertMuncipality(int programAndar, String muncipality, int focusPercent) {
		//TODO
	}
	
	public static boolean insertDonorEngagement(int programAndar, String engagement) {
		//TODO
	}
	
	public static boolean insertOutput(int programAndar, String type, int value) {
		//TODO
	}
	
	public static boolean insertProgram(int programAndar, int agencyAndar, String name, String website, String description, int numLocations) {
		//TODO
	}
	
	public static boolean insertAgency(int agencyAndar, String name) {
		//TODO
	}
	
	public static boolean insertLocation(int programAndar, String name, String postal) {
		//TODO
		//Get ID based on MySQL table count
	}
	
	// User Queries
	public static boolean insertUser(int id, String username, String password, String firstName, String lastName, boolean adminPrivileges) {
		Connection conn = null;
		PreparedStatement stmt = null;
		String sql = "INSERT INTO USERS (id, username, password, first_name, last_name, admin_privileges) VALUES (?, ?, ?, ?, ?, ?)";
		boolean success = true;
		try {
			conn = getConnection();
			
			stmt = conn.prepareStatement(sql);
			stmt.setInt(FIRST, id);
			stmt.setString(SECOND, username);
			stmt.setString(THIRD, password);
			stmt.setString(FOURTH, firstName);
			stmt.setString(FIFTH, lastName);
			stmt.setBoolean(SIXTH, adminPrivileges);
			int count = stmt.executeUpdate();
			if (count > 0) {
				success = true;
			} else {
				success = false;
			}
		} catch (SQLException e) {
			success = false;
		} catch (ClassNotFoundException e) {
			success = false;
		} finally {
			if (stmt != null) {
				try {
					stmt.close();
				} catch (SQLException e) {
					// Do nothing
				}
			}
			if (conn != null) {
				try {
					conn.close();
				} catch (SQLException e) {
					// Do nothing
				}
			}
		}
		
		return success;
	}

	public static JsonArray getUsers() {
		Connection conn = null;
		PreparedStatement stmt = null;
		String sql = "SELECT * FROM Users";
		JsonArray userInfo = new JsonArray();

		try {
			conn = getConnection();

			stmt = conn.prepareStatement(sql);
			ResultSet rs = stmt.executeQuery();

			while (rs.next()) {
				JsonObject user = new JsonObject();
				int id = rs.getInt("id");
				String username = rs.getString("username");
				String first = rs.getString("first_name");
				String last = rs.getString("last_name");
				user.addProperty("ID", id);
				user.addProperty("Username", username);
				user.addProperty("First Name", first);
				user.addProperty("Last Name", last);

				userInfo.add(user);
			}
		} catch (SQLException e) {
			JsonObject queryFailed = RequestHandler.getStatusFailed();
			userInfo.add(queryFailed);
		} catch (ClassNotFoundException e) {
			JsonObject queryFailed = RequestHandler.getStatusFailed();
			userInfo.add(queryFailed);
		} finally {
			if (stmt != null) {
				try {
					stmt.close();
				} catch (SQLException e) {
					// Do nothing
				}
			}
			if (conn != null) {
				try {
					conn.close();
				} catch (SQLException e) {
					// Do nothing
				}
			}
		}

		return userInfo;
	}

	public static JsonObject verifyUser(String user, String password) {
		JsonObject responseJson = null;
		Connection conn = null;
		PreparedStatement stmt = null;
		String sql = "SELECT * FROM Users WHERE username=? AND password=?";
		try {
			conn = getConnection();
			stmt = conn.prepareStatement(sql);
			stmt.setString(FIRST, user);
			stmt.setString(SECOND, password);
			ResultSet rs = stmt.executeQuery();

			if (rs.isBeforeFirst()) {
				responseJson = RequestHandler.getStatusSuccess();
			} else {
				responseJson = RequestHandler.getStatusFailed();
			}
		} catch (SQLException e) {
			responseJson = RequestHandler.getStatusFailed();
		} catch (ClassNotFoundException e) {
			responseJson = RequestHandler.getStatusFailed();
		} finally {
			if (stmt != null) {
				try {
					stmt.close();
				} catch (SQLException e) {
					// Do nothing
				}
			}
			if (conn != null) {
				try {
					conn.close();
				} catch (SQLException e) {
					// Do nothing
				}
			}
		}

		return responseJson;
	}

	private static Connection getConnection() throws ClassNotFoundException, SQLException {
		Class.forName(JDBC_DRIVER);
		Connection conn = DriverManager.getConnection(DB_URL, USER, PASS);

		return conn;
	}
}
