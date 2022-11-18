import React from 'react'
import './popup.scss'

export const Popup = ({message,handleClose,tabname,closePopup}) => {

  return (
    <div>
        <div className="popup">
            <h3>Do you want to save the changes made to the document "{tabname.currentTab.name} - {tabname.currentTab.id}" ?</h3>
            <h5>your changes will be lost if you dont save them.</h5>
            <> &nbsp; <button className="btn btn-primary" onClick={()=> handleClose(tabname.currentTab)}>Close</button> &nbsp;<button className="btn btn-light" onClick={closePopup}>Cancel</button></>
        </div>
    </div>
  )
}
