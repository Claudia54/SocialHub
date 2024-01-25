import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import "../Styles/Screens/Groups.css";

/**
 * AddGroup component for adding a new group.
 *
 * @param {Object} props - Component properties.
 * @param {boolean} props.show - Boolean indicating whether to display the modal.
 * @param {string[]} props.accountsKeys - Array of available account keys.
 * @param {string[]} props.groupKeys - Array of existing group keys.
 * @param {Function} props.addGroup - Function to add a new group.
 * @param {Function} props.toggleShow - Function to toggle the modal visibility.
 * @returns {JSX.Element} - The JSX element representing the AddGroup component.
 */
export default function AddGroup(props) {
    const [elemsMaxFlag, setElemsMaxFlag] = useState(false);
    const [groupNameFlag, setGroupNameFlag] = useState(false);

    const [groupName, setGroupName] = useState('');
    const [elemCount, setElemCount] = useState(0);
    const [elemList, setElemList] = useState([]);
    
    const [show, setShow] = useState(props.show);
    const [forceRender, setForceRender] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    /**
    * Function to force re-render the component.
    */
    const handleForceRender = () => {
		setForceRender(prevState => !prevState);
	};


    /**
    * Function to handle the selection of an option in the group account list.
    *
    * @param {number} index - The index of the selected option.
    * @param {Object} e - The event object.
    */
    const handleOption = (index, e) => {
        replaceElementAtIndex(index, e)
        handleForceRender()
    }


    /**
    * Function to replace an element at a specific index in the element list.
    *
    * @param {number} index - The index where the replacement should occur.
    * @param {string} newValue - The new value to replace the existing one.
    */
    const replaceElementAtIndex = (index, newValue) => {
        setElemList((prevList) =>
          prevList.map((element, i) => (i === index ? newValue : element))
        );
    };

    /**
    * Function to add a new element at a specific index in the element list.
    *
    * @param {number} index - The index where the new element should be added.
    * @param {string} newElement - The new element to be added.
    */
    const addElementAtIndex = (index, newElement) => {
        const newList = [...elemList];
        newList.splice(index, 0, newElement);
        setElemList(newList);
    };


    /**
    * Function to remove an element at a specific index from the element list.
    *
    * @param {number} index - The index of the element to be removed.
    */
    const removeElementAtIndex = (index) => {
        const newList = elemList.filter((_, i) => i !== index);
        setElemList(newList);
    };


    /**
    * Function to handle the addition of a new element to the element list.
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
    * Function to handle the removal of an element from the element list.
    *
    * @param {number} index - The index of the element to be removed.
    */
    const handleRemoveElem = (index) => {
        setElemCount(elemCount-1);
        removeElementAtIndex(index)
        if(elemCount-1 < props.accountsKeys.length){
            setElemsMaxFlag(false)
            handleForceRender()
        }
    }

    return (
        <>
            <button onClick={() => props.show ? null : props.toggleShow()} className="addUserButton">Add Group</button>
            <Modal
                show={props.show}
                onHide={() => setShow(false)}
                backdrop="static"
                keyboard={false}
                className="alladdUser2"
            >
                <div className="alladdUser">
                    <Modal.Header className="header">
                        Add Group
                    </Modal.Header>
                    <Modal.Body className="body-content">
                        <div className="divparam">
                            <>
                                <div className="divparamtitle1">
                                    <label className="label1" form="group">Group Name:</label>
                                </div>
                                <div className="divparamtitle2">
                                    <input
                                        className="input1"
                                        id="group"
                                        type="text"
                                        value={groupName}
                                        onChange={(e) => {
                                            const novo = e.target.value;
                                            setGroupName(novo);
                                            setGroupNameFlag(false);
                                            if(props.groupKeys.includes(novo)){
                                                setGroupNameFlag(true);
                                            }
                                        }}
                                    />
                                </div>
                            </>
                        </div>
                        <>
                            {(groupNameFlag) ? (
                                <h5 className='warning'>
                                    Name already exists !
                                </h5>
                            ):(
                                <>
                                </>
                            )}
                            {(groupName=='') ? (
                                <h5 className='warning'>
                                    Give a name to the group !
                                </h5>
                            ):(
                                <>
                                </>
                            )}
                        </>
                        <div>
                            {elemList.map((elem, index) => (
                                <div className="divparam" key={index}>
                                    <div className="divparamtitle1">
                                        <label className="label1" >#{index+1} Account</label>
                                    </div>
                                    <div className="divparamtitle2" key={index}>
                                        <select
                                            id={index} 
                                            className="input1"
                                            value={elemList[index]}
                                            onChange={(e) => {
                                                handleOption(index, e.target.value);
                                            }}
                                        >
                                            {(props.accountsKeys).map((item, index1) => (
                                                (item === elemList[index] || !(elemList).includes(item)) ? (
                                                    <option key={index1} value={item}>
                                                        {item}
                                                    </option>
                                                ) : (
                                                    <>
                                                    </>
                                                )
                                            ))}
                                        </select>
                                    </div>
                                    <button className='lessButton removeButtonGroups' onClick={() => handleRemoveElem(index) }>
                                        -
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div>
                            {(elemsMaxFlag)? (
                                <h5 className='warning'> There are no more Accounts to be added ! </h5>
                            ):(
                                <button className='addButtonGroups'  onClick={() => handleAddElem() }>
                                    +
                                </button>
                            )}
                        </div>
                    </Modal.Body>
                    <Modal.Footer className="buttons">
                        <button className="addButtonForms"
                            onClick={() => {
                                if(!groupNameFlag && groupName != ''){
                                    props.addGroup(groupName, elemList)
                                    props.toggleShow();
                                    ///*
                                    setGroupNameFlag(false)
                                    setElemsMaxFlag(false)
                                    setGroupName('')
                                    setElemCount(0)
                                    setElemList([])
                                    //*/
                                }
                            }}
                        >
                            Add
                        </button>
                        <button className="cancelbutton" onClick={() => props.toggleShow()}>Close</button>
                    </Modal.Footer>
                </div>
                
            </Modal>
        </>
    );
}