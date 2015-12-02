using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace BusinessSolutionMain
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        DBConn objConnect;
        string connStr;     

        DataSet ds;
        DataRow dr;

        int MaxRows;
        int incr = 0;

        float endHr = 0;
        float endMin = 0;
        float startHr = 0;
        float startMin = 0;
        float currTotalHr = 0;
        float currTotalMin = 0;
        float currTotalTime = 0;
        
        private void Form1_Load(object sender, EventArgs e)
        {
            try
            {
                //Open a new Connection to our DB 
                //and gain access to the connections string in the Properties settings
                objConnect = new DBConn();      
                connStr = Properties.Settings.Default.EmployeesConnStr;

                //allows us to gain access to our Properties conn string for modding
                objConnect.connection_string = connStr;

                //passes the Properties SQL to our SQL object 
                objConnect.Sql = Properties.Settings.Default.SQL;

                //returns the value passed into our objConnect into a DataSet
                ds = objConnect.GetConnection;
                //assigns our only table in our DB
                MaxRows = ds.Tables[0].Rows.Count;

                NavRecs();
            }
            catch (Exception err)
            {
                MessageBox.Show(err.Message);
            }
        }

        //Creates our values for inside our TextBoxes
        private void NavRecs()
        {
            //increments to the various employees
            dr = ds.Tables[0].Rows[incr];

            //sets the values of the DB table into the TextBoxes
            tb_FirstName.Text = dr.ItemArray.GetValue(1).ToString();
            tb_LastName.Text = dr.ItemArray.GetValue(2).ToString();
            tb_JobTitle.Text = dr.ItemArray.GetValue(3).ToString();
            tb_Department.Text = dr.ItemArray.GetValue(4).ToString();
            tb_totalHours.Text = dr.ItemArray.GetValue(5).ToString();
        }

        private void btn_fwd_Click(object sender, EventArgs e)
        {
            //check for more than last entry, error message if it is
            if (incr != MaxRows - 1)
            {
                incr++;
                NavRecs();
            }
            else
            {
                MessageBox.Show("No More Rows!");
            }
        }

        private void button1_Click(object sender, EventArgs e)
        {
            //check for less than first entry, error message if it is
            if (incr > 0)
            {
                incr--;
                NavRecs();
            }
            else
            {
                MessageBox.Show("At 1st Record!");
            }
        }

        private void btn_first_Click(object sender, EventArgs e)
        {
            if (incr != 0)
            {
                incr = 0;
                NavRecs();
            }
            else
            {
                MessageBox.Show("At 1st Record!");
            }
        }

        private void btn_last_Click(object sender, EventArgs e)
        {
            if (incr != MaxRows - 1)
            {
                incr = MaxRows - 1;
                NavRecs();
            }
            else
            {
                MessageBox.Show("At Last Record!");
            }
        }

        //Hours for Start and End Times
        private void tb_StartTime_TextChanged(object sender, EventArgs e)
        {
            double startH;
            startH = Convert.ToDouble(tb_StartTimeHrs.Text);

            startHr = (float)startH;
        }

        private void textBox1_TextChanged(object sender, EventArgs e)
        {
            double endH;
            endH = Convert.ToDouble(tb_EndTimeHrs.Text);

            endHr = (float)endH;

            currTotalHr = startHr + endHr;

            if (endHr > 24.0f)
            {
                endHr = 24.0f;
            }

            if (endHr < 0.0f)
            {
                endHr = 0.0f;
            }
        }

        //Minutes for Start and End Times
        private void textBox2_TextChanged(object sender, EventArgs e)
        {
            double startM;
            startM = Convert.ToDouble(tb_StartTimeMins.Text);

            startMin = (float)startM;
        }

        private void textBox3_TextChanged(object sender, EventArgs e)
        {
            double endM;
            endM = Convert.ToDouble(tb_EndTimesMins.Text);

            endMin = (float)endM;

            currTotalMin = startMin + endMin;

            if (currTotalMin >= 60.0f)
            {
                currTotalHr = currTotalHr + 1;
            }
            if (endMin < 0.0f)
            {
                endMin = 0.0f;
            }
        }

        private void btn_Add_Click(object sender, EventArgs e)
        {
            //Clears all fields on Add Btn click + disables Add Btn
            tb_FirstName.Clear();
            tb_LastName.Clear();
            tb_JobTitle.Clear();
            tb_Department.Clear();
            tb_totalHours.Clear();

            tb_StartTimeHrs.Clear();
            tb_StartTimeMins.Clear();
            tb_EndTimeHrs.Clear();
            tb_EndTimesMins.Clear();

            btn_Add.Enabled = false;
            btn_Cancel.Enabled = true;
            btn_Save.Enabled = true;
        }

        private void btn_Cancel_Click(object sender, EventArgs e)
        {
            //On Cancel Btn, reset back to prior record + disable Cancel and Save Btns
            NavRecs();

            btn_Cancel.Enabled = false;
            btn_Save.Enabled = false;
            btn_Add.Enabled = true;
        }

        private void btn_Save_Click(object sender, EventArgs e)
        {
            //Will be used to add new rows to the DB
            DataRow row = ds.Tables[0].NewRow();

            //Assign inputted values into the new DB Row
            row[1] = tb_FirstName.Text;
            row[2] = tb_LastName.Text;
            row[3] = tb_JobTitle.Text;
            row[4] = tb_Department.Text;
            row[5] = currTotalHr;

            //Adds the values to the new row
            ds.Tables[0].Rows.Add(row);

            try
            {
                //Adds/Updates our DB with a new row
                objConnect.UpdateDB(ds);

                MaxRows = MaxRows + 1;
                incr = MaxRows - 1;

                MessageBox.Show("Database Updated!");
            }
            catch (Exception err)
            {

                MessageBox.Show(err.Message);
            }

            //Reset the buttons after Update
            btn_Cancel.Enabled = false;
            btn_Save.Enabled = false;
            btn_Add.Enabled = true;
        }

        private void groupBox4_Enter(object sender, EventArgs e)
        {

        }

        private void btn_Update_Click(object sender, EventArgs e)
        {
            currTotalTime = currTotalHr + currTotalMin;

            DataRow row = ds.Tables[0].Rows[incr];

            float currRow5Val = (float)row[5];

            row[1] = tb_FirstName.Text;
            row[2] = tb_LastName.Text;
            row[3] = tb_JobTitle.Text;
            row[4] = tb_Department.Text;
            row[5] = currRow5Val + currTotalTime;

            try
            {
                objConnect.UpdateDB(ds);
                MessageBox.Show("Record Updated!");
            }
            catch (System.Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }
    }
}
