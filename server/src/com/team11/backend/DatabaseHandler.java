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
	public static boolean insertInventoryOutput(String fileName, String area, String funds, String focus, String outcome, String funding, int programAndar, int yearlyAllocation, String grantStart, String grantEnd, String description, String planner) {
		Connection conn = null;
		PreparedStatement stmt = null;
		String sql = "INSERT INTO AndarDataOutput (file_name, area, funds, focus, outcome, funding, program_andar, yearly_allocation, grant_start, grant_end, description, planner) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
		boolean success = true;
		try {
			conn = getConnection();

			stmt = conn.prepareStatement(sql);
			stmt.setString(1, fileName);
			stmt.setString(2, area);
			stmt.setString(3, funds);
			stmt.setString(4, focus);
			stmt.setString(5, outcome);
			stmt.setString(6, funding);
			stmt.setInt(7, programAndar);
			stmt.setInt(8, yearlyAllocation);
			stmt.setString(9, grantStart);
			stmt.setString(10, grantEnd);
			stmt.setString(11, description);
			stmt.setString(12, planner);
			int count = stmt.executeUpdate();
			success = count > 0;
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
	
	public static boolean insertTargetPopulation(int programAndar, String population) {
		Connection conn = null;
		PreparedStatement stmt = null;
		String sql = "INSERT INTO TargetPopulation (andar_id, population) VALUES (?, ?)";
		boolean success = true;
		try {
			conn = getConnection();

			stmt = conn.prepareStatement(sql);
			stmt.setInt(1, programAndar);
			stmt.setString(2, population);
			int count = stmt.executeUpdate();
			success = count > 0;
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
	
	public static boolean insertProgramElement(int programAndar, String element, int level) {
		Connection conn = null;
		PreparedStatement stmt = null;
		String sql = "INSERT INTO ProgramElement (andar_id, element, level) VALUES (?, ?, ?)";
		boolean success = true;
		try {
			conn = getConnection();

			stmt = conn.prepareStatement(sql);
			stmt.setInt(1, programAndar);
			stmt.setString(2, element);
			stmt.setInt(3, level);
			int count = stmt.executeUpdate();
			success = count > 0;
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
	
	public static boolean insertProgramSubElement(int programAndar, String subElement) {
		Connection conn = null;
		PreparedStatement stmt = null;
		String sql = "INSERT INTO ProgramSubElement (andar_id, subElement) VALUES (?, ?)";
		boolean success = true;
		try {
			conn = getConnection();

			stmt = conn.prepareStatement(sql);
			stmt.setInt(1, programAndar);
			stmt.setString(2, subElement);
			int count = stmt.executeUpdate();
			success = count > 0;
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
	
	public static boolean insertGeoArea(int programAndar, String area, int level) {
		Connection conn = null;
		PreparedStatement stmt = null;
		String sql = "INSERT INTO GeoArea (andar_id, area, level) VALUES (?, ?, ?)";
		boolean success = true;
		try {
			conn = getConnection();

			stmt = conn.prepareStatement(sql);
			stmt.setInt(1, programAndar);
			stmt.setString(2, area);
			stmt.setInt(3, level);
			int count = stmt.executeUpdate();
			success = count > 0;
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
	
	public static boolean insertMuncipality(int programAndar, String municipality, int focusPercent) {
		Connection conn = null;
		PreparedStatement stmt = null;
		String sql = "INSERT INTO Municipality (andar_id, municipality, focus_percentage) VALUES (?, ?, ?)";
		boolean success = true;
		try {
			conn = getConnection();

			stmt = conn.prepareStatement(sql);
			stmt.setInt(1, programAndar);
			stmt.setString(2, municipality);
			stmt.setInt(3, focusPercent);
			int count = stmt.executeUpdate();
			success = count > 0;
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
	public static boolean insertUser(String username, String password, String firstName, String lastName, boolean adminPrivileges) {
		Connection conn = null;
		PreparedStatement stmt = null;
		String sql = "INSERT INTO Users (username, password, first_name, last_name, admin_privileges) VALUES (?, ?, ?, ?, ?)";
		boolean success = true;
		try {
			conn = getConnection();

			stmt = conn.prepareStatement(sql);
			stmt.setString(1, username);
			stmt.setString(2, password);
			stmt.setString(3, firstName);
			stmt.setString(4, lastName);
			stmt.setBoolean(5, adminPrivileges);
			int count = stmt.executeUpdate();
			success = count > 0;
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
