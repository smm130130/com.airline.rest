package com.airline.dao;

import java.sql.*;

public class DBConnect {
	
	private static Connection conn = null;
	
	public Connection DBConnection() throws SQLException{
		
		if(conn != null){
			return conn;
		}
			String DB_URL = "jdbc:mysql://localhost:3306/";
			   try{
			      //STEP 2: Register JDBC driver
			      Class.forName("com.mysql.jdbc.Driver");

			      //STEP 3: Open a connection
			      System.out.println("Connecting to database...");
			      conn = DriverManager.getConnection(DB_URL,"root","munavals98");
			      return conn;
			   }
			   catch(Exception e){
				   	//Handle errors for Class.forName
				   	e.printStackTrace();
			   }
			   return conn;
	}
}
