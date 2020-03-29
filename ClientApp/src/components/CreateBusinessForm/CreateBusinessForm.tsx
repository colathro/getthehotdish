import React from 'react';
import { Form, Button } from 'antd';
import { TextField } from '../TextField';
import { CheckboxGroup } from '../CheckboxGroup';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export const CreateBusinessForm: React.FC = props => {
  const [form] = Form.useForm();
  
  const onFinish = () => {
    console.log('Finished posting form');
  };

  const checkboxProductChannelItems = [
    {name: "Website"},
    {name: "Curb-side pickup"},
    {name: "Delivery"}
  ]

  const checkboxAppDeliveryItems = [
    {name: "Uber Eats"},
    {name: "GrubHub"},
    {name: "Food Dudes"},
    {name: "Bite Squad"},
    {name: "Postmates"}
  ]
  
  return (
    <Form 
    {...formItemLayout}
    form={form}
    name="create-business-form"
    onFinish={onFinish}
    scrollToFirstError
    >
      <TextField title="Business name" type="name" titleInline={false} required={true}/>
      <TextField title="Phone" type="phone" titleInline={false} subTitle="(Optional)" subTileInline={true} required={false} />
      <TextField title="Website" type="website" titleInline={false} subTitle="(Optional)" subTileInline={true} required={false}/>
      <TextField title="Message to customers" type="text" titleInline={false} subTitle="Give details like hours and how customers can get your product or service." subTileInline={false} required={true}/>
      <CheckboxGroup name="checkboxGroup-product-channel" title="How can customers recieve your product or service?" checkboxItems={checkboxProductChannelItems}/>
      <CheckboxGroup name="checkboxGroup-app-delivery" title="Do you used app based delivery?" subTitle="(Optional)" subTileInline={true} checkboxItems={checkboxAppDeliveryItems}/>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item> 
    </Form>
  );
};