import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MdPanoramaPhotosphereSelect } from 'react-icons/md';


/**
 * EditGroup component for editing group details.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.groupName - The name of the group.
 * @param {Object} props.groupAccounts - The accounts associated with the group.
 * @param {string} props.show - Flag to determine whether to show the modal.
 * @param {function} props.toggleShow - Function to toggle the visibility of the modal.
 * @param {Array} props.accountsKeys - Array of account keys.
 * @param {Array} props.groupKeys - Array of group keys.
 * @param {function} props.changeGroup - Function to change group details.
 * @returns {JSX.Element} - The JSX element representing the EditGroup component.
 */
export default function EditGroup(props) {
    const [update, setUpdate] = useState(false);
    const [elemsMaxFlag, setElemsMaxFlag] = useState(false);
    const [newGroupNameFlag, setNewGroupNameFlag] = useState(false);

    const [newGroupName, setNewGroupName] = useState(props.groupName);
    
    const [elemCount, setElemCount] = useState(props.groupAccounts.length);
    const [elemList, setElemList] = useState([]);
    
    const [show, setShow] = useState(props.show);
    const [forceRender, setForceRender] = useState(false);

     /**
     * Forces a re-render of the component.
     */
    const handleForceRender = () => {
		setForceRender(prevState => !prevState);
	};


    /**
     * Handles the selection of an option for a specific account in the group.
     *
     * @param {number} index - The index of the account in the group.
     * @param {Object} e - The event object representing the selection change.
     */
    const handleOption = (index, e) => {
        replaceElementAtIndex(index, e)
        handleForceRender()
    }


    /**
     * Replaces the element at a specific index in the account list.
     *
     * @param {number} index - The index of the account to be replaced.
     * @param {string} newValue - The new value for the account.
     */
    const replaceElementAtIndex = (index, newValue) => {
        setElemList((prevList) =>
          prevList.map((element, i) => (i === index ? newValue : element))
        );
    };


    /**
     * Adds a new element at a specific index in the account list.
     *
     * @param {number} index - The index at which to add the new element.
     * @param {string} newElement - The new element to be added.
     */
    const addElementAtIndex = (index, newElement) => {
        const newList = [...elemList];
        newList.splice(index, 0, newElement);
        setElemList(newList);
    };


    /**
     * Removes an element at a specific index from the account list.
     *
     * @param {number} index - The index of the element to be removed.
     */
    const removeElementAtIndex = (index) => {
        const newList = elemList.filter((_, i) => i !== index);
        setElemList(newList);
    };


    /**
     * Handles the addition of a new account to the group.
     */
    const handleAddElem = () => {
        if(!elemsMaxFlag){
            setElemCount(elemCount+1);
            var num = 0;
            while(elemList.includes(props.accountsKeys[num])){
                num+=1
            }
            addElementAtIndex(elemCount, props.accountsKeys[num])
            if(elemCount+1 >= props.accountsKeys.length){
                setElemCount(props.accountsKeys.length)
                setElemsMaxFlag(true)
            }
        }
    }


    /**
     * Handles the removal of an account from the group.
     *
     * @param {number} index - The index of the account to be removed.
     */
    const handleRemoveElem = (index) => {
        if(elemCount > 0){
            setElemCount(elemCount-1);
            removeElementAtIndex(index)
            if(elemCount-1 < props.accountsKeys.length){
                setElemsMaxFlag(false)
                handleForceRender()
            }
            return
        }
        if(elemList.length > 0){
            setElemCount(elemList.length-1);
            removeElementAtIndex(index)
            if(elemList.length-1 < props.accountsKeys.length){
                setElemsMaxFlag(false)
                handleForceRender()
            }
            return
        }
    }


    /**
     * Updates the account list with the initial accounts associated with the group.
     */
    const updateVar = () => {
        for(const acc in props.groupAccounts){
            const account = props.groupAccounts[acc]
            const string = 'Social: ' + account.social + '  Account: ' + account.username// + ' Token: ' + account.token
            if(!elemList.includes(string)){
                setElemList(prevElemList => [...prevElemList, string]);
            }
        }
        if(elemCount >= props.accountsKeys.length){
            setElemCount(props.accountsKeys.length)
            setElemsMaxFlag(true)
        }
        setUpdate(true)
    }

    if(!update){
        updateVar()
    }

    return (
        <>
            <button onClick={() => props.show ? null : props.toggleShow()} className="addButtonGroups">Edit Group</button>
            <Modal
                show={props.show}
                onHide={() => setShow(false)}
                backdrop="static"
                keyboard={false}
                className="alladdUser2"
            >
                <div className="alladdUser">
                    <Modal.Header className="header">
                        Edit Group
                    </Modal.Header>
                    <Modal.Body className="body-content">
                        <div className="divparam">
                            <div className="divparamtitle1">
                                <label className="label1" form="group">Group Name:</label>
                            </div>
                            <div className="divparamtitle2">
                                <input
                                    className="input1"
                                    id="group"
                                    type="text"
                                    value={newGroupName}
                                    onChange={(e) => {
                                        const novo = e.target.value;
                                        setNewGroupName(novo);
                                        setNewGroupNameFlag(false);
                                        if(props.groupKeys.includes(novo) && (novo != props.groupName)){
                                            setNewGroupNameFlag(true);
                                        }
                                    }}
                                />
                            </div>
                        </div>
                        <>
                            {(newGroupNameFlag) ? (
                                <h3>
                                    Name already exists
                                </h3>
                            ):(
                                <>
                                </>
                            )}
                            {(newGroupName=='') ? (
                                <h3>
                                    Give a name to the group
                                </h3>
                            ):(
                                <>
                                </>
                            )}
                        </>
                        <div>
                            {elemList.map((elem, index) => (
                                <div className="divparam" key={`div-${index}`}>
                                    <div className="divparamtitle1" key={`div-label-${index}`}>
                                        <label className="label1" key={`label-${index}`}>#{index+1} Account</label>
                                    </div>
                                    <div className="divparamtitle2" >
                                        <select
                                            id={index} 
                                            className="input1"
                                            key={`selection-${index}`}
                                            value={elemList[index]}
                                            onChange={(e) => {
                                                handleOption(index, e.target.value);
                                            }}
                                        >
                                            {(props.accountsKeys).map((item, index1) => (
                                                (item === elemList[index] || !(elemList).includes(item)) ? (//item === elemList[index] || 
                                                    <option key={`option-${index1}`} value={item}>
                                                        {item}
                                                    </option>
                                                ) : (
                                                    <>
                                                    </>
                                                )
                                            ))}
                                        </select>
                                    </div>
                                    <button  className='lessButton removeButtonGroups' key={`button-${index}`} onClick={() => handleRemoveElem(index) }>
                                        -
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div>
                            {(elemsMaxFlag)? (
                                <h3> There are no more Accounts to be added </h3>
                            ):(
                                <button className='addButtonGroups' onClick={() => handleAddElem() }>
                                    +
                                </button>
                            )}
                        </div>
                    </Modal.Body>
                    <Modal.Footer className="buttonGroups">
                        <button className="addButtonForms"
                            onClick={() => {
                                if(!newGroupNameFlag && newGroupName != ''){
                                    props.changeGroup(newGroupName, elemList)
                                    props.toggleShow();
                                    updateVar()
                                }
                            }}
                        >
                            Change
                        </button>
                        <button className="cancelbutton" onClick={() => props.toggleShow()}>Close</button>
                    </Modal.Footer>
                </div>
                
            </Modal>
        </>
    );
}