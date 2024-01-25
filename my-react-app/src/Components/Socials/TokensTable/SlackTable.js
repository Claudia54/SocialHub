import React, { useState } from 'react';
import { SlackString } from '../../../Utils/Static';
import SlackEdit from "../../../Components/Socials/EditTokens/SlackEdit";
import {
    updateSpecificDocumentInCollection,
    getSpecificDocumentFromCollection,
    deleteSpecificDocumentFromCollection,
    addDocumentToCollection,
} from "../../../firebaseQueries";
import "../../../Styles/Screens/Users.css";

/**
 * SlackTable component for displaying Slack accounts in a table.
 *
 * @param {Object} props - Component properties.
 * @param {Object} props.tokens - Tokens data, including Slack accounts.
 * @param {Array} props.accounts - Array of all accounts.
 * @param {Function} props.updateToken - Function to update a Slack token.
 * @param {Function} props.deleteToken - Function to delete a Slack token.
 * @returns {JSX.Element} - JSX element representing the SlackTable component.
 */
const SlackTable = (props) => {
    const [elemView, setElemView] = useState([]);
    const [elemList, setElemList] = useState([]);

    const deleteAccount = async (account) => {
        //updateSpecificDocumentInCollection("utils", "stats", stats);
        var social = await getSpecificDocumentFromCollection("socialAccounts", SlackString)
        const novoObjeto = Object.fromEntries(
            Object.entries(social).filter(([key, value]) => value.username !== account.username)
          );
        await deleteSpecificDocumentFromCollection("socialAccounts",SlackString)
        await addDocumentToCollection("socialAccounts",SlackString, novoObjeto)
        var final = await getSpecificDocumentFromCollection("socialAccounts", SlackString)
    }

    const table = () => {
        if(elemList.length <= 0){
            const accounts = props.tokens[SlackString]
            for(const acc in accounts){
                const acc1 = parseInt(acc, 10)+1
                const account = accounts[acc]
                if(!elemList.includes(account)){
                    elemList.push(account)
                    elemView.push(
                        <tr key={acc}>
                            <td className='td'>{acc1}</td>
                            <td className='td'>{account.username}</td>
                            <td className='td'>{account.url.substring(0, 5)+'...'}</td>
                            {(props.admin) ? (
                                <td className='td' >
                                    <SlackEdit
                                        account={acc}
                                        accounts={props.accounts}
                                        conta = {account}
                                        username = {account.username}
                                        handleSubmit={(selectedAccount, newToken) => props.updateToken(SlackString, selectedAccount, newToken)}
                                    />
                                    <button className='buttonUsersDelete' onClick={() => props.deleteToken(SlackString, account)}> Delete</button>
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
                <>No Accounts for {SlackString}</>
            )}

        </div>
    );
};

export default SlackTable;
