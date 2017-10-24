using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects.DataClasses;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using [CompanyName].Data.AdminDepot.Context;
using [CompanyName].Data.AdminDepot.Entities;
using [CompanyName].Data.DataManagement.Context;
using [CompanyName].Data.DataManagement.Entities;


public partial class DataManagement_ExtraPromotionSetup : PageBase
{
    private string _promotionId = string.Empty;
    private string _siteId = string.Empty;
    private string PromotionmId
    {
        get
        {
            if (Request.QueryString["id"] != null)
            {
                _promotionId = Request.QueryString["id"];
            }
            return _promotionId;
        }
    }

    private string SiteId
    {
        get
        {
            if (Request.QueryString["sid"] != null)
            {
                _siteId = Request.QueryString["sid"];
            }
            return _siteId;
        }
    }

    protected void Page_Load(object sender, EventArgs e)
	{
		if (!IsPostBack)
		{
			litScripts.Text = GetBootstrapHeader();

            string promoID = PromotionmId;

           SetFields(promoID);
        }
	}
    
    protected void btnSavePromo_Click(object sender, EventArgs e)
    {
        string promoID = PromotionmId;

        SaveAll(promoID);
    }

    protected void ddlCountry_SelectedIndexChanged(object sender, EventArgs e)
    {
        string promoID = PromotionmId;

        if (string.IsNullOrEmpty(promoID))
        {
            cblStates.Items.Clear();
            SetBaseStates();
        }
        else
        {
            cblStates.Items.Clear();
            SetBaseStates(promoID);
        }
    }

    #region Setter Functions
    private void SetFields(string id)
    {
        SetPromoFields(id);
    }

    private void SetPromoFields(string id = "")
    {
        SetTextboxes(id);
        SetBaseCountries(id);
        SetBasePromotionType(); //Currently left null because "Multiplier" will always be an option
        SetToFromDates(id);
        SetBaseProductGroup(id);
        SetBaseServiceCenterConcepts(id);
        SetBaseStates(id);
    }

    private void SetTextboxes(string id = "")
    {
        if (string.IsNullOrEmpty(id))
        {
            txtPromoName.Text = "";
        }
        else
        {
            Guid guid = Guid.Parse(id);

            using (DataManagementDbContext context = new DataManagementDbContext())
            {
                [CompanyName].Data.DataManagement.Entities.Promotion promo = context.Promotions.FirstOrDefault(p => p.Id == guid);

                if (promo != null)
                {
                    txtPromoName.Text = promo.Name;
                    tbMulitplier.Text = promo.Multiplier.ToString();
                }
            }
        }
    }

    private void SetBasePromotionType(/*string id = ""*/)
    {
        List<string> promoTypes = new List<string>();

        promoTypes.Add("Muliplier");

        foreach (string pt in promoTypes)
        {
            ddlPromoType.Items.Add(pt);
        }
        
    }

    private void SetBaseCountries(string id = "")
    {
        List<string> countryCodes = new List<string>();

        countryCodes.Add("US");
        countryCodes.Add("CA");
        
        foreach (string cc in countryCodes)
        {
            ddlCountry.Items.Add(cc);
        }

        if (!string.IsNullOrEmpty(id))
        {
            Guid guid = Guid.Parse(id);

            using (DataManagementDbContext context = new DataManagementDbContext())
            {
                [CompanyName].Data.DataManagement.Entities.Promotion promo = context.Promotions.FirstOrDefault(p => p.Id == guid);

                if (promo != null)
                {
                    ddlCountry.SelectedValue = promo.Country;
                }
            }
        }
    }

    private void SetBaseProductGroup(string id = "")
    {
        using (DataManagementDbContext context = new DataManagementDbContext())
        {
            List<PickList> productGroups = context.GetPickListItems(PickList.PickListType.ProductCategory).OrderBy(p => p.ItemName).ToList();

            foreach (PickList pg in productGroups)
            {
                cblProductGroups.Items.Add(pg.ItemName);
            }

            if (!string.IsNullOrEmpty(id))
            {
                Guid promoId = Guid.Parse(id);

                List<PromotionProductCategory> promoProductGroups = context.PromotionProductCategories.Where(p => p.PromotionId == promoId).ToList();
                List<PickList> pickListItems = new List<PickList>();

                foreach (PromotionProductCategory ppg in promoProductGroups)
                {
                    PickList pickListItem = context.GetPickListItems(PickList.PickListType.ProductCategory).FirstOrDefault(p => p.Id == ppg.ProductCategoryPickListId);

                    if (pickListItem != null)
                    {
                        pickListItems.Add(pickListItem);
                    }

                }

                pickListItems.OrderBy(p => p.ItemName);

                if (pickListItems.Count > 0)
                {
                    foreach (PickList st in pickListItems)
                    {
                        foreach (ListItem cbl in cblProductGroups.Items)
                        {
                            if (cbl.Value == st.ItemName.ToString())
                            {
                                cbl.Selected = true;
                            }
                        }
                    }
                }
            }
        }
    }

    private void SetBaseServiceCenterConcepts(string id = "")
    {
        using (DataManagementDbContext context = new DataManagementDbContext())
        {
            List<PickList> serviceCenterConcepts = context.GetPickListItems(PickList.PickListType.ServiceCenterConcept).OrderBy(p => p.ItemValue).ToList();

            foreach (PickList pg in serviceCenterConcepts)
            {
                cblServiceCC.Items.Add(pg.ItemValue);
            }


            if (!string.IsNullOrEmpty(id))
            {
                Guid guid = Guid.Parse(id);

                List<PromotionCustomerGroup> promoServiceCenterConcepts = context.PromotionCustomerGroups.Where(p => p.PromotionId == guid).ToList();
                List<PickList> pickListItems = new List<PickList>();
                
                foreach (PromotionCustomerGroup pscc in promoServiceCenterConcepts)
                {
                    PickList pickListItem = context.GetPickListItems(PickList.PickListType.ServiceCenterConcept).FirstOrDefault(p => p.Id == pscc.CustomerGroupPickListId);

                    if (pickListItem != null)
                    {
                        pickListItems.Add(pickListItem);
                    }
                        
                }

                pickListItems.OrderBy(p => p.ItemValue);

                if (pickListItems.Count > 0)
                {
                    foreach (PickList st in pickListItems)
                    {
                        foreach (ListItem cbl in cblServiceCC.Items)
                        {
                            if (cbl.Value == st.ItemValue.ToString())
                            {
                                cbl.Selected = true;
                            }
                        }
                    }
                }
            }
        }
    }

    private void SetBaseStates(string id = "")
     {
        //Occupy the list
        using (AdminDepotDbContext context = new AdminDepotDbContext())
        {
            Country country = new Country();

            switch (ddlCountry.SelectedValue)
            {
                case "US":
                    country = context.Countries.FirstOrDefault(c => c.Abbreviation == "USA");
                    break;
                case "CA":
                    country = context.Countries.FirstOrDefault(c => c.Abbreviation == "CAN");
                    break;
            }

            if (string.IsNullOrEmpty(id))
            {
                List<State> states = country.States.Where(s => s.CountryId == country.Id).OrderBy(s => s.Name).ToList();

                foreach (State s in states)
                {
                    cblStates.Items.Add(s.Name);
                }
            }
            else
            {
                Guid promoID = Guid.Parse(id);

                List<State> states = country.States.Where(s => s.CountryId == country.Id).OrderBy(s => s.Name).ToList();

                foreach (State s in states)
                {
                    cblStates.Items.Add(s.Name);
                }

                List<[CompanyName].Data.DataManagement.Entities.PromotionState> promoStates = new List<[CompanyName].Data.DataManagement.Entities.PromotionState>();

                using (DataManagementDbContext dataContext = new DataManagementDbContext())
                {
                    promoStates = dataContext.PromotionStates.Where(p => p.PromotionId == promoID).OrderBy(p => p.State).ToList();
                }
                   
                List<State> dbSelStates = new List<State>();

                if (promoStates.Count > 0)
                {
                    foreach ([CompanyName].Data.DataManagement.Entities.PromotionState st in promoStates)
                    {
                        State newState = context.States.FirstOrDefault(s => s.Code == st.State);

                        if (newState != null)
                        {
                            dbSelStates.Add(newState);
                        }
                    }


                    foreach (ListItem cbl in cblStates.Items)
                    {
                        foreach (State dbState in dbSelStates)
                        {
                            if (cbl.Value == dbState.Name.ToString())
                            {
                                cbl.Selected = true;
                            }
                        }
                    }
                }
            }
        }
    }

    private void SetToFromDates(string id = "")
    {
        if (!string.IsNullOrEmpty(id))
        {
            Guid guid = Guid.Parse(id);

            using (DataManagementDbContext context = new DataManagementDbContext())
            {
                [CompanyName].Data.DataManagement.Entities.Promotion promo = context.Promotions.FirstOrDefault(p => p.Id == guid);

                if (promo != null)
                {
                    dteValidFrom.Text = promo.StartDate.ToString("MMMM dd yyyy");
                    dteValidTo.Text = promo.EndDate.ToString("MMMM dd yyyy");
                }
            }
        }
    }
    #endregion

    #region Saver Functions
    private void SaveAll(string id = "")
    {
        if (!string.IsNullOrEmpty(id))
        {
            Guid promoId = Guid.Parse(id);

            using (DataManagementDbContext context = new DataManagementDbContext())
            {
                //Gather all the saved items for this Promotion
                [CompanyName].Data.DataManagement.Entities.Promotion thisPromo = context.Promotions.FirstOrDefault(p => p.Id == promoId);

                List<PromotionCustomerGroup> savedPromoCustGrps = context.PromotionCustomerGroups.Where(p => p.PromotionId == promoId).ToList();
                List<PromotionProductCategory> savedPromoProdCats = context.PromotionProductCategories.Where(p => p.PromotionId == promoId).ToList();

                List<[CompanyName].Data.DataManagement.Entities.PromotionState> savedPromoStates = context.PromotionStates.Where(s => s.PromotionId == promoId).ToList();

                List<PickList> savedProductCatList = new List<PickList>();
                List<PickList> savedServiceConceptList = new List<PickList>();

                foreach (PromotionCustomerGroup savedPCG in savedPromoCustGrps)
                {
                    PickList pickListItem = context.GetPickListItems(PickList.PickListType.ServiceCenterConcept).FirstOrDefault(p => p.Id == savedPCG.CustomerGroupPickListId);

                    if (pickListItem != null)
                    {
                        savedServiceConceptList.Add(pickListItem);
                    }
                }

                foreach (PromotionProductCategory savedPPC in savedPromoProdCats)
                {
                    PickList pickListItem = context.GetPickListItems(PickList.PickListType.ProductCategory).FirstOrDefault(p => p.Id == savedPPC.ProductCategoryPickListId);

                    if (pickListItem != null)
                    {
                        savedProductCatList.Add(pickListItem);
                    }
                }

                //Gather all the selected items from the page
                List<PickList> selectedProductionGrps = new List<PickList>();
                List<PickList> selectedServiceConcepts = new List<PickList>();
                List<[CompanyName].Data.DataManagement.Entities.PromotionState> selectedPromoStates = new List<[CompanyName].Data.DataManagement.Entities.PromotionState>();

                foreach (ListItem cbl in cblProductGroups.Items)
                {
                    if (cbl.Selected)
                    {
                        PickList pickListItem = context.PickLists.FirstOrDefault(p => p.ItemName == cbl.Value);

                        if (pickListItem != null)
                        {
                            selectedProductionGrps.Add(pickListItem);
                        }
                    }
                }

                foreach (ListItem cbl in cblServiceCC.Items)
                {
                    if (cbl.Selected)
                    {
                        PickList pickListItem = context.PickLists.FirstOrDefault(p => p.ItemValue == cbl.Value);

                        if (pickListItem != null)
                        {
                            selectedServiceConcepts.Add(pickListItem);
                        }
                    }
                }

                foreach (ListItem cbl in cblStates.Items)
                {
                    if (cbl.Selected)
                    {
                        State pickedState = new State();

                        using (AdminDepotDbContext adminContext = new AdminDepotDbContext())
                        {
                            pickedState = adminContext.States.FirstOrDefault(s => s.Name == cbl.Value);
                        }

                        if (pickedState != null)
                        {
                            [CompanyName].Data.DataManagement.Entities.PromotionState promoState = context.PromotionStates.FirstOrDefault(ps => ps.PromotionId == promoId && ps.State == pickedState.Code);

                            if (promoState != null)
                            {
                                selectedPromoStates.Add(promoState);
                            }
                            else
                            {
                                [CompanyName].Data.DataManagement.Entities.PromotionState newPromoState = new [CompanyName].Data.DataManagement.Entities.PromotionState()
                                {
                                    Id = Guid.NewGuid(),
                                    PromotionId = promoId,
                                    State = pickedState.Code
                                };

                                selectedPromoStates.Add(newPromoState);
                            }
                        }
                    }
                }

                //Update the Promotion
                thisPromo.Name = txtPromoName.Text;
                thisPromo.Country = ddlCountry.SelectedValue;
                thisPromo.StartDate = DateTime.Parse(dteValidFrom.Text);
                thisPromo.EndDate = DateTime.Parse(dteValidTo.Text);
                thisPromo.Multiplier = Convert.ToDecimal(tbMulitplier.Text);

                //Comparison checks and create the addition/remove lists
                List<PickList> addedProductServicesPickLists = selectedServiceConcepts.Where(p =>
                !savedServiceConceptList.Contains(p)).ToList();
                List<PickList> removeProductServicesPickLists = savedServiceConceptList.Where(p =>
                !selectedServiceConcepts.Contains(p)).ToList();

                List<PickList> addedProductionGrpsPickLists = selectedProductionGrps.Where(p =>
                !savedProductCatList.Contains(p)).ToList();
                List<PickList> removeProductionGrpsPickLists = savedProductCatList.Where(p =>
                !selectedProductionGrps.Contains(p)).ToList();

                List<[CompanyName].Data.DataManagement.Entities.PromotionState> addedPromoStatesLists = selectedPromoStates.Where(p => !savedPromoStates.Contains(p)).ToList();
                List<[CompanyName].Data.DataManagement.Entities.PromotionState> removePromoStatesLists = savedPromoStates.Where(p => !selectedPromoStates.Contains(p)).ToList();

                foreach (PickList remPPC in removeProductServicesPickLists)
                {
                    PromotionCustomerGroup remPromoCustGrp = context.PromotionCustomerGroups.FirstOrDefault(p => p.PromotionId == promoId && p.CustomerGroupPickListId == remPPC.Id);

                    if (remPromoCustGrp != null)
                    {
                        context.PromotionCustomerGroups.Remove(remPromoCustGrp);
                    }
                }

                foreach (PickList addPPC in addedProductServicesPickLists)
                {
                    PromotionCustomerGroup addPromoCustGrp = new PromotionCustomerGroup()
                    {
                        Id = Guid.NewGuid(),
                        PromotionId = promoId,
                        CustomerGroupPickListId = addPPC.Id
                    };

                    context.PromotionCustomerGroups.Add(addPromoCustGrp);
                    
                }

                foreach (PickList remPGP in removeProductionGrpsPickLists)
                {
                    PromotionProductCategory remPromoProdCat = context.PromotionProductCategories.FirstOrDefault(p => p.PromotionId == promoId && p.ProductCategoryPickListId == remPGP.Id);

                    if (remPromoProdCat != null)
                    {
                        context.PromotionProductCategories.Remove(remPromoProdCat);
                    }
                }

                foreach (PickList addPGP in addedProductionGrpsPickLists)
                {
                    PromotionProductCategory addPromoProdCat = new PromotionProductCategory()
                    {
                        Id = Guid.NewGuid(),
                        PromotionId = promoId,
                        ProductCategoryPickListId = addPGP.Id
                    };

                    context.PromotionProductCategories.Add(addPromoProdCat);

                }

                foreach ([CompanyName].Data.DataManagement.Entities.PromotionState remPS in removePromoStatesLists)
                {
                    if (remPS != null)
                    {
                        context.PromotionStates.Remove(remPS);
                    }
                }

                foreach ([CompanyName].Data.DataManagement.Entities.PromotionState addPS in addedPromoStatesLists)
                {
                    if (addPS != null)
                    {
                        context.PromotionStates.Add(addPS);
                    }
                }

                context.SaveChanges();
                Response.Redirect("ExtraPromotionList.aspx", true);
            }
        }
        else
        {
            using (DataManagementDbContext context = new DataManagementDbContext())
            {
                Guid newPromoID = Guid.NewGuid();
                Guid siteId = Guid.Parse(SiteId);

                //Get what is already selected on the screen and store it's PickList values
                List<PickList> pickedProductCategoryPickLists = new List<PickList>();
                List<PickList> pickedCustomerGroupPickLists = new List<PickList>();

                foreach (ListItem pGroups in cblProductGroups.Items)
                {
                    if (pGroups.Selected)
                    {
                        PickList pickListPGItem = context.PickLists.FirstOrDefault(p => p.ItemName == pGroups.Value);

                        if (pickListPGItem != null)
                        {
                            pickedProductCategoryPickLists.Add(pickListPGItem);
                        }
                    }
                }

                foreach (ListItem pServiceCC in cblServiceCC.Items)
                {
                    if (pServiceCC.Selected)
                    {
                        PickList pickListPGItem = context.PickLists.FirstOrDefault(p => p.ItemValue == pServiceCC.Value);

                        if (pickListPGItem != null)
                        {
                            pickedCustomerGroupPickLists.Add(pickListPGItem);
                        }
                    }
                }
            
                [CompanyName].Data.DataManagement.Entities.Promotion newPromo = new [CompanyName].Data.DataManagement.Entities.Promotion
                {
                    Id = newPromoID,
                    SiteId = siteId,
                    Name = txtPromoName.Text,
                    StartDate = DateTime.Parse(dteValidFrom.Text),
                    EndDate = DateTime.Parse(dteValidTo.Text),
                    Country = ddlCountry.SelectedValue,
                    Multiplier = Convert.ToDecimal(tbMulitplier.Text)
                };

                context.Promotions.Add(newPromo);

                foreach (PickList pl in pickedProductCategoryPickLists)
                {
                    PromotionProductCategory newPromoPC = new PromotionProductCategory
                    {
                        Id = Guid.NewGuid(),
                        PromotionId = newPromoID,
                        ProductCategoryPickListId = pl.Id
                    };

                    context.PromotionProductCategories.Add(newPromoPC);
                }

                foreach (PickList ser in pickedCustomerGroupPickLists)
                {
                    PromotionCustomerGroup newPromoSCC = new PromotionCustomerGroup
                    {
                        Id = Guid.NewGuid(),
                        PromotionId = newPromoID,
                        CustomerGroupPickListId = ser.Id
                    };

                    context.PromotionCustomerGroups.Add(newPromoSCC);
                }

                foreach (ListItem pStates in cblStates.Items)
                {
                    if (pStates.Selected)
                    {
                        State selState = new State();

                        using (AdminDepotDbContext admin = new AdminDepotDbContext())
                        {
                            selState = admin.States.FirstOrDefault(s => s.Name == pStates.Value);
                        };

                        //If the promoState is null, it means that there isn't one! Create it!
                        if (selState != null)
                        {
                            [CompanyName].Data.DataManagement.Entities.PromotionState newPromoState = new [CompanyName].Data.DataManagement.Entities.PromotionState()
                            {
                                Id = Guid.NewGuid(),
                                PromotionId = newPromoID,
                                State = selState.Code
                            };

                            context.PromotionStates.Add(newPromoState);
                        }
                    }
                }

                //Save each ome to the DB
                context.SaveChanges();
                Response.Redirect("ExtraPromotionList.aspx", true);
            }
        }
    }
    #endregion

    
}