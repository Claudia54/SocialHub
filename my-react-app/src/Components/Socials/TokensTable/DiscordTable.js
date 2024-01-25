import React, { useState } from 'react';
import { DiscordString } from '../../../Utils/Static';
import DiscordEdit from "../../../Components/Socials/EditTokens/DiscordEdit";
import "../../../Styles/Screens/Users.css";
import {
    updateSpecificDocumentInCollection,
    getSpecificDocumentFromCollection,
    deleteSpecificDocumentFromCollection,
    addDocumentToCollection,
} from "../../../firebaseQueries";


/**
 * DiscordTable component for displaying Discord accounts in a table.
 *
 * @param {Object} props - Component properties.
 * @param {Object} props.tokens - Tokens data, including Discord accounts.
 * @param {Array} props.accounts - Array of all accounts.
 * @param {Function} props.updateToken - Function to update a Discord token.
 * @param {Function} props.deleteToken - Function to delete a Discord token.
 * @returns {JSX.Element} - JSX element representing the DiscordTable component.
 */
const DiscordTable = (props) => {
    const [elemView, setElemView] = useState([]);
    const [elemList, setElemList] = useState([]);
    
    const deleteAccount = async (account) => {
        var social = await getSpecificDocumentFromCollection("socialAccounts", DiscordString)
        const novoObjeto = Object.fromEntries(
            Object.entries(social).filter(([key, value]) => value.username !== account.username)
        );
        await deleteSpecificDocumentFromCollection("socialAccounts",DiscordString)
        await addDocumentToCollection("socialAccounts",DiscordString, novoObjeto)
        var final = await getSpecificDocumentFromCollection("socialAccounts", DiscordString)
    }

    const table = () => {
        if(elemList.length <= 0){
            const accounts = props.tokens[DiscordString]
            for(const acc in accounts){
                const account = accounts[acc]
                if(!elemList.includes(account)){
                    const acc1 = parseInt(acc, 10)+1
                    elemList.push(account)
                    elemView.push(
                        <tr key={acc}>
                            <td className='td'>{acc1}</td>
                            <td className='td'>{account.username}</td>
                            <td className='td'>{account.url.substring(0, 5)+'...'}</td>
                            {(props.admin) ? (
                                <td className='td'>
                                    <DiscordEdit
                                        account={acc}
                                        accounts={props.accounts}
                                        conta = {account}
                                        username = {account.username}
                                        handleSubmit={(selectedAccount, newToken) => props.updateToken(DiscordString, selectedAccount, newToken)}
                                    />
                                    <button className='buttonUsersDelete' onClick={() => props.deleteToken(DiscordString, account)}> Delete </button>
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
                            <th className='th'>Url</th>
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
                <>No Accounts for {DiscordString}</>
            )}

        </div>
    );
};

export default DiscordTable;
