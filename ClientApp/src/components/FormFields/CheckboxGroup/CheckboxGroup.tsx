import React, { ReactFragment } from 'react';
import { Form, Checkbox, Row, Col } from 'antd';

import '../FormFields.scss';

export interface CheckboxGroupProps {
  name: string;
  title: string;
  checkboxItems: CheckboxItem[];
  subTitle?: string;
  required?: boolean;
}

export interface CheckboxItem {
  label: string;
  value: string;
  checked: boolean;
  onChange?: () => void;
  displayFragmentOnChecked?: ReactFragment;
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = (props) => {
  const onChange = (item: CheckboxItem) => {
    if (item.onChange) {
      item.onChange();
    }
  };

  const rules = [];
  if (props.required) {
    rules.push({
      required: true,
      message: 'Please, select at least one of the options'
    });
  }
  return (
    <Form.Item
      name={props.name}
      label={props.title}
      rules={rules}
      className="hotdish-input"
    >
      <Checkbox.Group>
        <Row>
          {props.checkboxItems.map((item, index) => (
            <>
              <Col key={index} span={16}>
                <Checkbox
                  value={item.value}
                  defaultChecked={item.checked}
                  onChange={() => {
                    onChange(item);
                  }}
                >
                  {item.label}
                </Checkbox>
              </Col>
              <Col span={8}>{item.displayFragmentOnChecked}</Col>
            </>
          ))}
        </Row>
      </Checkbox.Group>
    </Form.Item>
  );
};
