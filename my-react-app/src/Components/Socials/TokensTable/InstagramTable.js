import React, { useState } from 'react';
import { InstagramString } from '../../../Utils/Static';
import InstagramEdit from "../../../Components/Socials/EditTokens/InstagramEdit";
import {
    getSpecificDocumentFromCollection,
    deleteSpecificDocumentFromCollection,
    addDocumentToCollection,
} from "../../../firebaseQueries";


/**
 * InstagramTable component for displaying Instagram accounts in a table.
 *
 * @param {Object} props - Component properties.
 * @param {Object} props.tokens - Tokens data, including Instagram accounts.
 * @param {Array} props.accounts - Array of all accounts.
 * @param {Function} props.updateToken - Function to update a Instagram token.
 * @param {Function} props.deleteToken - Function to delete a Instagram token.
 * @returns {JSX.Element} - JSX element representing the InstagramTable component.
 */

const InstagramTable = (props) => {
    const [elemView, setElemView] = useState([]);
    const [elemList, setElemList] = useState([]);

    const deleteAccount = async (account) => {
        //updateSpecificDocumentInCollection("utils", "stats", stats);
        var social = await getSpecificDocumentFromCollection("socialAccounts", InstagramString)
        const novoObjeto = Object.fromEntries(
            Object.entries(social).filter(([key, value]) => value.username !== account.username)
          );
        await deleteSpecificDocumentFromCollection("socialAccounts",InstagramString)
        await addDocumentToCollection("socialAccounts",InstagramString, novoObjeto)
        var final = await getSpecificDocumentFromCollection("socialAccounts", InstagramString)
    }
    
    const table = () => {
        if(elemList.length <= 0){
            const accounts = props.tokens[InstagramString]
            for(const acc in accounts){
                const acc1 = parseInt(acc, 10)+1
                const account = accounts[acc]
                if(!elemList.includes(account)){
                    elemList.push(account)
                    elemView.push(
                        <tr key={acc}>
                            <td className='td'>{acc1}</td>
                            <td className='td'>{account.username}</td>
                            <td className='td'>{account.token.substring(0, 5)+'...'}</td>
                            {(props.admin) ? (
                                <td className='td'>
                                    <InstagramEdit
                                        account={acc}
                                        accounts={props.accounts}
                                        conta = {account}
                                        username = {account.username}
                                        handleSubmit={(selectedAccount, newToken) => props.updateToken(InstagramString, selectedAccount, newToken)}
                                    />
                                    <button className='buttonUsers' onClick={() => props.deleteToken(InstagramString, account)}> Delete Account </button>
                                </td>
                            ) : (
                                <>
                                </>
                            )}

                        </tr>
                    )
                }
            }
        }
    }

    if(elemView.length <= 0){
        //reset()
        table()
    }

    return (
        <div>
            {props.accounts ? (
                <table className='table'>
                    <thead>
                        <tr>
                            <th className='th'>Account Number</th>
                            <th className='th'>Username</th>
                            <th className='th'>Token</th>
                            {(props.admin) ? (
                                <th className='th'>Actions</th>
                            ) : (
                                <>
                                </>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {elemView}
                    </tbody>
                </table>
            ) : (
                <>No Accounts for {InstagramString}</>
            )}

        </div>
    );
};

export default InstagramTable;
