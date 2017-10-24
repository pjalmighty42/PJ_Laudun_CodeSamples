using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using [CompanyName].Data.DataManagement.Context;
using [CompanyName].Data.DataManagement.Entities;

public partial class DataManagement_ExtraPromotionList : PageBase
{
    
	protected void Page_Load(object sender, EventArgs e)
	{
		if (!IsPostBack)
		{
			litScripts.Text = GetBootstrapHeader();

			using (DataManagementDbContext context = new DataManagementDbContext())
			{
				ddlSite.DataValueField = "Id";
				ddlSite.DataTextField = "Name";
				ddlSite.DataSource = context.Sites.OrderBy(s => s.Name).ToList();
				ddlSite.DataBind();
			}

			GetPromotions();
		}
	}



	protected void ddlSite_SelectedIndexChanged(object sender, EventArgs e)
	{
		GetPromotions();
	}

	protected void chkIsActive_CheckedChanged(object sender, EventArgs e)
	{
		GetPromotions();
	}

	protected void grdPromotions_RowCommand(object sender, GridViewCommandEventArgs e)
	{
		if (e.CommandName.Equals("PromotionSetup", StringComparison.OrdinalIgnoreCase))
		{
			LinkButton lnkButton = (LinkButton)e.CommandSource;
			string promoId = lnkButton.CommandArgument;
            		var redirectUrl = string.Format("ExtraPromotionSetup.aspx?Id={0}&sid={1}", promoId, ddlSite.SelectedValue);
            		Response.Redirect(redirectUrl, true);
		}
	}

	private void GetPromotions()
	{
		Guid siteId = Guid.Parse(ddlSite.SelectedValue);
		using (DataManagementDbContext context = new DataManagementDbContext())
		{
			var promos = context.Promotions.Where(p => p.SiteId == siteId);

			if (chkIsActive.Checked)
			{
				promos = promos.Where(p => p.StartDate <= DateTime.Now && p.EndDate >= DateTime.Now);
			}

			grdPromotions.DataSource = promos.OrderBy(p => p.StartDate).ThenBy(p => p.Name).ToList();
			grdPromotions.DataBind();
		}
	}

    protected void btnNewPromo_Click(object sender, EventArgs e)
    {
        Response.Redirect("ExtraPromotionSetup.aspx?sid=" + ddlSite.SelectedValue);
    }
}