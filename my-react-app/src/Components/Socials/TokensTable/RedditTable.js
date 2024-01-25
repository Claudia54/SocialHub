import React, { useState } from 'react';
import { RedditString } from '../../../Utils/Static';
import RedditEdit from "../../../Components/Socials/EditTokens/RedditEdit";
import "../../../Styles/Screens/Users.css";
import {
    getSpecificDocumentFromCollection,
    deleteSpecificDocumentFromCollection,
    addDocumentToCollection,
} from "../../../firebaseQueries";

/**
 * RedditTable component for displaying Reddit accounts in a table.
 *
 * @param {Object} props - Component properties.
 * @param {Object} props.tokens - Tokens data, including Reddit accounts.
 * @param {Array} props.accounts - Array of all accounts.
 * @param {Function} props.updateToken - Function to update a Reddit token.
 * @param {Function} props.deleteToken - Function to delete a Reddit token.
 * @returns {JSX.Element} - JSX element representing the RedditTable component.
 */
const RedditTable = (props) => {
    const [elemView, setElemView] = useState([]);
    const [elemList, setElemList] = useState([]);

    const deleteAccount = async (account) => {
        var social = await getSpecificDocumentFromCollection("socialAccounts", RedditString)
        const novoObjeto = Object.fromEntries(
            Object.entries(social).filter(([key, value]) => value.username !== account.username)
          );
        await deleteSpecificDocumentFromCollection("socialAccounts",RedditString)
        await addDocumentToCollection("socialAccounts",RedditString, novoObjeto)
        var final = await getSpecificDocumentFromCollection("socialAccounts", RedditString)
    }

    const table = () => {
        if(elemList.length <= 0){
            const accounts = props.tokens[RedditString]
            for(const acc in accounts){
                const acc1 = parseInt(acc, 10)+1
                const account = accounts[acc]
                if(!elemList.includes(account)){
                    elemList.push(account)
                    elemView.push(
                        <tr key={acc}>
                            <td className='td'>{acc1}</td>
                            <td className='td'>{account.username}</td>
                            <td className='td'>{account.client_id.substring(0, 5)+'...'}</td>
                            <td className='td'>{account.client_secret.substring(0, 5)+'...'}</td>
                            <td className='td'>{account.community}</td>
                            {(props.admin) ? (
                                <td className='td' >
                                    <RedditEdit
                                        account={acc}
                                        accounts={props.accounts}
                                        conta = {account}
                                        username = {account.username}
                                        handleSubmit={(selectedAccount, newToken) => props.updateToken(RedditString, selectedAccount, newToken)}
                                    />
                                    <button className='buttonUsersDelete' onClick={() => props.deleteToken(RedditString, account)}> Delete </button>
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
                            <th className='th'>Client ID</th>
                            <th className='th'>Client Secret</th>
                            <th className='th'>Community</th>
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
                <>No Accounts for {RedditString}</>
            )}

        </div>
    );
};

export default RedditTable;
