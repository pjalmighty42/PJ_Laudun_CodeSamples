<%@ Page Title="" Language="C#" MasterPageFile="~/Admin/Persistant.master" AutoEventWireup="true" 
	CodeFile="ExtraPromotionList.aspx.cs" Inherits="DataManagement_ExtraPromotionList" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1_Inner" runat="Server">
    <asp:Literal ID="litScripts" runat="server" />

    <style type="text/css">
        .catalog-setup-form h4.header {
            font-weight: 800;
        }

        #ddlCategoryFilter {
            width: 15%;
        }

        #ContentPlaceHolder2_pnlBottomAreaMain table {
            width: 100%;
        }

        .input-control {
            background-color: #fff;
        }

        /*table{
            width: 100%;
        }*/

        label {
            font-weight: normal;
        }

        .form-group {
            margin-bottom: 10px;
        }

        .col-form-label {
            padding-top: .5rem;
            padding-bottom: .5rem;
            margin-bottom: 0;
        }

        .right-panel {
            margin-top: 79px;
        }

        .form-control {
            border: 1px solid #d2d2d2;
            border-radius: unset;
        }

        input[type="text"]:hover, input[type="email"]:hover, input[type="password"]:hover, select:hover {
            border-color: #959595;
        }


        .form-control:focus {
            border-color: #959595;
            box-shadow: none;
        }

        hr {
            margin-top: 0px;
            border: 0;
            border-top: 1px solid #dddddd;
        }

        #chkIsActive {
            vertical-align: top;
        }
    </style>



    <div class="clearfix">
        <div class="row">
            <div class="col-md-12 col-sm-12 col-xs-12">
                <h4 class="text-center">Extra Promotions</h4>
                <hr />
            </div>
        </div>

        <div style="width: 700px; margin: 0 auto;">

            <div class="panel panel-default search-panel" style="border-color: #555555;">

                <div class="panel-body">

                    <div class="col-md-12 col-lg-12 col-xs-12">

                        <div class="form-group row">
                            <div class="col-xs-8">
                                <label class="col-xs-2 col-form-label">
                                    Site:
                                </label>
                                <div class="col-xs-8">
                                    <asp:DropDownList ID="ddlSite" runat="server" CssClass="form-control" AutoPostBack="true"
                                        OnSelectedIndexChanged="ddlSite_SelectedIndexChanged">
                                    </asp:DropDownList>
                                </div>
                            </div>
                            <label class="col-xs-4 col-form-label">
                                <asp:CheckBox runat="server" Checked="true" ID="chkIsActive" ClientIDMode="Static" OnCheckedChanged="chkIsActive_CheckedChanged"
                                    Style="vertical-align: top;" AutoPostBack="true" />
                                Active
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <asp:GridView ID="grdPromotions" ClientIDMode="Static" CssClass="table table-bordered "
                runat="server" AutoGenerateColumns="false" ShowHeaderWhenEmpty="true" OnRowCommand="grdPromotions_RowCommand"
                AllowSorting="false" EmptyDataText="No items found.">
                <HeaderStyle CssClass="grid_header" />
                <AlternatingRowStyle CssClass="grid_altrow" Height="3px" />
                <RowStyle CssClass="grid_row" Wrap="false" Height="25px" />
                <FooterStyle CssClass="grid_footer" />
                <Columns>
                    <asp:BoundField DataField="PromotionId" Visible="false" />
                    <asp:TemplateField HeaderText="Name">
                        <ItemTemplate>
                            <asp:LinkButton runat="server" ID="lnkView" Text='<%#Eval("Name") %>' CommandArgument='<%#Eval("Id") %>'
                                CommandName="PromotionSetup"></asp:LinkButton>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:BoundField DataField="StartDate" HeaderText="Start Date" DataFormatString="{0:MM-dd-yyyy}" />
					<asp:BoundField DataField="EndDate" HeaderText="End Date" DataFormatString="{0:MM-dd-yyyy}" />
					<asp:BoundField DataField="Country" HeaderText="Country" />
                </Columns>
            </asp:GridView>

            <div class="form-group row">
                <div class="col-md-12">
                    <asp:Button runat="server" ID="btnNewPromo" CssClass="btn btn-primary pull-right" Text="New Promotion"  OnClick="btnNewPromo_Click" />
                    <%--<a href="ExtraPromotionSetup.aspx" class="btn btn-primary pull-right">New Promotion</a>--%>
                </div>
            </div>
        </div>
    </div>

</asp:Content>

