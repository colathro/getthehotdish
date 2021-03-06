import React, { useState } from 'react';
import { get as _get, camelCase as _camelCase } from 'lodash';
import { Form, Button, Typography, Row, Col } from 'antd';
import { TextField } from '../../FormFields/TextField';
import { RadioGroup, RadioItem } from '../../FormFields/RadioGroup/RadioGroup';
import {
  MaskFor,
  MASK_FOR,
  IRecipient,
  IDonor,
  BestContactType,
  BEST_CONTACT_TYPE
} from '../../../types';

const { Text } = Typography;

export interface DonorSectionProps {
  onFinish: (donor: IDonor) => void;
}

export const DonorSection: React.FC<DonorSectionProps> = (props) => {
  const [displaySummary, setDisplaySummary] = useState(false);
  const [donorSection, setDonorSection] = useState<IDonor>({
    bestContactType: 'Email',
    name: '',
    company: '',
    email: '',
    phone: ''
  });

  const radioItems: RadioItem[] = Object.entries(BEST_CONTACT_TYPE).map(
    ([value, label]) => ({
      label,
      value,
      checked: false
    })
  );

  const onFinish = (obj: object) => {
    setDisplaySummary(true);
    const recipientSectionObj = obj as IDonor;
    setDonorSection(recipientSectionObj);
    props.onFinish(recipientSectionObj);
  };

  const onEditClick = () => {
    setDisplaySummary(false);
  };

  const summary = () => {
    return (
      <>
        <Row>
          <Col span={22}>
            <Text strong>What is the best way to reach you?</Text>
            <br />
            <Text type="secondary">
              {
                BEST_CONTACT_TYPE[
                  donorSection.bestContactType as BestContactType
                ]
              }
            </Text>
            <br />
            <br />
            <Text strong>{donorSection.name}</Text>
            <br />
            {donorSection.company && (
              <>
                <Text type="secondary">{donorSection.company}</Text>
                <br />
              </>
            )}
            <Text type="secondary">{donorSection.email}</Text>
            <br />
            <Text type="secondary">{donorSection.phone}</Text>
          </Col>
          <Col span={2}>
            <Button type="link" onClick={() => onEditClick()}>
              Edit
            </Button>
          </Col>
        </Row>
      </>
    );
  };

  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      layout="vertical"
      name="recipient-form"
      onFinish={onFinish}
      scrollToFirstError
    >
      {displaySummary ? (
        summary()
      ) : (
        <>
          <RadioGroup
            name="bestContactType"
            title="What is the best way to reach you?"
            radioItems={radioItems}
            required={true}
          />
          <TextField
            name="name"
            type="string"
            placeHolder="Name"
            required={true}
          />
          <TextField
            name="company"
            type="string"
            placeHolder="Company (optional)"
          />
          <TextField
            name="email"
            type="email"
            placeHolder="Email"
            required={true}
          />
          <TextField
            name="phone"
            type="phone"
            placeHolder="Phone number"
            required={true}
          />
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Continue
            </Button>
          </Form.Item>
        </>
      )}
    </Form>
  );
};
