<%@ Page Title="" Language="C#" MasterPageFile="~/Admin/Persistant.master" AutoEventWireup="true" 
	CodeFile="ExtraPromotionSetup.aspx.cs" Inherits="DataManagement_ExtraPromotionSetup" %>

<%@ Register Src="~/UserControls/DateControl.ascx" TagPrefix="uc1" TagName="DateControl" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1_Inner" Runat="Server">
	<asp:Literal ID="litScripts" runat="server" />
    <style type="text/css">
        .cbTable{
            overflow-y:scroll; 
            height:200px; 
            text-align:left; 
            border:1px solid #ccc; 
            border-radius:5px;
        }

        .cbTable label{
            margin-left:5px;
        }
    </style>

        <div class="clearfix" style="width:997px;">
        <div class="row">
            <div class="col-md-12 col-sm-12 col-xs-12">
                <h4 class="text-center">Promotions</h4>
                <hr />
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 col-sm-12 col-xs-12 text-center">
                <asp:Button runat="server" ID="btnSavePromo" Text="Save" CssClass="btn btn-primary" OnClick="btnSavePromo_Click"/>
                <a href="ExtraPromotionList.aspx" class="btn btn-default">Cancel</a>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 col-sm-12 col-xs-12">
                <div class="col-md-12 col-sm-12 col-xs-12">
                    <h4>Basic Data</h4>
                    <hr />

                    <div class="text-center">
                        <div class="form-group row">
                            <label class="col-xs-3 col-form-label">Name:</label>
                            <div class="col-xs-5">
                                <asp:TextBox runat="server" required="required" ID="txtPromoName" AutoPostBack="false" CssClass="form-control"></asp:TextBox>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-xs-3 col-form-label">Country:</label>
                            <div class="col-xs-5">
                                <asp:DropDownList ID="ddlCountry" runat="server" ClientIDMode="Static" AutoPostBack="true" CssClass="form-control" OnSelectedIndexChanged="ddlCountry_SelectedIndexChanged"></asp:DropDownList>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-xs-3 col-form-label">Promotion Type:</label>
                            <div class="col-xs-5">
                                <asp:DropDownList ID="ddlPromoType" runat="server" ClientIDMode="Static" AutoPostBack="false" CssClass="form-control"></asp:DropDownList>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="col-md-12 col-sm-12 col-xs-12">
                    <h4>Time Frames</h4>
                    <hr />

                    <div class="text-center">
                        <div class="form-group row">
                            <label class="col-xs-3 col-form-label">Valid From:</label>
                            <uc1:DateControl runat="server" ID="dteValidFrom" CssClass="form-control" Autopostback="false" />
                        </div>
                        <div class="form-group row">
                            <label class="col-xs-3 col-form-label">Valid To:</label>
                            <uc1:DateControl runat="server" ID="dteValidTo" CssClass="form-control" Autopostback="false" />
                        </div>
                    </div>
                    
                </div>

                <div class="col-md-12 col-sm-12 col-xs-12">
                    <h4>Specific Data</h4>
                    <hr />

                    <div class="text-center">
                        <div class="form-group row">
                            <label class="col-xs-3 col-form-label">Multiplier:</label>
                            <div class="col-xs-5">
                                <asp:TextBox runat="server" required="required" ID="tbMulitplier" AutoPostBack="false" CssClass="form-control"></asp:TextBox>
                            </div>
                        </div>
                    </div>
                    
                    <div class="text-center">
                        <div class="form-group row">
                            <label class="col-xs-3 col-form-label">Product Groups:</label>
                            <div class="col-xs-6 cbTable">
                                <asp:CheckBoxList ID="cblProductGroups" runat="server" AutoPostBack="false" RepeatDirection="Vertical" Height="200px"></asp:CheckBoxList>
                            </div>
                        </div>
                    </div>

                    <div class="text-center">
                        <div class="form-group row">
                            <label class="col-xs-3 col-form-label">Service Center Concepts:</label>
                            <div class="col-xs-6 cbTable">
                                <asp:CheckBoxList ID="cblServiceCC" runat="server" AutoPostBack="false" RepeatDirection="Vertical" Height="200px"></asp:CheckBoxList>
                            </div>
                        </div>
                    </div>

                    <div class="text-center">
                        <div class="form-group row">
                            <label class="col-xs-3 col-form-label">States:</label>
                            <div class="col-xs-6 cbTable">
                                <asp:CheckBoxList ID="cblStates" runat="server" AutoPostBack="false" RepeatDirection="Vertical" Height="200px"></asp:CheckBoxList>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>

</asp:Content>
