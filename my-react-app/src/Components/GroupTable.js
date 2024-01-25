import React, { useState } from 'react';
import "../Styles/Screens/Groups.css";
import EditGroup from "./EditGroup";

/**
 * GroupTable component for displaying group details.
 *
 * @param {Object} props - Component properties.
 * @param {boolean} props.admin - Boolean indicating whether the user is an admin.
 * @param {Object} props.groupAccounts - Object containing group accounts.
 * @param {string} props.groupName - Name of the group.
 * @param {Array} props.accountsKeys - Array containing keys of user accounts.
 * @param {Array} props.groupKeys - Array containing keys of groups.
 * @param {Function} props.changeGroup - Function to change group details.
 * @param {Function} props.deleteGroup - Function to delete a group.
 * @returns {JSX.Element} - The JSX element representing the GroupTable component.
 */
const GroupTable = (props) => {
    const [show, setShow] = useState(false);

    return (
        <>
            <div>
                <h2> Group Name: {props.groupName} </h2>
                {(Object.keys(props.groupAccounts[props.groupName]).length > 0) ? (
                    <>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th className='th'>Account Number</th>
                                    <th className='th'>Social</th>
                                    <th className='th'>Username</th>
                                    {/*<th className='th'>Token</th>*/}
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(props.groupAccounts[props.groupName]).map((account, index) => (
                                    <tr key={account}>
                                        <td className='td'>{index+1}</td>
                                        <td className='td'>{props.groupAccounts[props.groupName][account].social}</td>
                                        {/*(props.groupAccounts[props.groupName][account].social == 'Reddit') ? (
                                            <td className='td'>{props.groupAccounts[props.groupName][account].user_agent}</td>
                                        ) : (
                                            <td className='td'>{props.groupAccounts[props.groupName][account].username}</td>
                                            )
                                        */}
                                        <td className='td'>{props.groupAccounts[props.groupName][account].username}</td>
                                        {/*<td className='td'>{props.groupAccounts[props.groupName][account].token.substring(0, 22) + '... '}</td>*/}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                ) : (
                    <>
                        <h4>No Accounts for {props.groupName}</h4>
                    </>
                )}
                <EditGroup
                    accountsKeys={props.accountsKeys}
                    groupKeys={props.groupKeys}
                    groupName={props.groupName}
                    groupAccounts={props.groupAccounts[props.groupName]}
                    
                    changeGroup={(newGroupName, newGroupAccounts) => props.changeGroup(props.groupName, newGroupName, newGroupAccounts)}

                    show={show}
                    toggleShow={() => setShow(!show)}
                />
                {(props.admin) ? (
                    <button className="addButtonGroups" onClick={() => props.deleteGroup(props.groupName)}>
                        Delete Group
                    </button>
                ) : (
                    <>
                    </>
                )}

            </div>
        </>
    );
};

export default GroupTable;
