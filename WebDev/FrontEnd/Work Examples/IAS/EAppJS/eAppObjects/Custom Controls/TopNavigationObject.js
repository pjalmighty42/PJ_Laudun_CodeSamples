function TopNavigationController(
    agentName,
    planName,
    monthlyAmount,
    yearlyAmount,
    currState,
    effectiveDate
) {

    function CreateTopNav(
        aName,
        pName,
        mthAmt,
        yrAmt,
        cState,
        eDate
    ) {
        var topNav = [];

        var answerDate = new Date(eDate);
        var stringEDate = ((answerDate.getMonth() + 1) + '/' + answerDate.getDate() + '/' + answerDate.getFullYear());

        topNav.push("<li class='agent-area col-3'>");
        topNav.push("Agent: " + aName);
        topNav.push("</li>");
        topNav.push("<li class='plan-area col-4'>");
        if (!NullOrEmptyCheck(pName)) {
            topNav.push("Plan: " + pName + "</div><div>Annual: " + yrAmt + " - Monthly: " + mthAmt);
        }
        else {
            topNav.push("</div><div>Annual: " + yrAmt + " - Monthly: " + mthAmt)
        }
        topNav.push("</li>");
        topNav.push("<li class='state-area col-2'>");
        topNav.push("State: " + cState);
        topNav.push("</li>");
        topNav.push("<li class='eff-date-area col-3'>");
        topNav.push("Effective Date: " + stringEDate);
        topNav.push("</li>");

        return CreateElement(topNav);
    }

    function TopNavContainer(
        aName,
        pName,
        mthAmt,
        yrAmt,
        cState,
        eDate
    ) {

        var topNavOut = [];

        topNavOut.push("<ul class='app-sub-menu row'>");

        topNavOut.push(CreateTopNav(
                aName,
                pName,
                mthAmt,
                yrAmt,
                cState,
                eDate
            )
        );

        topNavOut.push("</ul>");

        return CreateElement(topNavOut);

    }

    return TopNavContainer(
        agentName,
        planName,
        monthlyAmount,
        yearlyAmount,
        currState,
        effectiveDate
    );
}