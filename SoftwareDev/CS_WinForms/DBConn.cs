using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessSolutionMain
{
    class DBConn
    {
        private string sql_string;
        private string strConn;

        System.Data.SqlClient.SqlDataAdapter da1; //needed to open up the table in the DB

        //Setter that will set the SQL string in the properties
        public string Sql
        {
            set { sql_string = value; }
        }

        //Setter that will store the Connection String we set up in the properties
        public string connection_string
        {
            set { strConn = value; }
        }

        //allows us to manipulate this instead of the database directly
        public System.Data.DataSet GetConnection
        {
            get { return MyDataSet(); }
        }

        //connect to the DataSet, fill it out with new info
        private System.Data.DataSet MyDataSet()
        {
            //will use this to connect to the DB
            System.Data.SqlClient.SqlConnection conn = new System.Data.SqlClient.SqlConnection(strConn);

            conn.Open();

            //needed to tell which records we want from the table in the DB
            da1 = new System.Data.SqlClient.SqlDataAdapter(sql_string, conn);

            //open up access to the data set
            System.Data.DataSet data_set = new System.Data.DataSet();

            //fill out the DB with the new values in the data set
            da1.Fill(data_set, "Table_Data_1");
            //Close connection
            conn.Close();
            //return out the function
            return data_set;
        }

        //needed to update our DB
        public void UpdateDB(System.Data.DataSet dataSet)
        {
            //Command Builder object for auto update
            System.Data.SqlClient.SqlCommandBuilder cb = new System.Data.SqlClient.SqlCommandBuilder(da1);

            //Update our DB
            cb.DataAdapter.Update(dataSet.Tables[0]);
        }
    }
}
