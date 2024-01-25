import {
	getAllDocumentsFromCollectionWithUID
} from "../firebaseQueries"
import { availableSocials } from "./Static"

/**
 * Collection of groups with predefined data.
 */
export const groupsCollection={
    0:{
        uid:"group1",
        data:{
            0:{
                social:"Slack",
                token:"https://hooks.slack.com/services/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",
                username:"SocialHub"
            },
            1:{
                social:"Discord",
                token:"https://discord.com/api/webhooks/1184994627581902858/GXyt8u7szqywH6ELvwv9Dm3qBuGV71xTEaINDGkIN33INW2SbByA0WoxHm4pFvC3wZJa",
                username:"Captain Hook"
            }
        }
    },
    1:{
        uid:"group2",
        data:{
            0:{
                social:"Reddit",
                token:"4tMuTMVYfL6itVzHs3Ktug",
                username:"Social-Hub"
            },
            1:{
                social:"Slack",
                token:"https://hooks.slack.com/services/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",
                username:"SocialHub"
            }
        }
    },
    2:{
        uid:"yaya1234",
        data:{
            0:{
                social:"Discord",
                token:"https://discord.com/api/webhooks/1184994627581902858/GXyt8u7szqywH6ELvwv9Dm3qBuGV71xTEaINDGkIN33INW2SbByA0WoxHm4pFvC3wZJa",
                username:"Captain Hook"
            },
            1:{
                social:"Facebook",
                token:"$2a$10$Y28NPJ.ptlMWSNnGG4VlgOl0qlMRkNajVBXY5YeRHGHLF1Sl7EU.m",
                username:"yoyo@socialhub.pt"
            }
        }
    },
}

/**
 * Collection of users with predefined data.
 */
export const usersCollection={
    0:{
        uid:"5yxVYeJmrQNEqgIOgaOjzHahJmf2",
        data:{
            admin:true,
            email:"admin@socialhub.pt",
            name:"Josué",
            phone:"111222333",
            role:"Team Leader"
        }
    },
    1:{
        uid:"VcqzmVIBy0WxcPdwKZC0fwUqc453",
        data:{
            admin:false,
            email:"antisocialhub1@gmail.com",
            name:"Roberto Xavier",
            phone:"456",
            role:"Team Leader"
        }
    }
}

/**
 * This Function is used to obtain the JSON of Groups from the database
 * @param {*} setGroups is a function to set the groups of the original file
 * @param {*} groupKeys is a array which stores the names of the groups
 * @param {*} forceRender 
 * @param {*} handleForceRender 
 */
export const getGroups = async (groups, setGroups, groupKeys, setGroupKeys, forceRender, handleForceRender) => {
    try {
        const groupsDB = (await getAllDocumentsFromCollectionWithUID("groups"))
        //const groupsDB = groupsCollection
        const newGroupKeys = []
        const newGroups = {}
        for(const group in groupsDB){
            const groupname = groupsDB[group].uid;
            const data = groupsDB[group].data;
            if(!newGroupKeys.includes(groupname)){
                newGroups[groupname] = data
                newGroupKeys.push(groupname)
            }
        }
        setGroupKeys(newGroupKeys)
        setGroups(newGroups)
        if(!forceRender){
            handleForceRender()
        }
    }
    catch (error) {
        console.error(error);
    }
}

/**
 * Retrieves accounts data from the database and updates state variables.
 * @param {function} setAccounts - Function to set the accounts.
 * @param {Array} accountsKeys - Array storing keys of social and account information.
 */
export const getAccounts = async (setAccounts, accountsKeys) => {
    try {
        const socialsDB = (await getAllDocumentsFromCollectionWithUID("socialAccounts"))
        //const socialsDB = socialsCollection
        var newAccounts = {}
        for(const social in socialsDB){
            var newSocials = {}
            var num = 0
            const socialname = socialsDB[social].uid;
            const socialdata = socialsDB[social].data;
            if(availableSocials.includes(socialname)){
                for(const account in socialdata){
                    const acc = socialdata[account]
                    const mix = 'Social: ' + socialname + '  Account: ' + acc.username// + ' Token: ' + acc.token
                    if(!accountsKeys.includes(mix)){
                        accountsKeys.push(mix)
                    }
                    newSocials[num] = acc
                    num+=1
                }
                newAccounts[socialname] = newSocials
            }
        }
        setAccounts(newAccounts)
    }
    catch (error) {
        console.error(error);
    }
}

/**
 * Retrieves user data from the database and updates state variables.
 * @param {object} loggedUser - The logged-in user object.
 * @param {function} setUserAdmin - Function to set the user admin status.
 */
export const getUser = async (loggedUser, userAdmin, setUserAdmin) => {
    try {
        const users = (await getAllDocumentsFromCollectionWithUID("users"))
        const user = users.filter((user) => user.data.email === loggedUser.email)[0];
        setUserAdmin(user.data.admin)
    }
    catch (error) {
        console.error(error);
    }
}