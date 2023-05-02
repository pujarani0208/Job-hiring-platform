import React, { Component } from 'react';
import { CModal, CButton, CModalHeader, CModalTitle, CModalBody, CModalFooter}  from '@coreui/react'

export class Popup extends Component {
render () {
    const visible = false;

    const setVisible = (flag) => {
        this.visible = flag;
    }
    return (
  <>
    <CButton onClick={() => setVisible(!visible)}>Launch static backdrop modal</CButton>
    <CModal visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader>
        <CModalTitle>Modal title</CModalTitle>
      </CModalHeader>
      <CModalBody>
        I will not close if you click outside me. Don't even try to press escape key.
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setVisible(false)}>
          Close
        </CButton>
        <CButton color="primary">Save changes</CButton>
      </CModalFooter>
    </CModal>
  </>
    )
}
}