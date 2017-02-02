package com.team11.backend;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.PreparedStatement;

public class DatabaseHandler {
	// JDBC driver and database name
	static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";
	static final String DB_URL = "jdbc:mysql://localhost:3306/United_Way_Andar_DB";
	// Database credentials
	static final String USER = "root";
	static final String PASS = "root";

	public DatabaseHandler() {

	}

	public static String getUsers() {
		Connection conn = null;
		PreparedStatement stmt = null;
		String sql = "SELECT * FROM Users";
		String userInfo = "";

		try {
			Class.forName(JDBC_DRIVER);
			conn = DriverManager.getConnection(DB_URL, USER, PASS);

			stmt = conn.prepareStatement(sql);
			ResultSet rs = stmt.executeQuery();

			while (rs.next()) {
				int id = rs.getInt("id");
				String username = rs.getString("username");
				String first = rs.getString("first_name");
				String last = rs.getString("last_name");

				String currentUser = String.format("ID: %d, Username: %s, First Name: %s, Last Name: %s \n", id,
						username, first, last);
				userInfo = userInfo + currentUser;
			}
		} catch (SQLException e) {
			userInfo = e.getMessage();
		} catch (ClassNotFoundException e) {
			userInfo = e.getMessage();
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
}
