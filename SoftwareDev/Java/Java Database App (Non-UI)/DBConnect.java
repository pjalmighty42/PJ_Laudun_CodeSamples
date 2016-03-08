/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package database_console;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.ResultSet;

/**
 *
 * @author pjlx911PC
 */
public class DBConnect {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) 
    {
        // TODO code application logic here
        
        
        try
        {
            //DB settings, user name, and password
            String host ="jdbc:derby://localhost:1527/Employees";
            String uName = "user1";
            String uPass = "password";
                
            //Connect to DB
            Connection conn = DriverManager.getConnection(host, uName, uPass);
            
            //Get a new state of our DB (Can read/write, notices Updates)
            Statement state = conn.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE,
                    ResultSet.CONCUR_UPDATABLE);
            String SQL ="SELECT * FROM Workers";
            ResultSet result = state.executeQuery(SQL);
            
            //Move the cursor to the 1st record
            while(result.next())
            {
                //Get the row result of the row
                int colID = result.getInt("ID");
                String firstName = result.getString("FIRST_NAME");
                String lastName = result.getString("LAST_NAME");
                String job = result.getString("JOB_TITLE");

                System.out.println(colID + " " + firstName + " " + lastName + " " + job);
            }
        }
        catch(SQLException e)
        {
            System.out.println(e.getMessage());
        }
    }
    
}
