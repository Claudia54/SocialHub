import React, { useState } from "react";


/**
 * React component for rendering a table of social accounts with selection functionality.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.socials - Object containing social accounts data.
 * @param {Object} props.listAccounts - Object containing a list of social accounts.
 * @param {Object} props.selectedAccounts - Object containing selected social accounts.
 * @param {Function} props.setSelectedSocials - Function to set the selected social networks.
 * @param {Function} props.setParams - Function to set parameters.
 * @returns {JSX.Element} - The JSX element representing the SocialAccountsTable component.
 */
export default function SocialAccountsTable(props) {
    
    // Handle selected Social Networks
    const handleSocialToSelected = (social) => {
        for(const acc in props.selectedAccounts){
            if(props.selectedAccounts[acc].length > 0){
                props.setSelectedSocials(prevList => [acc, ...prevList])
                props.setParams(prevSet => {return { ...prevSet, [social]: {} };})
            }
            else{
                props.setSelectedSocials(prevList => prevList.filter(social2 => social2 !== acc))
            }
        }
    }

    // Handle selected Accounts
    function handleAccountToSelected(social, account) {
        if(!props.selectedAccounts.hasOwnProperty(social)){
            props.selectedAccounts[social] = []
        }
        if(props.selectedAccounts.hasOwnProperty(social) && !props.selectedAccounts[social].includes(account)){
            props.selectedAccounts[social] = [account, ...(props.selectedAccounts)[social]];
        } else {
            props.selectedAccounts[social] = props.selectedAccounts[social].filter(account1 => account1 !== account);
        }
    };

    function handleAccountsToSelected(social) {
        if (props.selectedAccounts[social] != props.listAccounts[social]) {
            props.selectedAccounts[social] = props.listAccounts[social];
        } else {
            props.selectedAccounts[social] = [];
        }
    };

    return(
        <>
            {Object.keys(props.socials).map((social, index) => (
                <>
                {props.socials[social] &&
                    <>
                        <div className="accountTitle">{social}</div>
                        <div key={index} className='setButtonsSocial'>
                            {((props.listAccounts[social]).length > 0) ? (
                                <>
                                    <>
                                        <input
                                            type="checkbox"
                                            onChange={() => { handleAccountsToSelected(social); 
                                                handleSocialToSelected(social); 
                                            }}
                                            checked={(props.selectedAccounts[social] !== undefined) && ((props.selectedAccounts[social]).length === (props.listAccounts[social]).length)}
                                        />
                                        <label>Select all</label>
                                    </>
                                    {(props.listAccounts[social]).map((account, index) => (

                                        <div key={index}>
                                            <input
                                                type="checkbox"
                                                onChange={() => { 
                                                    handleAccountToSelected(social, account); 
                                                    handleSocialToSelected(social); 
                                                }}
                                                id={`accountCheckbox_${index}`}
                                                checked={(props.selectedAccounts[social] !== undefined) &&  (props.selectedAccounts[social]).includes(account)}
                                            />
                                            <label htmlFor={`accountCheckbox_${index}`}>{account}</label>
                                        </div>

                                    ))}
                                </>
                            ) : (
                                <p>
                                    No Accounts
                                </p>
                            )}
                        </div>
                    </>
                }
                </>
            ))}
        </>
    );
};
