const TopNavigationController = (
    agentName,
    planName,
    monthlyAmount,
    yearlyAmount,
    currState,
    effectiveDate
) => {

    const CreateTopNav = (
        aName,
        pName,
        mthAmt,
        yrAmt,
        cState,
        eDate
    ) => {
        let answerDate = new Date(eDate);
        let stringEDate = ((answerDate.getMonth() + 1) + '/' + answerDate.getDate() + '/' + answerDate.getFullYear());

        let planOut;

        if (!NullOrEmptyCheck(pName)) {
            planOut = `Plan: ${pName}</div><div>Annual: ${yrAmt} - Monthly: ${mthAmt}`;
        }
        else {
            planOut = `</div><div>Annual: ${yrAmt} - Monthly: ${mthAmt}`;
        }

        return `<li class='agent-area col-3'>
                Agent: ${aName} 
                </li>
                <li class='plan-area col-4'>
                ${planOut}
                </li>
                <li class='state-area col-2'>
                State: ${cState} 
                </li>
                <li class='eff-date-area col-3'>
                Effective Date: ${stringEDate} 
                </li>`;
    }

    const TopNavContainer = (
        aName,
        pName,
        mthAmt,
        yrAmt,
        cState,
        eDate
    ) => {

        let topNavOut = CreateTopNav(
            aName,
            pName,
            mthAmt,
            yrAmt,
            cState,
            eDate
        );

        return `<ul class='app-sub-menu row'>
                ${topNavOut}
                </ul>`;
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