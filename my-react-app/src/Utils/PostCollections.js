import {
    addDocumentToCollection,
    deleteSpecificDocumentFromCollection
} from "../firebaseQueries"

/**
 * Adds a new group to the "groups" collection in the Firestore database.
 * @param {string} newGroupName - The name of the new group to be added.
 * @param {Array} elemList - The list of elements containing Social and Account information.
 * @param {object} accounts - The object containing social account information.
 */
export const addGroup = async (newGroupName, elemList, accounts) => {
    var newGroupAccounts = {}
    for(const elem in elemList){
        const regex = /Social: (.*)  Account: (.*)/; // Token: (.*)/;
        const matchResult = regex.exec(elemList[elem]);
        const socialname = matchResult[1];
        const username = matchResult[2];
        const datasocial = accounts[socialname]
        for(const acc in datasocial){
            const account = datasocial[acc]
            if(account.username === username){
                newGroupAccounts[elem] = {
                    social:socialname,
                    username:username
                }
                break;
            }
        }
    }
    await addDocumentToCollection("groups", newGroupName, newGroupAccounts);
};

/**
 * Deletes a group from the "groups" collection in the Firestore database.
 * @param {string} groupName - The name of the group to be deleted.
 */
export const deleteGroup = async (groupName) => {
    try{
        await deleteSpecificDocumentFromCollection("groups", groupName);
    }
    catch{
        alert("Unable to delete group " + groupName);
    }
}