import React, { useState } from 'react';
import { Modal } from 'antd';
import { useHistory } from 'react-router-dom';
import {
  BuildBusinessForm,
  BusinessFormSubmitValues
} from '../BusinessForms/BuildBusinessForm/BuildBusinessForm';
import {
  Business,
  BusinessHours,
  BusinessInteraction,
  BusinessDeliveryApp
} from '../../types';

export interface UpdateBusinessProps {
  business: Business;
  bussinessCardCallback: (business: Business) => void;
}

export const UpdateBusiness: React.FC<UpdateBusinessProps> = (props) => {
  const history = useHistory();

  const [visible, setVisible] = useState(true);

  const handleCancel = () => {
    // if user close modal make sure to return the original business received from parent
    props.bussinessCardCallback(props.business);
    setVisible(false);
  };

  const updateBusiness = (business: BusinessFormSubmitValues) => {
    business.id = props.business.id;
    business.category = props.business.category;
    business.name = props.business.name;

    const putRequest: Business = {
      id: props.business.id,
      name: props.business.name,
      category: props.business.category,
      hours: (business.hours || 'None') as BusinessHours,
      phoneNumber: business.phoneNumber
        ? business.phoneNumber.replace(/\D/g, '')
        : '',
      website: business.website || '',
      message: business.message || '',
      liveStreamUrl: business.liveStreamUrl || '',
      orderUrl: business.orderUrl || '',
      giftCardUrl: business.giftCardUrl || '',
      interactions: (business.interactions || []) as BusinessInteraction[],
      deliveryApps: (business.deliveryApps || []) as BusinessDeliveryApp[]
    };

    put('/api/listing/' + business.id, putRequest);
  };

  const success = () => {
    Modal.success({
      content: 'Your business was submitted successfully.',
      onOk: () => goHome(),
      onCancel: () => goHome()
    });
  };

  const error = () => {
    Modal.error({
      title: 'Oops',
      content: 'There was a problem updating your business. Try again later.',
      onOk: () => goHome(),
      onCancel: () => goHome()
    });
  };

  const put = async (url: string, body: Business) => {
    const requestOptions = {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    };

    const response = await fetch(url, requestOptions);
    setVisible(false);
    if (response.ok) {
      success();
    } else {
      error();
    }
    props.bussinessCardCallback(props.business);
  };

  const goHome = () => {
    history.push('/');
  };

  return (
    <Modal
      visible={visible}
      title="Update Business"
      onCancel={handleCancel}
      footer={null}
    >
      <BuildBusinessForm
        onSubmit={updateBusiness}
        businessModel={props.business}
        displayHours={true}
        displayPhoneNumber={true}
        displayUrls={true}
        displayMessage={true}
        displayProductChannel={true}
        displayAppDeliveryItems={true}
        displayGiftCardUrl={true}
      />
    </Modal>
  );
};
