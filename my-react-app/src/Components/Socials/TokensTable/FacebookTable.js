import React, { useState } from 'react';
import { FacebookString } from '../../../Utils/Static';
import FacebookEdit from "../../../Components/Socials/EditTokens/FacebookEdit";
import "../../../Styles/Screens/Users.css";
import {
    getSpecificDocumentFromCollection,
    deleteSpecificDocumentFromCollection,
    addDocumentToCollection,
} from "../../../firebaseQueries";

/**
 * FacebookTable component for displaying Facebook accounts in a table.
 *
 * @param {Object} props - Component properties.
 * @param {Object} props.tokens - Tokens data, including Facebook accounts.
 * @param {Array} props.accounts - Array of all accounts.
 * @param {Function} props.updateToken - Function to update a Facebook token.
 * @param {Function} props.deleteToken - Function to delete a Facebook token.
 * @returns {JSX.Element} - JSX element representing the FacebookTable component.
 */
const FacebookTable = (props) => {
    const [elemView, setElemView] = useState([]);
    const [elemList, setElemList] = useState([]);

    const deleteAccount = async (account) => {
        //updateSpecificDocumentInCollection("utils", "stats", stats);
        var social = await getSpecificDocumentFromCollection("socialAccounts", FacebookString)
        const novoObjeto = Object.fromEntries(
            Object.entries(social).filter(([key, value]) => value.username !== account.username)
          );
        await deleteSpecificDocumentFromCollection("socialAccounts",FacebookString)
        await addDocumentToCollection("socialAccounts",FacebookString, novoObjeto)
        var final = await getSpecificDocumentFromCollection("socialAccounts", FacebookString)
    }

    const table = () => {
        if(elemList.length <= 0){
            const accounts = props.tokens[FacebookString]
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
                                        handleSubmit={(selectedAccount, newToken) => props.updateToken(FacebookString, selectedAccount, newToken)}
                                    />
                                    <button className='buttonUsers' onClick={() => props.deleteToken(FacebookString, account)}> Delete Account </button>
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
                <>No Accounts for {FacebookString}</>
            )}
        </div>
    );
};

export default FacebookTable;
