import React, { useState } from 'react';
import { WhatsAppString } from '../../../Utils/Static';
import FacebookEdit from "../../../Components/Socials/EditTokens/FacebookEdit";
import "../../../Styles/Screens/Users.css";
import {
    getSpecificDocumentFromCollection,
    deleteSpecificDocumentFromCollection,
    addDocumentToCollection,
} from "../../../firebaseQueries";


/**
 * WhatsAppTable component for displaying WhatsApp accounts in a table.
 *
 * @param {Object} props - Component properties.
 * @param {Object} props.tokens - Tokens data, including WhatsApp accounts.
 * @param {Array} props.accounts - Array of all accounts.
 * @param {Function} props.updateToken - Function to update a WhatsApp token.
 * @param {Function} props.deleteToken - Function to delete a WhatsApp token.
 * @returns {JSX.Element} - JSX element representing the WhatsAppTable component.
 */
export default function WhatsAppTable(props) {
    const [elemView, setElemView] = useState([]);
    const [elemList, setElemList] = useState([]);

    const deleteAccount = async (account) => {
        var social = await getSpecificDocumentFromCollection("socialAccounts", WhatsAppString)
        const novoObjeto = Object.fromEntries(
            Object.entries(social).filter(([key, value]) => value.username !== account.username)
          );
        await deleteSpecificDocumentFromCollection("socialAccounts",WhatsAppString)
        await addDocumentToCollection("socialAccounts",WhatsAppString, novoObjeto)
        var final = await getSpecificDocumentFromCollection("socialAccounts", WhatsAppString)
    }

    const table = () => {
        if(elemList.length <= 0){
            const accounts = props.tokens[WhatsAppString]
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
                                        handleSubmit={(selectedAccount, newToken) => props.updateToken(WhatsAppString, selectedAccount, newToken)}
                                    />
                                    <button className='buttonUsers' onClick={() => props.deleteToken(WhatsAppString, account)}> Delete Account </button>
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
            <> No Accounts for {WhatsAppString} </>
        )
    )
}