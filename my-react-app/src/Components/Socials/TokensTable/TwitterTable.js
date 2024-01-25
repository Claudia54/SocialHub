import React, { useState } from 'react';
import { TwitterString } from '../../../Utils/Static';
import FacebookEdit from "../../../Components/Socials/EditTokens/FacebookEdit";
import {
    getSpecificDocumentFromCollection,
    deleteSpecificDocumentFromCollection,
    addDocumentToCollection,
} from "../../../firebaseQueries";

/**
 * TwitterTable component for displaying Twitter accounts in a table.
 *
 * @param {Object} props - Component properties.
 * @param {Object} props.tokens - Tokens data, including Twitter accounts.
 * @param {Array} props.accounts - Array of all accounts.
 * @param {Function} props.updateToken - Function to update a Twitter token.
 * @param {Function} props.deleteToken - Function to delete a Twitter token.
 * @returns {JSX.Element} - JSX element representing the TwitterTable component.
 */

const TwitterTable = (props) => {
    const [elemView, setElemView] = useState([]);
    const [elemList, setElemList] = useState([]);

    const deleteAccount = async (account) => {
        var social = await getSpecificDocumentFromCollection("socialAccounts", TwitterString)
        const novoObjeto = Object.fromEntries(
            Object.entries(social).filter(([key, value]) => value.username !== account.username)
          );
        await deleteSpecificDocumentFromCollection("socialAccounts",TwitterString)
        await addDocumentToCollection("socialAccounts",TwitterString, novoObjeto)
        var final = await getSpecificDocumentFromCollection("socialAccounts", TwitterString)
    }

    const table = () => {
        if(elemList.length <= 0){
            const accounts = props.tokens[TwitterString]
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
                                    <FacebookEdit
                                        account={acc}
                                        accounts={props.accounts}
                                        conta = {account}
                                        username = {account.username}
                                        handleSubmit={(selectedAccount, newToken) => props.updateToken(TwitterString, selectedAccount, newToken)}
                                    />
                                    <button className='buttonUsers' onClick={() => props.deleteToken(TwitterString, account)}> Delete Account </button>
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

    return(
        (props.accounts) ? (
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
            <> No Accounts for {TwitterString} </>
        )
    )
}

export default TwitterTable;